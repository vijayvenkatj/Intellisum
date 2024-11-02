"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BgImage from '../../../../public/bg.png';
import axios from 'axios';
import { useSession } from 'next-auth/react';

function Dashboard() {

    const {data: session} = useSession();
    const [count,setCount] = useState(0);
    const [emailSummaries,setEmailSummaries] = useState([{snippet:"hi",subject:"hi"}]);

    const res = async() =>{
        console.log(session?.user?.email)
        const response = await axios.post('/api/gmail',{
            email: session?.user?.email
        });
        console.log(response.data)
        setEmailSummaries(response.data);
        
    }

    return (
        <div className="relative min-h-screen bg-stone-950 m-auto p-4" id="dashboard">
            <div className="absolute inset-0 z-0">
                <Image
                    src={BgImage}
                    alt="Background"
                    fill
                    quality={100}
                    className="filter blur-sm opacity-90"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-black/95 to-transparent z-10"></div>

            <div className="relative z-20">
                <main className="mt-8">
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Your Email Summaries</h2>
                    <button onClick={res}>Fetch emails</button>
                    <div className="space-y-4">
                        {emailSummaries!.map((email: any, index: number) => (
                            <div key={index} className="bg-stone-800 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold text-white mb-2">{email.sender}</h3>
                                <p className="text-gray-300">{email.context}</p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
