"use client";

import React from 'react';
import Image from 'next/image';
import BgImage from '../../../../public/bg.png';
import Logo from '@/components/Logo/Logo';
import LoginButton from '@/components/Navbar/Login/Login';

function About() {
    return (
        <div className="relative flex items-center justify-center min-h-screen bg-stone-950 p-4" id="about">
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

            <div className="relative z-20 text-center justify-normal">
                <h1 className="text-6xl font-bold text-white mb-4 flex items-center justify-center">
                    <Logo />
                </h1>

                <p className="text-2xl text-gray-300 mb-8">
                    An E-mail Summariser to help you summarise your emails and save time.
                </p>

                <h2 className='justify-center items-center inline-flex z-10 m-auto'>
                    <LoginButton />
                </h2>
            </div>
           
            
        </div>
    );
}

export default About;
