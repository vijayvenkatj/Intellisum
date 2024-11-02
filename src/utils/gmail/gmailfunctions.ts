import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.labels',
    'https://www.googleapis.com/auth/gmail.modify'
];

export const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

export function getAuthUrl() {
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent'
    });
}

export async function getTokens(code: string) {
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
}

export async function getEmails(accessToken: string) {
    try {
        const oauth2Client = new OAuth2Client();
        oauth2Client.setCredentials({ access_token: accessToken });

        const gmail = google.gmail({
            version: 'v1',
            auth: oauth2Client
        });

        const response = await gmail.users.messages.list({
            userId: 'me',
            maxResults: 10,
            q: 'in:inbox'
        });

        const messages = response.data.messages || [];
        const emailDetails = await Promise.all(
            messages.map(async (message) => {
                const email = await gmail.users.messages.get({
                    userId: 'me',
                    id: message.id!,
                    format: 'full'
                });
                return parseEmailData(email.data);
            })
        );

        return emailDetails;
    } catch (error) {
        console.error('Gmail API Error:', error);
        throw error;
    }
}

function parseEmailData(email: any) {
    const headers = email.payload.headers;
    const subject = headers.find((header: any) => header.name === 'Subject')?.value;
    const from = headers.find((header: any) => header.name === 'From')?.value;
    const date = headers.find((header: any) => header.name === 'Date')?.value;

    return {
        id: email.id,
        threadId: email.threadId,
        subject,
        from,
        date,
        snippet: email.snippet
    };
}

