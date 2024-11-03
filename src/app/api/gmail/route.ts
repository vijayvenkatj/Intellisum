import { connectToDb, modelAccounts, modelUsers } from "@/utils/gmail/dbfunctions";
import { NextRequest, NextResponse } from "next/server";
import { getEmails } from "@/utils/gmail/gmailfunctions";
import axios from 'axios';
import { Summariser } from "@/utils/gmail/summariser";

interface TokenResponse {
  access_token: string;
  expires_in: number;
  scope?: string;
  token_type?: string;
}

interface RefreshResult {
  access_token: string;
  expires_at: number;
}

class TokenRefreshError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public responseData?: any
  ) {
    super(message);
    this.name = 'TokenRefreshError';
  }
}

async function refreshAccessToken(refreshToken: string): Promise<RefreshResult> {
    if (!refreshToken) {
        console.log('Refresh token is required');
        throw new TokenRefreshError('Refresh token is required', 400);
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new TokenRefreshError('OAuth credentials not configured', 500);
    }

    const params = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
    });

    try {
        const response = await axios.post<TokenResponse>(
            'https://oauth2.googleapis.com/token',
            params.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        return {
            access_token: response.data.access_token,
            expires_at: Math.floor(Date.now() / 1000) + response.data.expires_in
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            const errorMessage = error.response?.data?.error || 'Token refresh failed';
            console.error('Token refresh failed:', {
                status,
                data: error.response?.data
            });
            throw new TokenRefreshError(errorMessage, status, error.response?.data);
        }
        throw new TokenRefreshError('Unknown error during token refresh');
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectToDb();
        
        const users = modelUsers();
        const accounts = modelAccounts();
        
        const loginDetails = await request.json();
        
        if (!loginDetails.email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        const user = await users.findOne({ email: loginDetails.email });
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const account = await accounts.findOne({ userId: user._id });
        if (!account) {
            return NextResponse.json(
                { error: 'Google account not found' },
                { status: 404 }
            );
        }
        
        let accessToken = account.access_token;

        if (account.expires_at < (Date.now() / 1000) + 300) {
            try {
                const Details = JSON.stringify(account);
                const Refresh = JSON.parse(Details);
                const newTokens = await refreshAccessToken(Refresh.refresh_token as string);
                
                await accounts.updateOne(
                    { userId: user._id },
                    { 
                        $set: {
                            access_token: newTokens.access_token,
                            expires_at: newTokens.expires_at
                        }
                    }
                );
                
                accessToken = newTokens.access_token;
            } catch (error) {
                if (error instanceof TokenRefreshError) {
                    return NextResponse.json(
                        { error: error.message, details: error.responseData },
                        { status: error.statusCode }
                    );
                }
                return NextResponse.json(
                    { error: 'Failed to refresh access token' },
                    { status: 500 }
                );
            }
        }

        const emails = await getEmails(accessToken);
        if (!emails) {
            return NextResponse.json(
                { error: 'Failed to fetch emails' },
                { status: 500 }
            );
        }

        const summaries = await Promise.all(
            emails.map(async (email) => {
                return await Summariser(email.from, email.snippet);
            })
        );

        return NextResponse.json(summaries);

    } catch (error) {
        console.error('API Error:', error);
        if (axios.isAxiosError(error)) {
            console.error('Axios error details:', {
                status: error.response?.status,
                data: error.response?.data
            });
        }
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}