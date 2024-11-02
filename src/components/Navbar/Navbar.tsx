"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Logo from '../Logo/Logo'
import LoginButton from './Login/Login'
import { MenuIcon, XIcon } from '@heroicons/react/outline'  

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <nav className="bg-transparent backdrop-blur-sm px-8 py-2 fixed z-50 min-w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold text-white">
          <Logo className='text-3xl'/>
        </Link>
        <div className="hidden md:flex items-center space-x-4 gap-12">
          <Link href="#about" className="text-white text-xl hover:text-gray-600">About</Link>
          <Link href="#dashboard" className="text-white text-xl hover:text-gray-500">Dashboard</Link>
          <Link href="#contact" className="text-white text-xl hover:text-gray-500">Contact</Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <LoginButton />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4 z-50">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu items */}
      {isOpen && (
        <div className="fixed top-0 right-0 min-h-screen w-full bg-neutral-950 shadow-lg p-6 flex flex-col items-center space-y-6 z-50">
          <button onClick={toggleMenu} className="absolute top-4 right-4 text-white focus:outline-none">
            <XIcon className="h-8 w-8" />
          </button>
          <Logo className='text-2xl'/>
          <Link href="/about" className="text-gray-600 text-lg font-semibold hover:text-white">About</Link>
          <Link href="/dashboard" className="text-gray-600 text-lg font-semibold hover:text-white">Dashboard</Link>
          <Link href="/contact" className="text-gray-600 text-lg font-semibold hover:text-white">Contact</Link>
          <LoginButton />
        </div>
      )}
    </nav>
  )
}

export default Navbar;
