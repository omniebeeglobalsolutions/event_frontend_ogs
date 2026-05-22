"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Search, ChevronDown, CheckCircle, Diamond, ShieldCheck, Sparkles, ArrowRight, Star, Users, Heart, IndianRupee, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../lib/api';

// Floating Particles Component for the spiritual moving background
const FloatingParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Large spiritual sparkles blinking/pulsing in place across the background
    setParticles(Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 30 + 20, // Much larger size (20-50px)
      x: Math.random() * 100, // random x position
      y: Math.random() * 100, // random y position
      duration: Math.random() * 4 + 3, // pulsing duration (3-7s)
      delay: Math.random() * 5
    })));
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-[#B87A3D]/40"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
          }}
          animate={{
            scale: [0.7, 1.2, 0.7], // pulse effect (increase/decrease size)
            opacity: [0.15, 0.5, 0.15] // blink effect
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        >
          <Sparkles size={p.size} />
        </motion.div>
      ))}
    </div>
  );
};

export default function HomeDashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [exploreGatherings, setExploreGatherings] = useState<any[]>([]);
  const [curatedFormats, setCuratedFormats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [exploreIndex, setExploreIndex] = useState(0);
  const [curatedIndex, setCuratedIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [exploreItemsPerView, setExploreItemsPerView] = useState(4);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'TBA';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'TBA';
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDay = (dateStr: string) => {
    if (!dateStr) return '--';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '--';
    return d.toLocaleDateString(undefined, { day: 'numeric' });
  };

  const getMonth = (dateStr: string) => {
    if (!dateStr) return 'TBA';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'TBA';
    return d.toLocaleDateString(undefined, { month: 'short' }).toUpperCase();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
        setExploreItemsPerView(4);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
        setExploreItemsPerView(2);
      } else {
        setItemsPerView(1);
        setExploreItemsPerView(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, exploreRes, curatedRes] = await Promise.all([
          api.get('/events'),
          api.get('/explore-gatherings'),
          api.get('/curated-formats')
        ]);
        
        // Sort events in descending order so newly added events show up in 1st place
        const sortedEvents = [...eventsRes.data].sort((a: any, b: any) => {
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          if (timeA !== timeB) return timeB - timeA;
          return (b._id || '').localeCompare(a._id || '');
        });

        // Filter out past events
        const now = new Date();
        const upcomingEvents = sortedEvents.filter((event: any) => {
          return new Date(event.date).getTime() >= now.getTime();
        });

        setEvents(upcomingEvents);
        setExploreGatherings(exploreRes.data);
        setCuratedFormats(curatedRes.data);
      } catch (error) {
        console.error('Failed to fetch home dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const nextCarousel = () => {
    setCarouselIndex((prev) => {
      const maxIndex = events.length - itemsPerView;
      if (maxIndex <= 0) return 0;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevCarousel = () => {
    setCarouselIndex((prev) => {
      const maxIndex = events.length - itemsPerView;
      if (maxIndex <= 0) return 0;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const nextExploreCarousel = () => {
    setExploreIndex((prev) => {
      const maxIndex = exploreGatherings.length - exploreItemsPerView;
      if (maxIndex <= 0) return 0;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevExploreCarousel = () => {
    setExploreIndex((prev) => {
      const maxIndex = exploreGatherings.length - exploreItemsPerView;
      if (maxIndex <= 0) return 0;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const nextCuratedCarousel = () => {
    setCuratedIndex((prev) => {
      const maxIndex = curatedFormats.length - itemsPerView;
      if (maxIndex <= 0) return 0;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevCuratedCarousel = () => {
    setCuratedIndex((prev) => {
      const maxIndex = curatedFormats.length - itemsPerView;
      if (maxIndex <= 0) return 0;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  useEffect(() => {
    if (events.length <= 3) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => {
        const maxIndex = events.length - itemsPerView;
        if (maxIndex <= 0) return 0;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [events.length, itemsPerView]);

  useEffect(() => {
    if (exploreGatherings.length <= 3) return;
    const interval = setInterval(() => {
      setExploreIndex((prev) => {
        const maxIndex = exploreGatherings.length - exploreItemsPerView;
        if (maxIndex <= 0) return 0;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [exploreGatherings.length, exploreItemsPerView]);

  useEffect(() => {
    if (curatedFormats.length <= 3) return;
    const interval = setInterval(() => {
      setCuratedIndex((prev) => {
        const maxIndex = curatedFormats.length - itemsPerView;
        if (maxIndex <= 0) return 0;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [curatedFormats.length, itemsPerView]);

  // Slides configuration (ORIGINAL HERO UNTOUCHED)
  const slides: any[] = [
    {
      id: 'default',
      image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80',
      title: 'Your New Chapter Begins with Safe Connections.',
      subtitle: 'A premium community and event ticketing ecosystem designed exclusively for divorced men and women looking to build intentional relationships and start a beautiful fresh page.',
      isDefault: true
    },
    ...events.slice(0, 4).map((event: any) => ({
      id: event._id,
      image: event.image || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80',
      title: event.title,
      subtitle: event.description,
      category: event.category,
      theme: event.theme,
      date: event.date,
      location: event.location,
      ticketPrice: event.ticketPrice,
      isDefault: false
    }))
  ];

  // Auto-scroll carousel every 3 seconds if upcoming events exist
  useEffect(() => {
    const heroEventsCount = events.slice(0, 4).length;
    if (heroEventsCount === 0) return;
    const totalSlides = heroEventsCount + 1;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(interval);
  }, [events]);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
  };
  
  const fadeLeftVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  // Bounds-checking helper effects to adjust carouselIndex, exploreIndex, curatedIndex on screen resize or dynamic data updates
  useEffect(() => {
    const maxIndex = events.length - itemsPerView;
    if (carouselIndex > maxIndex) {
      setCarouselIndex(Math.max(0, maxIndex));
    }
  }, [itemsPerView, events.length, carouselIndex]);

  useEffect(() => {
    const maxIndex = exploreGatherings.length - exploreItemsPerView;
    if (exploreIndex > maxIndex) {
      setExploreIndex(Math.max(0, maxIndex));
    }
  }, [exploreItemsPerView, exploreGatherings.length, exploreIndex]);

  useEffect(() => {
    const maxIndex = curatedFormats.length - itemsPerView;
    if (curatedIndex > maxIndex) {
      setCuratedIndex(Math.max(0, maxIndex));
    }
  }, [itemsPerView, curatedFormats.length, curatedIndex]);

  const renderEventCard = (event: any) => {
    const isSpiritual = event.theme === 'spiritual';
    const themeColor = isSpiritual ? 'text-[#B87A3D]' : 'text-rose-500';
    const themeBg = isSpiritual ? 'bg-[#B87A3D]/10 border-[#B87A3D]/30' : 'bg-rose-50 border-rose-200';
    const hoverTheme = isSpiritual ? 'group-hover:text-[#B87A3D]' : 'group-hover:text-rose-500';

    return (
      <Link href={`/events/${event._id}`} className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border ${isSpiritual ? 'border-[#B87A3D]/30 shadow-[#B87A3D]/10' : 'border-rose-100 shadow-rose-100/50'} transition-all duration-500 hover:-translate-y-1.5 group flex flex-col h-full relative`}>
        {isSpiritual && (
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/mandala.png')] opacity-[0.04] pointer-events-none z-0"></div>
        )}

        <div className="relative h-56 overflow-hidden shrink-0 z-10">
          <img
            src={event.image || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80'}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Theme specific Badge (Sparkles vs Heart) */}
          <div className={`absolute top-4 left-4 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm flex items-center gap-1.5 ${themeBg} ${themeColor}`}>
            {isSpiritual ? <Sparkles className="h-3.5 w-3.5" /> : <Heart className="h-3.5 w-3.5" />}
            {event.category || 'Gathering'}
          </div>

          <div className="absolute top-4 right-4 bg-[#0B132B]/90 backdrop-blur-sm text-white rounded-xl p-2 text-center shadow-md min-w-[50px] border border-white/10">
            <p className={`text-[10px] uppercase font-bold tracking-widest leading-none mb-0.5 ${themeColor}`}>
              {getMonth(event.date)}
            </p>
            <p className="text-lg font-serif font-bold leading-none">
              {getDay(event.date)}
            </p>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow z-10 relative">
          <div className="flex justify-between items-start gap-4 mb-3.5">
            <h3 className={`text-lg font-serif font-medium leading-snug transition-colors duration-300 text-[#0B132B] ${hoverTheme}`}>
              {event.title}
            </h3>
            <div className="text-right shrink-0">
              <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block mb-0.5">Seat Price</span>
              <span className={`text-lg font-bold ${themeColor}`}>₹{event.ticketPrice}</span>
            </div>
          </div>

          <p className="text-slate-500 text-xs mb-5 line-clamp-2 font-light leading-relaxed flex-grow">
            {event.description}
          </p>

          <div className={`border-t pt-4 mt-auto space-y-3 ${isSpiritual ? 'border-[#B87A3D]/20' : 'border-slate-100'}`}>
            <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <Calendar className={`h-3.5 w-3.5 ${themeColor}`} />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className={`h-3.5 w-3.5 ${themeColor}`} />
                <span>{event.location}</span>
              </div>
            </div>

            {event.minAge !== undefined && event.maxAge !== undefined ? (
              <div className={`flex items-center gap-1.5 bg-[#FAF9F6] border rounded-lg py-1.5 px-3 text-[9px] font-bold tracking-wider uppercase ${isSpiritual ? 'border-[#B87A3D]/20 text-[#B87A3D]' : 'border-rose-100 text-rose-500'}`}>
                <Users className="h-3.5 w-3.5" />
                <span>Strict Age bracket: {event.minAge} - {event.maxAge} Years</span>
              </div>
            ) : (
              <div className={`flex items-center justify-between text-[9px] font-bold tracking-widest uppercase pt-1 transition-colors duration-300 ${isSpiritual ? 'text-[#B87A3D] group-hover:text-[#9E652E]' : 'text-rose-500 group-hover:text-rose-600'}`}>
                <span className="flex items-center gap-1.5">
                  {isSpiritual ? <Sparkles className="h-3 w-3" /> : <Heart className="h-3 w-3" />} Verified safe gathering
                </span>
                <span className="flex items-center gap-1">
                  Book seat
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="bg-amber-50/50 min-h-screen font-sans relative">
      <FloatingParticles />

      {/* 1st Section: Full-Screen Responsive Hero Section with Carousel (UNTOUCHED) */}
      <section className="relative h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden z-10">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {slides.map((slide: any, idx: number) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0B132B]/85 via-[#0B132B]/60 to-transparent"></div>
            </div>
          ))}
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-0">
          {slides[currentSlide] && (
            <div key={currentSlide} className="animate-fade-in transition-all duration-500">
              {slides[currentSlide].isDefault ? (
                <>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 tracking-tight drop-shadow-sm leading-tight italic font-medium">
                    Your New Chapter Begins<br className="hidden sm:inline" /> with Safe Connections.
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 mb-8 max-w-3xl mx-auto font-light drop-shadow-sm leading-relaxed">
                    A premium community and event ticketing ecosystem designed exclusively for divorced men and women looking to build intentional relationships and start a beautiful fresh page.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/events" className="bg-[#B87A3D] text-white px-8 py-3.5 rounded-lg font-bold text-xs hover:bg-[#9E652E] transition-colors shadow-md tracking-wider uppercase">
                      Browse Events
                    </Link>
                    <Link href="/gallery" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3.5 rounded-lg font-bold text-xs hover:bg-white/20 transition-colors shadow-md tracking-wider uppercase">
                      View Gallery
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <span className="bg-[#B87A3D] text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 inline-block shadow-sm">
                    Upcoming Gathering • {slides[currentSlide].category}
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-4 tracking-tight drop-shadow-sm leading-tight italic font-medium">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-xs sm:text-sm text-white/90 mb-6 max-w-2xl mx-auto font-light line-clamp-2 leading-relaxed">
                    {slides[currentSlide].subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4 sm:gap-6 justify-center text-[10px] text-white/80 mb-8 font-light uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-[#B87A3D]" /> {new Date(slides[currentSlide].date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#B87A3D]" /> {slides[currentSlide].location}</span>
                    <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-[#B87A3D]" /> ₹{slides[currentSlide].ticketPrice} per seat</span>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Link href={`/events/${slides[currentSlide].id}`} className="bg-[#B87A3D] text-white px-8 py-3.5 rounded-lg font-bold text-xs hover:bg-[#9E652E] transition-colors shadow-md tracking-wider uppercase flex items-center gap-2">
                      Book Your Seat <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 2nd Section: Rebranded Editorial / A Beautiful New Chapter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-2 relative z-10">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
          className="flex flex-col lg:flex-row gap-16 items-center"
        >
          {/* Left Asymmetrical Grid */}
          <div className="w-full lg:w-1/2 flex gap-4 items-center justify-center">
            <div className="space-y-4">
              <div className="h-[260px] w-[180px] sm:w-[220px] rounded-3xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80"
                  alt="Divorced couple starting over beautifully"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="h-[180px] w-[180px] sm:w-[220px] rounded-3xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
                  alt="New beautiful marriage beginnings"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="h-[456px] w-[200px] sm:w-[240px] rounded-3xl overflow-hidden shadow-lg">
              <img
                src="https://images.stockcake.com/public/2/f/3/2f3d8f8c-f5fb-4b61-b992-87825736d47c_large/holding-hands-together-stockcake.jpg"
                alt="Intimate second chance gathering"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Text Copy */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-[#B87A3D]" />
              <span className="text-[10px] font-bold text-[#B87A3D] uppercase tracking-[0.2em]">A Beautiful New Chapter</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#0B132B] tracking-tight leading-tight mb-6 font-medium">
              Exclusive sanctuary for divorced individuals.
            </h2>
            <p className="text-slate-500 font-light leading-relaxed mb-8 text-sm">
              Lumina is a premium, secure social space crafted exclusively for divorced men and women looking to rebuild their social lives, discover supportive friendships, and safely step into a beautiful second marriage.
            </p>

            <motion.div variants={staggerContainer} className="space-y-6">
              {[
                { title: "Empathetic Shared Journeys", desc: "Connect exclusively with verified individuals who understand your path, ensuring safe, compassionate, and meaningful conversations without judgment." },
                { title: "Intentional New Beginnings", desc: "Skip standard crowded dating apps. Meet like-minded peers who are ready to build genuine support networks and write a new, happy marriage chapter." },
                { title: "Premium Warm-Lit Suppers", desc: "Enjoy pressure-free evenings hosted in high-end private rooms, featuring cozy string lighting, secret dinners, and beautiful sunset mixes." }
              ].map((item, i) => (
                <motion.div variants={fadeUpVariant} key={i} className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-[#FAF9F6] border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 font-bold text-xs font-serif">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B132B] text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 3rd Section: Featured Events (Dynamic Themes Applied Here) */}
      <section className="bg-[#f0ece6]/80 backdrop-blur-sm py-10 relative z-10 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6"
          >
            <div>
              <p className="text-[10px] font-bold text-[#B87A3D] uppercase tracking-widest mb-2 flex items-center gap-2">
                <Sparkles className="h-3 w-3" /> Selected For You
              </p>
              <h2 className="text-2xl md:text-3xl font-serif text-[#0B132B] font-medium italic">Upcoming Curated Gatherings</h2>
            </div>
            <Link
              href="/events"
              className="group/btn flex items-center gap-2 text-[10px] font-bold text-[#B87A3D] hover:text-[#0B132B] tracking-widest uppercase transition-all duration-300 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md shrink-0 sm:self-end"
            >
              <span>View All Events</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#B87A3D] group-hover/btn:text-[#0B132B] group-hover/btn:translate-x-1.5 transition-all duration-300" />
            </Link>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B132B]"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
              <h3 className="text-lg font-serif italic text-slate-700 mb-2">No upcoming gatherings</h3>
              <p className="text-slate-500 font-light text-sm">Please check back later for new events.</p>
            </div>
          ) : events.length <= 3 ? (
            <motion.div 
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {events.map((event: any) => (
                <motion.div variants={fadeLeftVariant} key={event._id} className="h-full">
                  {renderEventCard(event)}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="relative group/carousel px-0 sm:px-8">
              {/* Left Arrow */}
              <button 
                onClick={prevCarousel}
                className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[#0B132B] p-2.5 rounded-full shadow-md border border-slate-200 transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none"
                aria-label="Previous event"
              >
                <ChevronLeft className="h-5 w-5 text-[#B87A3D]" />
              </button>

              {/* Viewport */}
              <div className="overflow-hidden py-4">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${carouselIndex * (100 / itemsPerView)}%)` }}
                >
                  {events.map((event: any) => (
                    <div 
                      key={event._id} 
                      className="flex-shrink-0 px-4" 
                      style={{ width: `${100 / itemsPerView}%` }}
                    >
                      <div className="h-full">
                        {renderEventCard(event)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              <button 
                onClick={nextCarousel}
                className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[#0B132B] p-2.5 rounded-full shadow-md border border-slate-200 transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none"
                aria-label="Next event"
              >
                <ChevronRight className="h-5 w-5 text-[#B87A3D]" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4th Section: Discover by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="mb-4">
          <h2 className="text-2xl md:text-3xl font-serif text-[#0B132B] mb-2 font-medium italic">Explore Gatherings</h2>
          <p className="text-slate-500 text-sm font-light">Tailored events designed with premium safety, gorgeous lighting, and like-minded peers.</p>
        </motion.div>

        {exploreGatherings.length <= 3 ? (
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {exploreGatherings.map((cat: any, i: number) => (
              <motion.div variants={fadeLeftVariant} key={cat._id || i}>
                <Link href={`/events?category=${encodeURIComponent(cat.name.toLowerCase())}`} className="group relative block h-60 md:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm">
                  <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/85 to-transparent"></div>
                  <h3 className="absolute bottom-6 left-6 text-white font-serif italic font-medium text-xl leading-snug">{cat.name}</h3>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="relative group/carousel px-0 sm:px-8">
            {/* Left Arrow */}
            <button 
              onClick={prevExploreCarousel}
              className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[#0B132B] p-2.5 rounded-full shadow-md border border-slate-200 transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none"
              aria-label="Previous category"
            >
              <ChevronLeft className="h-5 w-5 text-[#B87A3D]" />
            </button>

            {/* Viewport */}
            <div className="overflow-hidden py-4">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${exploreIndex * (100 / exploreItemsPerView)}%)` }}
              >
                {exploreGatherings.map((cat: any, i: number) => (
                  <div 
                    key={cat._id || i} 
                    className="flex-shrink-0 px-3" 
                    style={{ width: `${100 / exploreItemsPerView}%` }}
                  >
                    <Link href={`/events?category=${encodeURIComponent(cat.name.toLowerCase())}`} className="group relative block h-60 md:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm">
                      <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/85 to-transparent"></div>
                      <h3 className="absolute bottom-6 left-6 text-white font-serif italic font-medium text-xl leading-snug">{cat.name}</h3>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button 
              onClick={nextExploreCarousel}
              className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[#0B132B] p-2.5 rounded-full shadow-md border border-slate-200 transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none"
              aria-label="Next category"
            >
              <ChevronRight className="h-5 w-5 text-[#B87A3D]" />
            </button>
          </div>
        )}
      </section>

      {/* 5th Section: Curated Event Formats */}
      <section className="bg-white py-10 border-y border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="text-center max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-[#B87A3D]" />
              <span className="text-[10px] font-bold text-[#B87A3D] uppercase tracking-[0.2em]">The Framework</span>
            </div>
            <h2 className="text-3xl font-serif text-[#0B132B] font-medium italic mb-4">Curated Event Formats</h2>
            <p className="text-slate-500 font-light text-sm">Every Lumina gathering is structured for comfortable conversation, warm ambient settings, and genuine connection.</p>
          </motion.div>

          {curatedFormats.length <= 3 ? (
            <motion.div 
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {curatedFormats.map((format: any, idx: number) => (
                <motion.div variants={fadeUpVariant} key={format._id || idx} className="group flex flex-col bg-[#FAF9F6] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="h-48 overflow-hidden relative">
                    <img src={format.image} alt={format.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-[#0B132B] text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded">
                      {format.tag}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-serif text-[#0B132B] font-semibold mb-2">{format.title}</h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed mb-4">{format.description}</p>
                    </div>
                    <Link href="/events" className="text-xs font-bold text-[#B87A3D] uppercase tracking-wider flex items-center gap-1 hover:text-[#9E652E] transition-colors mt-2">
                      Discover Vibe <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="relative group/carousel px-0 sm:px-8">
              {/* Left Arrow */}
              <button 
                onClick={prevCuratedCarousel}
                className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[#0B132B] p-2.5 rounded-full shadow-md border border-slate-200 transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none"
                aria-label="Previous format"
              >
                <ChevronLeft className="h-5 w-5 text-[#B87A3D]" />
              </button>

              {/* Viewport */}
              <div className="overflow-hidden py-4">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${curatedIndex * (100 / itemsPerView)}%)` }}
                >
                  {curatedFormats.map((format: any, idx: number) => (
                    <div 
                      key={format._id || idx} 
                      className="flex-shrink-0 px-4" 
                      style={{ width: `${100 / itemsPerView}%` }}
                    >
                      <div className="group flex flex-col bg-[#FAF9F6] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                        <div className="h-48 overflow-hidden relative">
                          <img src={format.image} alt={format.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute top-4 left-4 bg-[#0B132B] text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded">
                            {format.tag}
                          </div>
                        </div>
                        <div className="p-6 flex-grow flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-serif text-[#0B132B] font-semibold mb-2">{format.title}</h3>
                            <p className="text-xs text-slate-500 font-light leading-relaxed mb-4">{format.description}</p>
                          </div>
                          <Link href="/events" className="text-xs font-bold text-[#B87A3D] uppercase tracking-wider flex items-center gap-1 hover:text-[#9E652E] transition-colors mt-2">
                            Discover Vibe <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              <button 
                onClick={nextCuratedCarousel}
                className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[#0B132B] p-2.5 rounded-full shadow-md border border-slate-200 transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none"
                aria-label="Next format"
              >
                <ChevronRight className="h-5 w-5 text-[#B87A3D]" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 6th Section: Experiences / Divorce & Second Marriage Rebrand */}
      <section className="bg-white py-12 border-b border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Content Description */}
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4 text-[#B87A3D]" />
                <span className="text-[10px] font-bold text-[#B87A3D] uppercase tracking-[0.2em]">The Path Forward</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#0B132B] tracking-tight leading-tight mb-6 font-medium italic">
                A stable second chapter, built on real companion connections.
              </h2>
              <p className="text-slate-500 font-light leading-relaxed text-sm">
                Lumina is specifically crafted for divorced men and women seeking support, safe peer companionship, and a secure pathway toward building stable, happy second marriages. We recognize that starting over after a divorce is a deeply personal and deliberate transition. Our platform is designed to offer a dignified, pressure-free sanctuary where you can connect on shared values, find understanding, and cultivate genuine friendships. By eliminating the rushed, casual nature of standard applications, we provide an intentional, supportive pathway that prepares you to step confidently and safely into a beautiful new marital chapter.
              </p>
            </div>

            {/* Right Graphics - Sunset Heart hands */}
            <div className="w-full lg:w-1/2 relative">
              <div className="rounded-3xl overflow-hidden h-[380px] shadow-xl border border-slate-100 bg-slate-50">
                <img
                  src="/heart_hands.png"
                  alt="Hands forming a heart shape at sunset representing second marriage and love after divorce"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1518199266791-5375a83164ba?auto=format&fit=crop&q=80" }}
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#0B132B] text-white p-6 rounded-2xl shadow-xl max-w-xs hidden sm:block">
                <p className="text-xs font-light text-slate-300 leading-relaxed italic font-serif">
                  "Finding Lumina after my divorce changed everything. It wasn't about rapid dating; it was about genuine, warm connections that paved the way to a happy, stable second chapter."
                </p>
                <span className="text-[10px] font-bold text-[#B87A3D] uppercase tracking-wider block mt-3">— MEMBER TESTIMONIAL</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7th Section: Magazine-style Editorial Quote & Portrait */}
      {/* 
      <section className="bg-[#FAF9F6] py-12 border-b border-slate-100 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeLeftVariant} className="flex flex-col md:flex-row items-center gap-16 justify-between">
            <div className="flex-1 max-w-xl">
              <span className="text-6xl font-serif text-[#B87A3D] block leading-none mb-2">“</span>
              <blockquote className="text-xl sm:text-2xl font-light text-[#0B132B] leading-relaxed mb-6 font-serif italic">
                We don't build standard dating platforms. We coordinate custom new chapters. Every candlelit supper and supportive seminar is a beautiful, pressure-free canvas to find friendship, healing, and fresh momentum.
              </blockquote>
              <div>
                <cite className="not-italic font-bold text-sm text-[#0B132B] block tracking-wide font-sans">Sophia Chen</cite>
                <span className="text-xs text-slate-400 font-light font-sans">Chief Curation Officer & Lifestyle Designer</span>
              </div>
            </div>

            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-2xl shrink-0 grayscale hover:grayscale-0 transition-all duration-700 border-4 border-[#FAF9F6]">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80"
                alt="Sophia Chen Curation Officer"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
      */}

    </div>
  );
}
