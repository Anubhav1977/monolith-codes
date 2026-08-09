export interface EmailTemplateData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline?: string;
  description: string;
  timestamp: string;
}

/**
 * Escapes HTML entities to prevent injection in HTML email templates
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generates branded HTML email for the prospect confirmation email
 */
export function getProspectConfirmationEmailHtml(data: EmailTemplateData): string {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.phone || 'N/A');
  const safeCompany = escapeHtml(data.company || 'N/A');
  const safeProjectType = escapeHtml(data.projectType);
  const safeBudget = escapeHtml(data.budget);
  const safeTimeline = escapeHtml(data.timeline || 'N/A');
  const safeDescription = escapeHtml(data.description).replace(/\n/g, '<br/>');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inquiry Confirmation — MONOLITH CODES</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0A0A0E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E2E8F0; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0A0A0E; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #121218; border: 1px solid #262630; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <!-- Header Bar -->
          <tr>
            <td style="padding: 28px 32px; background-color: #161620; border-bottom: 1px solid #262630;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <span style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 11px; text-transform: uppercase; tracking: 2px; color: #F97316; font-weight: 600; display: block; margin-bottom: 4px;">
                      STUDIO INQUIRY CONFIRMATION
                    </span>
                    <h1 style="margin: 0; font-size: 20px; font-weight: 600; color: #FFFFFF; letter-spacing: -0.5px;">
                      MONOLITH CODES
                    </h1>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: #F97316;"></span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin-top: 0; margin-bottom: 20px; font-size: 16px; line-height: 1.6; color: #E2E8F0;">
                Hello <strong style="color: #FFFFFF;">${safeName}</strong>,
              </p>
              
              <p style="margin-top: 0; margin-bottom: 24px; font-size: 14px; line-height: 1.6; color: #94A3B8;">
                Thank you for submitting your project parameters to MONOLITH CODES. We have successfully received your inquiry and our senior software engineering team has begun reviewing your requirements.
              </p>

              <!-- Status Box -->
              <div style="background-color: #1A1A24; border: 1px solid #2E2E3E; border-left: 3px solid #F97316; border-radius: 6px; padding: 16px; margin-bottom: 28px;">
                <p style="margin: 0 0 6px 0; font-family: monospace; font-size: 11px; text-transform: uppercase; color: #F97316; font-weight: 600;">
                  STATUS: INQUIRY QUEUED FOR ARCHITECT REVIEW
                </p>
                <p style="margin: 0; font-size: 13px; color: #CBD5E1; line-height: 1.5;">
                  A lead architect will evaluate your system scope, technical requirements, and target outcomes to provide a structured technical proposal.
                </p>
              </div>

              <!-- Parameter Summary Table -->
              <h2 style="margin: 0 0 12px 0; font-size: 13px; font-family: monospace; text-transform: uppercase; color: #94A3B8; letter-spacing: 1px;">
                RECORDED PARAMETERS
              </h2>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #161620; border: 1px solid #262630; border-radius: 6px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #262630; font-family: monospace; font-size: 12px; color: #94A3B8; width: 35%;">Requirement:</td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #262630; font-size: 13px; color: #FFFFFF; font-weight: 500;">${safeProjectType}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #262630; font-family: monospace; font-size: 12px; color: #94A3B8;">Budget Range:</td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #262630; font-size: 13px; color: #FFFFFF;">${safeBudget}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #262630; font-family: monospace; font-size: 12px; color: #94A3B8;">Target Timeline:</td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #262630; font-size: 13px; color: #FFFFFF;">${safeTimeline}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #262630; font-family: monospace; font-size: 12px; color: #94A3B8;">Company:</td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #262630; font-size: 13px; color: #FFFFFF;">${safeCompany}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-family: monospace; font-size: 12px; color: #94A3B8; valign: top;">Project Overview:</td>
                  <td style="padding: 10px 14px; font-size: 13px; color: #CBD5E1; line-height: 1.5;">${safeDescription}</td>
                </tr>
              </table>

              <!-- Commitment Note -->
              <p style="margin: 0; font-size: 13px; color: #94A3B8; line-height: 1.6;">
                If you have additional technical documents or non-disclosure agreements to share prior to our response, please reply directly to this email or reach us at <a href="mailto:studio@monolithcodes.com" style="color: #F97316; text-decoration: none;">studio@monolithcodes.com</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #0E0E14; border-top: 1px solid #262630; text-align: center;">
              <p style="margin: 0 0 6px 0; font-family: monospace; font-size: 11px; color: #64748B;">
                MONOLITH CODES — Senior Software Engineering Studio
              </p>
              <p style="margin: 0; font-size: 11px; color: #475569;">
                Confidential Engineering Communication • studio@monolithcodes.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Generates text fallback for prospect confirmation email
 */
export function getProspectConfirmationEmailText(data: EmailTemplateData): string {
  return `
MONOLITH CODES — STUDIO INQUIRY CONFIRMATION

Hello ${data.name},

Thank you for submitting your project parameters to MONOLITH CODES. We have successfully received your inquiry and our senior software engineering team has begun reviewing your requirements.

STATUS: INQUIRY QUEUED FOR ARCHITECT REVIEW
A lead architect will evaluate your system scope, technical requirements, and target outcomes to provide a structured technical proposal.

RECORDED PARAMETERS:
- Requirement: ${data.projectType}
- Budget Range: ${data.budget}
- Target Timeline: ${data.timeline || 'N/A'}
- Company: ${data.company || 'N/A'}
- Contact Email: ${data.email}
- Phone: ${data.phone || 'N/A'}

PROJECT OVERVIEW:
${data.description}

If you have additional technical documentation to share, please reply directly to this email or contact us at studio@monolithcodes.com.

Best regards,
MONOLITH CODES Engineering Studio
studio@monolithcodes.com
  `.trim();
}

/**
 * Generates HTML notification email for internal team (studio@monolithcodes.com)
 */
export function getInternalNotificationEmailHtml(data: EmailTemplateData): string {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.phone || 'N/A');
  const safeCompany = escapeHtml(data.company || 'N/A');
  const safeProjectType = escapeHtml(data.projectType);
  const safeBudget = escapeHtml(data.budget);
  const safeTimeline = escapeHtml(data.timeline || 'N/A');
  const safeDescription = escapeHtml(data.description).replace(/\n/g, '<br/>');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Project Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0F172A; font-family: monospace, sans-serif; color: #F8FAFC;">
  <div style="max-width: 650px; margin: 20px auto; background-color: #1E293B; border: 1px solid #334155; border-radius: 8px; padding: 24px;">
    
    <div style="border-bottom: 2px solid #F97316; padding-bottom: 12px; margin-bottom: 20px;">
      <span style="color: #F97316; font-size: 12px; font-weight: bold; text-transform: uppercase;">[NEW INQUIRY RECEIVED]</span>
      <h2 style="margin: 4px 0 0 0; color: #FFFFFF; font-size: 20px;">${safeName} — ${safeCompany}</h2>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #334155; color: #94A3B8; width: 140px;">Name:</td>
        <td style="padding: 8px; border-bottom: 1px solid #334155; color: #FFFFFF; font-weight: bold;">${safeName}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #334155; color: #94A3B8;">Work Email:</td>
        <td style="padding: 8px; border-bottom: 1px solid #334155; color: #38BDF8;"><a href="mailto:${safeEmail}" style="color: #38BDF8;">${safeEmail}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #334155; color: #94A3B8;">Phone:</td>
        <td style="padding: 8px; border-bottom: 1px solid #334155; color: #FFFFFF;">${safePhone}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #334155; color: #94A3B8;">Company:</td>
        <td style="padding: 8px; border-bottom: 1px solid #334155; color: #FFFFFF;">${safeCompany}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #334155; color: #94A3B8;">Project Type:</td>
        <td style="padding: 8px; border-bottom: 1px solid #334155; color: #F97316; font-weight: bold;">${safeProjectType}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #334155; color: #94A3B8;">Budget:</td>
        <td style="padding: 8px; border-bottom: 1px solid #334155; color: #4ADE80; font-weight: bold;">${safeBudget}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #334155; color: #94A3B8;">Timeline:</td>
        <td style="padding: 8px; border-bottom: 1px solid #334155; color: #FFFFFF;">${safeTimeline}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #334155; color: #94A3B8;">Submission Time:</td>
        <td style="padding: 8px; border-bottom: 1px solid #334155; color: #CBD5E1;">${data.timestamp}</td>
      </tr>
    </table>

    <div style="background-color: #0F172A; border: 1px solid #334155; border-radius: 6px; padding: 16px; margin-top: 16px;">
      <div style="font-size: 11px; color: #94A3B8; text-transform: uppercase; margin-bottom: 8px;">REQUIREMENTS & SCOPE OVERVIEW:</div>
      <div style="font-size: 13px; color: #E2E8F0; line-height: 1.6; white-space: pre-wrap;">${safeDescription}</div>
    </div>

  </div>
</body>
</html>
  `;
}
