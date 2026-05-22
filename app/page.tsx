"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CalendarHeart, Gem, Users } from 'lucide-react';
import CompanyNavbar from '../components/CompanyNavbar';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Navbar */}
      <CompanyNavbar className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-200" mobileBgClass="bg-white" />

      <main>
        {/* Section 1: Hero */}
        <section id="home" className="relative pt-32 pb-24 overflow-hidden bg-white">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50/30 to-transparent z-0"></div>
          
          <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left side text */}
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-[55%] flex flex-col gap-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 border border-blue-200 w-fit">
                <Sparkles size={12} className="text-blue-600" />
                <span className="text-[9px] uppercase tracking-widest font-bold text-blue-700">Welcome to the future</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight tracking-tight">
                RAKESH SUAGDNH <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">(OPC) PRIVATE LIMITED</span>
              </h1>
              <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light mt-2 max-w-2xl">
                We are a multifaceted holding company dedicated to incubating extraordinary ventures. From exclusive event management to premium gold investments, we redefine excellence in every industry we touch. Built on a foundation of unyielding integrity, bold innovation, and unparalleled service. We continually strive to push the boundaries of what is possible, creating sustainable value and driving forward-thinking solutions for a rapidly evolving world.
              </p>
              <div className="flex gap-4 mt-4">
                <Link href="#projects" className="px-6 py-3 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-stone-800 transition-all flex items-center gap-2 group shadow-lg shadow-stone-200">
                  Explore Projects
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Right side image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="w-full lg:w-[45%] flex justify-center lg:justify-center relative mt-6 lg:mt-0"
            >
              <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border-[6px] border-white shadow-2xl shadow-stone-200/50">
                <img 
                  src="/client_photo.jpeg" 
                  alt="Client"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: Who We Are */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-12 relative bg-white overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3 z-0"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
              {/* Left Side: Images */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80" alt="Corporate" loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent"></div>
                </div>
                {/* Floating Element */}
                <motion.div 
                  initial={{ y: -30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
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
              <motion.div 
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="w-full lg:w-1/2"
              >
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
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Section 3: Projects / Divisions */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          id="projects" 
          className="py-10 relative bg-stone-50 border-t border-stone-200"
        >
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-center mb-8"
            >
              <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-2">Our Portfolio</h2>
              <h3 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">Discover our sub-projects</h3>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Event Management Card */}
              <Link href="/home" className="group block">
                <motion.div 
                  whileHover={{ y: -3 }}
                  className="h-full bg-white rounded-2xl p-8 border border-stone-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <CalendarHeart size={100} className="text-blue-600" />
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 border border-blue-100 text-blue-600">
                      <CalendarHeart size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-stone-900 mb-2">Event Management</h4>
                    <p className="text-sm text-stone-600 leading-relaxed mb-6">
                      Lumina - A specialized platform curating exclusive gatherings, dinners, and events. Intentional connections for a modern lifestyle.
                    </p>
                    <span className="inline-flex items-center gap-2 text-blue-600 text-[10px] font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                      Access Portal <ArrowRight size={12} />
                    </span>
                  </div>
                </motion.div>
              </Link>

              {/* Gold Project Card */}
              <Link href="/gold" className="group block">
                <motion.div 
                  whileHover={{ y: -3 }}
                  className="h-full bg-white rounded-2xl p-8 border border-stone-200 shadow-sm hover:shadow-xl hover:border-yellow-400 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Gem size={100} className="text-yellow-500" />
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center mb-6 border border-yellow-100 text-yellow-600">
                      <Gem size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-stone-900 mb-2">Gold Project</h4>
                    <p className="text-sm text-stone-600 leading-relaxed mb-6">
                      Premium gold investments and trading. Secure, transparent, and revolutionary platform for the modern gold enthusiast.
                    </p>
                    <span className="inline-flex items-center gap-2 text-yellow-600 text-[10px] font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                      Learn More <ArrowRight size={12} />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Section 3: Event Management Idea (Divorcee Events) */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          id="about" 
          className="py-10 relative bg-white border-t border-stone-200"
        >
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="bg-[#F7F5F0] border border-stone-200 rounded-2xl p-8 lg:p-12 flex flex-col md:flex-row items-center gap-8 lg:gap-12">
              <motion.div 
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="w-full md:w-1/2"
              >
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
              </motion.div>
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-square w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-[8px] border-white shadow-lg relative">
                  <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80" alt="People connecting" loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 4: Dummy Gold Data */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-12 bg-[#FDFBF7] relative border-t border-stone-200 text-stone-900"
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
             <motion.div
               initial={{ y: -30, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
             >
               <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mb-6 shadow-lg shadow-yellow-500/20">
                  <Gem size={20} className="text-white" />
               </div>
               <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4">
                 The Gold Standard of Investment
               </h3>
               <p className="text-stone-600 max-w-xl mx-auto text-sm font-light leading-relaxed mb-8">
                 Leveraging decades of market insight, our upcoming Gold division will offer unprecedented access to premium gold trading.
               </p>
             </motion.div>
             
             <motion.div 
               initial={{ y: -30, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
               className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-stone-200 pt-8"
             >
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
             </motion.div>
          </div>
        </motion.section>
      </main>


    </div>
  );
}
