"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#FAF9F6] border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/home" className="text-2xl font-medium tracking-tight text-[#0B132B]">
              Lumina
            </Link>
          </div>

          {/* Centered Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/home" className="text-xs font-semibold text-slate-500 uppercase tracking-widest hover:text-[#0B132B] transition-colors">
              Home
            </Link>
            <Link href="/events" className="text-xs font-semibold text-slate-500 uppercase tracking-widest hover:text-[#0B132B] transition-colors">
              Events
            </Link>
            <Link href="/gallery" className="text-xs font-semibold text-slate-500 uppercase tracking-widest hover:text-[#0B132B] transition-colors">
              Gallery
            </Link>
            <Link href="/bookings" className="text-xs font-semibold text-slate-500 uppercase tracking-widest hover:text-[#0B132B] transition-colors">
              My Bookings
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-6">
            {user ? (
              <div className="flex items-center gap-4 border-l border-slate-200 pl-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 hidden sm:block">{user.name}</span>
                  <div className="h-8 w-8 rounded-full bg-[#0B132B] text-white flex items-center justify-center font-bold text-sm shadow-sm border border-slate-200">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="text-slate-400 hover:text-rose-500 transition-colors flex items-center"
                  title="Log out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link href="/" className="text-sm font-semibold text-[#0B132B]">Sign In</Link>
            )}

            {/* Hamburger menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-slate-600 hover:text-[#0B132B] focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#FAF9F6] border-t border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-inner">
          <Link
            href="/home"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-xs font-semibold text-slate-500 uppercase tracking-widest hover:bg-slate-100 hover:text-[#0B132B] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/events"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-xs font-semibold text-slate-500 uppercase tracking-widest hover:bg-slate-100 hover:text-[#0B132B] transition-colors"
          >
            Events
          </Link>
          <Link
            href="/gallery"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-xs font-semibold text-slate-500 uppercase tracking-widest hover:bg-slate-100 hover:text-[#0B132B] transition-colors"
          >
            Gallery
          </Link>
          <Link
            href="/bookings"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-xs font-semibold text-slate-500 uppercase tracking-widest hover:bg-slate-100 hover:text-[#0B132B] transition-colors"
          >
            My Bookings
          </Link>
        </div>
      )}
    </nav>
  );
}
