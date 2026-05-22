"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Gem } from 'lucide-react';

export default function GoldComingSoon() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F1C40F]/10 rounded-full blur-[100px] z-0"></div>

      <Link href="/" className="absolute top-8 left-8 text-white/50 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors z-20">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-2xl"
      >
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#F1C40F] to-[#B87A3D] p-[1px] mb-8 shadow-[0_0_60px_rgba(241,196,15,0.4)]">
          <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center">
             <Gem size={32} className="text-[#F1C40F]" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">Gold Division</span>
        </h1>
        
        <div className="inline-block px-4 py-1.5 rounded-full border border-[#F1C40F]/30 bg-[#F1C40F]/10 text-[#F1C40F] text-xs font-bold uppercase tracking-[0.2em] mb-8">
          Coming Soon
        </div>
        
        <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed mb-12">
          We are building a revolutionary platform for premium gold trading and investments. Get ready to experience the new gold standard.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#F1C40F]/50 transition-colors text-sm"
          />
          <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#F1C40F] to-[#B87A3D] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:opacity-90 transition-opacity">
            Notify Me
          </button>
        </div>
      </motion.div>
    </div>
  );
}
