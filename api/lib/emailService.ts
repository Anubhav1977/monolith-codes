import nodemailer from 'nodemailer';
import {
  EmailTemplateData,
  getProspectConfirmationEmailHtml,
  getProspectConfirmationEmailText,
  getInternalNotificationEmailHtml,
} from './emailTemplates.js';

export async function sendInquiryEmails(data: EmailTemplateData): Promise<{
  prospectEmailSent: boolean;
  internalEmailSent: boolean;
  message?: string;
}> {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || 'studio@monolithcodes.com';
  const internalRecipient = process.env.INTERNAL_NOTIFICATION_EMAIL || 'studio@monolithcodes.com';

  if (!host || !user || !pass) {
    console.warn('[Email Service] Missing SMTP_HOST, SMTP_USER, or SMTP_PASS environment variables.');
    return {
      prospectEmailSent: false,
      internalEmailSent: false,
      message: 'SMTP credentials are not configured on the server.',
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  let prospectEmailSent = false;
  let internalEmailSent = false;

  // 1. Send Prospect Confirmation Email
  try {
    const prospectHtml = getProspectConfirmationEmailHtml(data);
    const prospectText = getProspectConfirmationEmailText(data);

    await transporter.sendMail({
      from: `"MONOLITH CODES Studio" <${from}>`,
      to: data.email,
      subject: 'Inquiry Confirmation — MONOLITH CODES',
      text: prospectText,
      html: prospectHtml,
    });
    prospectEmailSent = true;
  } catch (error: any) {
    console.error('[Prospect Email Error]:', error?.message || error);
  }

  // 2. Send Internal Notification Email
  try {
    const internalHtml = getInternalNotificationEmailHtml(data);
    const companyTag = data.company ? ` / ${data.company}` : '';
    const subject = `New Project Inquiry — ${data.name}${companyTag}`;

    await transporter.sendMail({
      from: `"MONOLITH Lead Capture" <${from}>`,
      to: internalRecipient,
      subject,
      html: internalHtml,
    });
    internalEmailSent = true;
  } catch (error: any) {
    console.error('[Internal Email Error]:', error?.message || error);
  }

  return {
    prospectEmailSent,
    internalEmailSent,
  };
}
