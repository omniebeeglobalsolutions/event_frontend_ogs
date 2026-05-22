"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface CompanyNavbarProps {
  className?: string;
  mobileBgClass?: string;
}

export default function CompanyNavbar({ 
  className = "fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-200",
  mobileBgClass = "bg-white"
}: CompanyNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={className}>
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="w-1/3 flex items-center justify-start">
          <Link href="/" className="text-stone-900 font-bold tracking-widest text-sm uppercase hover:opacity-80 transition-opacity">
            RS (OPC) PVT LTD
          </Link>
        </div>
        
        {/* Center: Links */}
        <div className="w-1/3 hidden md:flex items-center justify-center gap-8 text-xs font-bold tracking-widest uppercase text-stone-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
          <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
        </div>

        {/* Right: Contact Button & Mobile Menu */}
        <div className="w-1/3 flex items-center justify-end gap-4">
          <Link href="/contact" className="hidden md:inline-flex items-center justify-center px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white bg-[#0B132B] hover:bg-blue-600 transition-colors rounded-full shadow-sm">
            Contact Us
          </Link>

          <button 
            className="md:hidden text-stone-600 hover:text-blue-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={`md:hidden absolute top-14 left-0 w-full border-b border-stone-200 shadow-lg px-6 py-4 flex flex-col gap-4 text-xs font-bold tracking-widest uppercase text-stone-500 z-50 ${mobileBgClass}`}>
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-600 transition-colors block py-2">Home</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-600 transition-colors block py-2">About Us</Link>
          <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-600 transition-colors block py-2">Services</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-600 transition-colors block py-2">Contact</Link>
        </div>
      )}
    </nav>
  );
}
