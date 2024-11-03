"use client";
import React from 'react';
import Image from 'next/image';
import BgImage from '../../../../public/bg.png';
import Logo from '@/components/Logo/Logo';
import LoginButton from '@/components/Navbar/Login/Login';
import { signIn, useSession } from 'next-auth/react';
import { Mail, Clock, CheckCircle } from 'lucide-react';

function About() {
    const { data: session } = useSession();
    
    const handleGetStarted = async() => {
        if(session) {
            window.location.href = '/#dashboard';
        } else {
            signIn('google', { redirectTo: '/#dashboard' });
        }
    }

    const features = [
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Smart Email Analysis",
            description: "Automatically processes and understands your emails"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Save Time",
            description: "Get quick summaries instead of reading long emails"
        },
        {
            icon: <CheckCircle className="w-6 h-6" />,
            title: "Stay Organized",
            description: "Keep track of important information effortlessly"
        }
    ];

    return (
        <div className="relative min-h-screen bg-stone-950 flex flex-col items-center justify-center px-4 py-20 md:py-0" id="about">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={BgImage}
                    alt="Background"
                    fill
                    quality={100}
                    className="filter blur-sm opacity-90 object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-black/95 to-transparent z-10"></div>

            {/* Main Content */}
            <div className="relative z-20 max-w-4xl w-full mx-auto text-center my-8 md:my-0">
                {/* Hero Section */}
                <div className="space-y-6 mb-8 md:mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                        <Logo />
                    </h1>
                    <p className="text-xl md:text-3xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed px-4">
                        An intelligent Email Summariser that helps you 
                        <span className="text-white font-medium"> save time </span>
                        and
                        <span className="text-white font-medium"> stay productive</span>.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12 px-4">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="bg-stone-800/30 backdrop-blur-sm p-4 md:p-6 rounded-xl transform hover:scale-105 transition-all duration-300 hover:bg-stone-800/50"
                        >
                            <div className="text-white mb-3 md:mb-4 flex justify-center">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 text-sm md:text-base">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="space-y-4 md:space-y-6 px-4">
                    <button 
                        onClick={handleGetStarted}
                        className="w-full md:w-auto bg-white hover:bg-gray-200 text-stone-950 font-medium px-6 md:px-8 py-3 md:py-4 rounded-lg inline-flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                        Get Started {session ? 'with Dashboard' : 'with Google'}
                        <svg 
                            className="ml-2 w-4 h-4 md:w-5 md:h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 5l7 7-7 7" 
                            />
                        </svg>
                    </button>
                    
                    <p className="text-gray-400 text-xs md:text-sm">
                        {session ? 'Continue to your dashboard' : 'Sign in securely with your Google account'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;