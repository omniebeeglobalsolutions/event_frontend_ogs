"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarHeart, Gem } from 'lucide-react';
import CompanyNavbar from '../../components/CompanyNavbar';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans selection:bg-slate-900 selection:text-white flex flex-col">
      <CompanyNavbar className="fixed top-0 w-full z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200" mobileBgClass="bg-[#FDFBF7]" />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-2">Our Portfolio</h2>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">Our Exclusive Services</h1>
            <p className="mt-4 text-sm text-stone-500 max-w-2xl mx-auto font-light">
              Explore the pinnacle of luxury, curated experiences, and secure investments designed to elevate every aspect of your life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Event Management Card */}
            <Link href="/" className="group block">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                whileHover={{ y: -5 }}
                className="h-full bg-white rounded-3xl p-8 border border-stone-200 shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <CalendarHeart size={120} className="text-blue-600" />
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 border border-blue-100 text-blue-600 shadow-sm">
                    <CalendarHeart size={28} />
                  </div>
                  <h4 className="text-2xl font-bold text-stone-900 mb-3">Event Management</h4>
                  <p className="text-sm text-stone-600 leading-relaxed mb-8 font-light">
                    Lumina — A specialized platform curating exclusive gatherings, dinners, and events. We focus on intentional connections for a modern, sophisticated lifestyle.
                  </p>
                  <span className="inline-flex items-center gap-2 text-blue-600 text-[11px] font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                    Access Portal <ArrowRight size={14} />
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Gold Project Card */}
            <Link href="/gold" className="group block">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                whileHover={{ y: -5 }}
                className="h-full bg-white rounded-3xl p-8 border border-stone-200 shadow-sm hover:shadow-2xl hover:border-yellow-400 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Gem size={120} className="text-yellow-500" />
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-50 flex items-center justify-center mb-8 border border-yellow-100 text-yellow-600 shadow-sm">
                    <Gem size={28} />
                  </div>
                  <h4 className="text-2xl font-bold text-stone-900 mb-3">Gold Investment</h4>
                  <p className="text-sm text-stone-600 leading-relaxed mb-8 font-light">
                    Secure your future with our premium gold investment solutions. We offer unparalleled asset cultivation strategies for visionary growth and tangible wealth.
                  </p>
                  <span className="inline-flex items-center gap-2 text-yellow-600 text-[11px] font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                    Explore Opportunities <ArrowRight size={14} />
                  </span>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
