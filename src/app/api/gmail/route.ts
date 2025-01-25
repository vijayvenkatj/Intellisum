import { NextRequest, NextResponse } from "next/server";
import { getEmails } from "@/utils/gmail/gmailfunctions";
import axios from 'axios';
import { Summariser } from "@/utils/gmail/summariser";
import { auth } from "@/auth";


export async function POST(request: NextRequest) {
    try {
        const session = await auth() as any

        let accessToken: any = session.user.accessToken;
    
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

        console.log(summaries)

        return NextResponse.json(summaries)

    } 
    catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
