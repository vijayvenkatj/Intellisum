"use client";

import React from 'react';
import Image from 'next/image';
import BgImage from '../../../../public/bg.png';
import Logo from '@/components/Logo/Logo';

function Dashboard() {
    const emailSummaries = [
        {
            id: 1,
            subject: 'Welcome to our service!',
            summary: 'Thank you for signing up...'
        },
        {
            id: 2,
            subject: 'Your weekly update',
            summary: 'Here are the highlights of this week...'
        },
        // Add more summaries as needed
    ];

    return (
        <div className="relative min-h-screen bg-stone-950 p-4" id="dashboard">
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
                    <div className="space-y-4">
                        {emailSummaries.map((email) => (
                            <div key={email.id} className="bg-stone-800 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold text-white mb-2">{email.subject}</h3>
                                <p className="text-gray-300">{email.summary}</p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;