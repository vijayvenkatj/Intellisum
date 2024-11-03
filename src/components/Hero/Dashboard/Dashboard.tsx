"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BgImage from '../../../../public/bg.png';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Loader2, Mail, RefreshCw } from 'lucide-react';

function Dashboard() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [emailSummaries, setEmailSummaries] = useState([]);

    const fetchEmails = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/gmail', {
                email: session?.user?.email
            });
            setEmailSummaries(response.data);
        } catch (error) {
            console.error('Failed to fetch emails:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-stone-950" id="dashboard">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={BgImage}
                    alt="Background"
                    fill
                    quality={100}
                    className="filter blur-sm opacity-90"
                />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-black/95 to-transparent z-10"></div>

            {/* Main Content */}
            <div className="relative z-20 container mx-auto px-4 py-6 pt-16">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="bg-stone-950/80 backdrop-blur-sm py-3 px-4 mb-6 rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white">Your Email Summaries</h2>
                            <button
                                onClick={fetchEmails}
                                disabled={loading}
                                className="inline-flex items-center gap-2 bg-white hover:bg-gray-200 text-stone-950 px-3 py-1.5 rounded-md transition-colors duration-200 text-sm self-start sm:self-auto"
                            >
                                {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <RefreshCw className="w-4 h-4" />
                                )}
                                <span className="whitespace-nowrap">
                                    {loading ? 'Fetching...' : 'Fetch Emails'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Email Grid */}
                    <div className={`
                        ${emailSummaries.length === 0 ? '' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}
                    `}>
                        {emailSummaries.length === 0 ? (
                            <div className="text-center py-8 bg-stone-800/30 backdrop-blur-sm rounded-lg">
                                <Mail className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                                <p className="text-gray-400 text-base">No emails found. Click 'Fetch Emails' to get started.</p>
                            </div>
                        ) : (
                            emailSummaries.map((email: any, index) => (
                                <div 
                                    key={index}
                                    className="bg-stone-800/80 backdrop-blur-sm p-4 rounded-lg transform transition-all duration-200 hover:scale-[1.01] hover:bg-stone-800 h-full"
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-semibold text-white mb-1.5">
                                                {email.subject}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-2">
                                                From: {email.sender || 'Unknown Sender'}
                                            </p>
                                            <p className="text-gray-300 text-md leading-relaxed">
                                                {email.context || email.snippet}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;