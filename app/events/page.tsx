"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, IndianRupee, Users, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../lib/api';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get('/events');
        // Sort events in descending order so newly added events show up in 1st place
        const sortedEvents = [...data].sort((a: any, b: any) => {
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          if (timeA !== timeB) return timeB - timeA;
          return (b._id || '').localeCompare(a._id || '');
        });
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row justify-between items-end mb-8"
      >
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Discover Events</h1>
          <p className="text-lg text-slate-600 max-w-2xl font-light">
            Find the perfect gathering, from spiritual workshops to social dinners. 
            Connect with people who understand your journey.
          </p>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {events.map((event: any) => {
            const isSpiritual = event.theme === 'spiritual';
            const today = new Date();
            today.setHours(0,0,0,0);
            const isCompleted = new Date(event.date).getTime() < today.getTime();
            
            const themeColor = isCompleted ? 'text-slate-500' : (isSpiritual ? 'text-amber-600' : 'text-rose-500');
            const themeBg = isCompleted ? 'bg-slate-100 border-slate-300' : (isSpiritual ? 'bg-amber-50 border-amber-200' : 'bg-rose-50 border-rose-200');
            const hoverTheme = isCompleted ? '' : (isSpiritual ? 'group-hover:text-amber-600' : 'group-hover:text-rose-500');
            
            return (
              <motion.div variants={itemVariants} key={event._id} className={isCompleted ? 'opacity-70 pointer-events-none' : ''}>
                <Link href={isCompleted ? '#' : `/events/${event._id}`} onClick={(e) => isCompleted && e.preventDefault()}>
                  <div className={`rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border ${
                    isCompleted 
                      ? 'border-slate-300 bg-slate-50' 
                      : (isSpiritual ? 'border-amber-100 hover:border-amber-300 bg-white' : 'border-slate-100 hover:border-rose-200 bg-white')
                  } group relative h-full flex flex-col`}>
                    
                    {/* Background accent based on theme */}
                    {isSpiritual && !isCompleted && (
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/mandala.png')] opacity-[0.04] pointer-events-none z-0"></div>
                    )}
                    
                    {/* Completed Overlay */}
                    {isCompleted && (
                      <div className="absolute inset-0 bg-black/10 z-20 pointer-events-none rounded-2xl"></div>
                    )}
                    
                    <div className="relative h-56 overflow-hidden shrink-0 z-10">
                      <img 
                        src={event.image || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80'} 
                        alt={event.title} 
                        className={`w-full h-full object-cover ${isCompleted ? 'grayscale' : 'group-hover:scale-105 transition-transform duration-700'}`}
                      />
                      <div className={`absolute top-4 right-4 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold shadow-sm flex items-center gap-1.5 ${themeBg} ${themeColor}`}>
                        {isCompleted ? (
                          <span>Completed</span>
                        ) : (
                          <>
                            {isSpiritual ? <Sparkles className="h-3 w-3" /> : <Heart className="h-3 w-3" />}
                            {event.category}
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow z-10 relative">
                      <h3 className={`text-xl font-bold text-slate-900 mb-3 ${hoverTheme} transition-colors line-clamp-1`}>{event.title}</h3>
                      <p className="text-slate-600 text-sm mb-5 line-clamp-2 font-light flex-grow">{event.description}</p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-slate-500 text-sm">
                          <Calendar className={`h-4 w-4 mr-2 ${themeColor}`} />
                          {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <div className="flex items-center text-slate-500 text-sm">
                          <MapPin className={`h-4 w-4 mr-2 ${themeColor}`} />
                          {event.location}
                        </div>
                        {event.minAge !== undefined && event.maxAge !== undefined && (
                          <div className="flex items-center text-slate-500 text-sm">
                            <Users className={`h-4 w-4 mr-2 ${themeColor}`} />
                            <span>Age Limit: <span className="font-semibold text-slate-700">{event.minAge} - {event.maxAge} Years</span></span>
                          </div>
                        )}
                        <div className="flex items-center text-slate-500 text-sm">
                          <IndianRupee className={`h-4 w-4 mr-2 ${themeColor}`} />
                          <span className="font-semibold text-slate-700">{event.ticketPrice}</span>
                        </div>
                      </div>
                      
                      <div className={`flex justify-between items-center pt-4 border-t ${isCompleted ? 'border-slate-200' : (isSpiritual ? 'border-amber-100' : 'border-slate-100')} mt-auto`}>
                        <span className="text-sm font-medium text-slate-500">
                          {isCompleted ? 'Registration Closed' : `${event.availableSeats} seats left`}
                        </span>
                        <span className={`${themeColor} font-semibold flex items-center gap-1.5`}>
                          {isCompleted ? 'Completed' : 'View Details'} {!isCompleted && (isSpiritual ? <Sparkles className="h-3.5 w-3.5" /> : <Heart className="h-3.5 w-3.5" />)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
          
          {events.length === 0 && (
            <motion.div variants={itemVariants} className="col-span-full text-center py-24 bg-white rounded-2xl border border-dashed border-slate-300">
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No upcoming events</h3>
              <p className="text-slate-500">Please check back later for new gatherings.</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
