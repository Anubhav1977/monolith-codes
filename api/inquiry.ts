import { appendToGoogleSheet } from './lib/googleSheets.js';
import { sendInquiryEmails } from './lib/emailService.js';

// Simple in-memory rate limiting map for basic anti-spam (IP -> timestamp[])
const ipRateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

/**
 * Standard email validation regex
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Basic rate limiting helper
 */
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  ipRateLimitMap.set(ip, validTimestamps);
  return false;
}

export default async function handler(req: any, res: any) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Please use POST.',
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    const {
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      timeline,
      description,
      website, // Honeypot field
      _formRenderTime, // Timestamp token from client
    } = body;

    // 2. Anti-Spam Check A: Honeypot field must be empty
    if (website && website.trim().length > 0) {
      console.warn('[Anti-Spam] Honeypot field filled by bot submission.');
      // Return false success to confuse automated spam bots without executing operations
      return res.status(200).json({
        success: true,
        message: 'Inquiry processed.',
      });
    }

    // 3. Anti-Spam Check B: Form timing check (bot submitted form in < 1.5 seconds)
    if (_formRenderTime) {
      const elapsedMs = Date.now() - parseInt(_formRenderTime, 10);
      if (elapsedMs < 1500) {
        console.warn(`[Anti-Spam] Fast submission detected (${elapsedMs}ms). Rejecting bot.`);
        return res.status(400).json({
          success: false,
          error: 'Automated submission pattern detected. Please try again.',
        });
      }
    }

    // 4. Anti-Spam Check C: Basic Rate Limiting by IP
    const clientIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1')
      .toString()
      .split(',')[0]
      .trim();

    if (isRateLimited(clientIp)) {
      console.warn(`[Rate Limit] IP ${clientIp} exceeded submission limit.`);
      return res.status(429).json({
        success: false,
        error: 'Too many inquiries submitted from this connection. Please try again later or email studio@monolithcodes.com directly.',
      });
    }

    // 5. Server-Side Validation & Sanitization
    const trimmedName = (name || '').trim();
    const trimmedEmail = (email || '').trim();
    const trimmedPhone = (phone || '').trim();
    const trimmedCompany = (company || '').trim();
    const trimmedProjectType = (projectType || 'Web & Digital Experiences').trim();
    const trimmedBudget = (budget || '$10k - $25k').trim();
    const trimmedTimeline = (timeline || '1-2 Months').trim();
    const trimmedDescription = (description || '').trim();

    if (!trimmedName || trimmedName.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid name.',
      });
    }

    if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid work email address.',
      });
    }

    if (!trimmedDescription || trimmedDescription.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Please describe your project overview (minimum 10 characters).',
      });
    }

    const timestamp = new Date().toISOString();

    const inquiryRecord = {
      timestamp,
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      company: trimmedCompany,
      projectType: trimmedProjectType,
      budget: trimmedBudget,
      timeline: trimmedTimeline,
      message: trimmedDescription,
      source: 'Website Inquiry',
      status: 'New',
    };

    // 6. Execute Google Sheets Persistence
    const sheetResult = await appendToGoogleSheet(inquiryRecord);

    // 7. Execute Dual Email Dispatch (Prospect + Internal)
    const emailResult = await sendInquiryEmails({
      ...inquiryRecord,
      description: trimmedDescription,
    });

    // 8. If environment variables are unconfigured, handle dev mode fallback gracefully
    const isGoogleConfigured = !!process.env.GOOGLE_SHEET_ID;
    const isSmtpConfigured = !!process.env.SMTP_HOST;

    if (!isGoogleConfigured && !isSmtpConfigured) {
      console.info('[Inquiry API] Processed inquiry in DEV/UNCONFIGURED mode (no env vars present yet).');
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry received and queued successfully.',
      recordSummary: {
        name: trimmedName,
        email: trimmedEmail,
        company: trimmedCompany,
        projectType: trimmedProjectType,
        budget: trimmedBudget,
        timeline: trimmedTimeline,
      },
      devNotice: !isGoogleConfigured || !isSmtpConfigured ? 'Server environment variables (Google Sheets / SMTP) are pending configuration.' : undefined,
    });
  } catch (error: any) {
    console.error('[Inquiry API Internal Error]:', error?.stack || error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your inquiry. Please try again or email studio@monolithcodes.com.',
    });
  }
}
