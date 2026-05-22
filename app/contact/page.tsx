"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import CompanyNavbar from '../../components/CompanyNavbar';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      
      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="h-screen bg-[#FDFBF7] text-stone-900 font-sans selection:bg-slate-900 selection:text-white flex flex-col md:overflow-hidden overflow-y-auto">
      {/* Navbar: flex block ensuring NO gaps beneath it. */}
      <CompanyNavbar className="h-14 w-full bg-[#FDFBF7] border-b border-stone-200 shrink-0 relative" mobileBgClass="bg-[#FDFBF7]" />

      {/* Main container: Takes exactly remaining height, centers content, allows scroll if needed */}
      <main className="flex-grow flex items-center justify-center p-4 relative w-full bg-[#FDFBF7]">
        {/* Glow effect */}
        <div className="absolute top-1/4 right-0 md:-right-32 w-64 md:w-96 h-64 md:h-96 bg-blue-100 rounded-full blur-3xl opacity-50 z-0"></div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-4xl bg-white rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 relative z-10 flex flex-col md:flex-row overflow-hidden"
        >
          {/* Left Side */}
          <div className="w-full md:w-5/12 bg-slate-900 p-6 md:p-8 text-white flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-[10px] font-bold uppercase tracking-widest mb-6 transition-colors">
                <ArrowLeft size={14} /> Back
              </Link>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2 tracking-tight text-white">Get in touch</h2>
              <p className="text-slate-300 text-xs leading-relaxed mb-6 font-light">
                Whether you have a question about our exclusive events or gold investments, we are ready to answer.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Phone</div>
                    <div className="text-xs font-medium text-white">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Email</div>
                    <div className="text-xs font-medium text-white">hello@rakeshsuagdnh.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <MapPin size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Office</div>
                    <div className="text-xs font-medium text-white">123 Corporate Ave, Suite 500</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-7/12 p-6 md:p-8 bg-[#FDFBF7] flex items-center">
            <div className="w-full">
              <h3 className="text-xl font-extrabold text-stone-900 mb-4 tracking-tight">Send us a message</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {status === 'success' && (
                  <div className="p-3 bg-green-50 text-green-700 text-xs rounded-lg flex items-center gap-2 border border-green-100">
                    <CheckCircle2 size={16} /> Message sent successfully!
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-100">
                    Failed to send message. Please try again.
                  </div>
                )}
                <div>
                  <label className="block text-[9px] font-bold text-stone-600 uppercase tracking-wider mb-1 pl-0.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="block w-full px-3 py-2 bg-white border border-stone-200 rounded-lg focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors text-xs outline-none text-stone-900 placeholder:text-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-stone-600 uppercase tracking-wider mb-1 pl-0.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="block w-full px-3 py-2 bg-white border border-stone-200 rounded-lg focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors text-xs outline-none text-stone-900 placeholder:text-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-stone-600 uppercase tracking-wider mb-1 pl-0.5">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    className="block w-full px-3 py-2 bg-white border border-stone-200 rounded-lg focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors text-xs outline-none text-stone-900 placeholder:text-stone-400 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-lg shadow-md shadow-slate-900/10 text-[10px] font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors mt-4 tracking-widest uppercase"
                >
                  {status === 'loading' ? <><Loader2 size={14} className="animate-spin" /> Sending...</> : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
