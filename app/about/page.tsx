"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gem, Users, Target } from 'lucide-react';
import CompanyNavbar from '../../components/CompanyNavbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Navbar */}
      <CompanyNavbar className="fixed top-0 w-full z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200" mobileBgClass="bg-[#FDFBF7]" />

      <main className="pt-14">
        {/* Who We Are Section */}
        <section className="py-12 relative bg-[#FDFBF7] overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3 z-0"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
              {/* Left Side: Images */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80" alt="Corporate" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent"></div>
                </div>
                {/* Floating Element */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="absolute bottom-4 right-0 md:-right-4 bg-white p-4 rounded-2xl shadow-xl border border-stone-100 max-w-xs hidden md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <Users size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-extrabold text-stone-900">10+ Years</div>
                      <div className="text-[9px] uppercase tracking-widest font-bold text-stone-500">Of Excellence</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Side: Text */}
              <div className="w-full lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 border border-blue-200 mb-4">
                  <span className="text-[8px] uppercase tracking-widest font-bold text-blue-700">Our Identity</span>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4">
                  Cultivating <span className="text-blue-600">exceptional brands</span> and exclusive services.
                </h3>
                <div className="w-12 h-1 bg-blue-600 mb-4 rounded-full"></div>
                
                <div className="space-y-4">
                  <p className="text-stone-600 text-xs md:text-sm leading-relaxed font-light">
                    RAKESH SUAGDNH (OPC) PRIVATE LIMITED is a premier holding company with a strategic focus on cultivating exceptional brands and exclusive services. Our identity is rooted in an unwavering commitment to quality and a visionary approach to business. 
                  </p>
                  <p className="text-stone-600 text-xs md:text-sm leading-relaxed font-light">
                    We believe in creating ecosystems where elite event management meets high-value asset cultivation. By bridging the gap between experiential luxury and tangible wealth generation, we offer our clients a comprehensive suite of lifestyle and financial solutions designed for the modern era.
                  </p>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="border-l-2 border-blue-600 pl-3">
                    <div className="text-lg font-extrabold text-stone-900">Visionary</div>
                    <div className="text-[9px] uppercase tracking-widest font-bold text-stone-500 mt-0.5">Approach</div>
                  </div>
                  <div className="border-l-2 border-blue-600 pl-3">
                    <div className="text-lg font-extrabold text-stone-900">Premium</div>
                    <div className="text-[9px] uppercase tracking-widest font-bold text-stone-500 mt-0.5">Experiences</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Focus Section */}
        <section className="py-12 relative bg-[#F7F5F0] border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="bg-white border border-stone-200 rounded-2xl p-8 lg:p-12 flex flex-col md:flex-row items-center gap-8 lg:gap-12 shadow-sm">
              <div className="w-full md:w-1/2">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 mb-4">
                  <Target size={20} />
                </div>
                <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-2">Specialized Focus</h2>
                <h3 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4">
                  Empowering new beginnings through curated events.
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-4 font-light">
                  Our event management division introduces a groundbreaking initiative: curated events designed exclusively for divorced individuals. We understand that starting a new chapter can be challenging. 
                </p>
                <p className="text-stone-600 text-sm leading-relaxed font-light">
                  Through Lumina, we offer a supportive, sophisticated environment for people to connect, heal, and rebuild their social circles with peers who understand their journey.
                </p>
              </div>
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-square w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-[8px] border-[#FDFBF7] shadow-lg relative">
                  <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80" alt="People connecting" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gold Section */}
        <section className="py-16 bg-[#FDFBF7] relative border-t border-stone-200 text-stone-900">
          <div className="max-w-7xl mx-auto px-6 text-center">
             <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mb-6 shadow-lg shadow-yellow-500/20">
                <Gem size={20} className="text-white" />
             </div>
             <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4">
               The Gold Standard of Investment
             </h3>
             <p className="text-stone-600 max-w-xl mx-auto text-sm font-light leading-relaxed mb-8">
               Leveraging decades of market insight, our upcoming Gold division will offer unprecedented access to premium gold trading.
             </p>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-stone-200 pt-8">
               <div>
                 <div className="text-2xl font-extrabold mb-1 text-stone-900">99.9%</div>
                 <div className="text-[9px] text-stone-500 uppercase tracking-widest font-bold">Purity Guarantee</div>
               </div>
               <div>
                 <div className="text-2xl font-extrabold mb-1 text-stone-900">24/7</div>
                 <div className="text-[9px] text-stone-500 uppercase tracking-widest font-bold">Market Access</div>
               </div>
               <div>
                 <div className="text-2xl font-extrabold mb-1 text-stone-900">0%</div>
                 <div className="text-[9px] text-stone-500 uppercase tracking-widest font-bold">Hidden Fees</div>
               </div>
               <div>
                 <div className="text-2xl font-extrabold mb-1 text-stone-900">100%</div>
                 <div className="text-[9px] text-stone-500 uppercase tracking-widest font-bold">Secure Storage</div>
               </div>
             </div>
          </div>
        </section>
      </main>


    </div>
  );
}
