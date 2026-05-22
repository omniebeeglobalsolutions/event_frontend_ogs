"use client";

import Link from 'next/link';
import { Sparkles, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B132B] text-slate-300 border-t border-slate-800/60 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif font-medium tracking-tight text-white italic">Lumina</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#B87A3D]"></span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed font-light">
              Lumina is a premium, secure social space crafted exclusively for divorced men and women looking to rebuild their social lives, discover supportive friendships, and safely step into a beautiful second marriage.
            </p>
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-400">
                <Mail className="h-3.5 w-3.5 text-[#B87A3D] shrink-0" />
                <span className="font-light hover:text-white transition-colors cursor-pointer">membership@lumina.community</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-400">
                <MapPin className="h-3.5 w-3.5 text-[#B87A3D] shrink-0" />
                <span className="font-light">Mumbai &amp; Bangalore, India</span>
              </div>
            </div>
          </div>

          {/* Quick Explore Links */}
          <div>
            <h4 className="text-xs font-bold text-[#B87A3D] uppercase tracking-widest mb-3.5">Explore</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/home" className="hover:text-white transition-colors font-light">Dashboard Home</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors font-light">Curated Events</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors font-light">Moments Gallery</Link></li>
              <li><Link href="/bookings" className="hover:text-white transition-colors font-light">My Seat Bookings</Link></li>
            </ul>
          </div>

          {/* Company & Support Links */}
          <div>
            <h4 className="text-xs font-bold text-[#B87A3D] uppercase tracking-widest mb-3.5">Company</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors font-light">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-light">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-light">Community Guidelines</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-light">Safety Protocols</a></li>
            </ul>
          </div>

        </div>

        {/* Copyright & Subtext Row */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-medium uppercase tracking-wider">
          <div className="flex items-center gap-1 font-sans">
            <span>&copy; {new Date().getFullYear()} Lumina. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#B87A3D]">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="font-sans">Designed for intentional connections</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
