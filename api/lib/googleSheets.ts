import { google } from 'googleapis';

export interface InquiryRowData {
  timestamp: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline?: string;
  message: string;
  source: string;
  status: string;
}

export async function appendToGoogleSheet(data: InquiryRowData): Promise<{ success: boolean; message?: string }> {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!serviceAccountEmail || !privateKeyRaw || !spreadsheetId) {
    console.warn('[Google Sheets Integration] Missing GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, or GOOGLE_SHEET_ID in environment variables.');
    return {
      success: false,
      message: 'Google Sheets credentials are not configured on the server.',
    };
  }

  // Handle multiline private key formatted with escaped \n in environment variables
  const privateKey = privateKeyRaw.replace(/\\n/g, '\n');

  try {
    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const values = [
      [
        data.timestamp,
        data.name,
        data.email,
        data.phone || 'N/A',
        data.company || 'N/A',
        data.projectType,
        data.budget,
        data.timeline || 'N/A',
        data.message,
        data.source,
        data.status,
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:K',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error('[Google Sheets API Error]:', error?.message || error);
    return {
      success: false,
      message: error?.message || 'Failed to record entry in Google Sheet.',
    };
  }
}
