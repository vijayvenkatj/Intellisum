import { connectToDb, modelAccounts, modelUsers } from "@/utils/gmail/dbfunctions";
import { NextRequest, NextResponse } from "next/server";
import { getEmails } from "@/utils/gmail/gmailfunctions";
import axios from 'axios';
import { Summariser } from "@/utils/gmail/summariser";

async function refreshAccessToken(refreshToken: string) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    
    try {
        const response = await axios.post(
            'https://oauth2.googleapis.com/token',
            {
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
                grant_type: 'refresh_token',
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: [(data) => {
                    return Object.entries(data)
                        .map(([key, value]: any) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                        .join('&');
                }]
            }
        );

        return {
            access_token: response.data.access_token,
            expires_at: Math.floor(Date.now() / 1000) + response.data.expires_in,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Token refresh error:', {
                status: error.response?.status,
                data: error.response?.data
            });
        }
        throw error;
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
               
                const newTokens = await refreshAccessToken(account.refresh_token);
                
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
                const status = axios.isAxiosError(error) && error.response?.status === 400 ? 400 : 401;
                return NextResponse.json(
                    { error: 'Failed to refresh access token' },
                    { status }
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

        let summaries:any = []

        for(const email of emails){
            const summary = await Summariser(email.from,email.snippet)
            console.log(summary)
            summaries.push(summary)
        }
        return NextResponse.json(summaries)

        

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