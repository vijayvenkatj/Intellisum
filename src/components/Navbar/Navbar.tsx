"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '../Logo/Logo';
import LoginButton from './Login/Login';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { href: "#about", label: "About" },
    { href: "#dashboard", label: "Dashboard" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="bg-transparent backdrop-blur-sm px-8 py-2 fixed z-50 min-w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold text-white">
          <Logo className="text-3xl" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 gap-12">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white text-xl hover:text-gray-300 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <LoginButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4 z-50">
          <button 
            onClick={toggleMenu} 
            className="text-white focus:outline-none transition-transform duration-200 ease-in-out hover:scale-110"
          >
            {isOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 min-h-screen w-full sm:w-80 bg-neutral-950 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <Logo className="text-2xl" />
            <button
              onClick={closeMenu}
              className="text-white focus:outline-none transition-transform duration-200 ease-in-out hover:scale-110"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="text-gray-400 text-lg font-semibold hover:text-white transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-6">
            <LoginButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;