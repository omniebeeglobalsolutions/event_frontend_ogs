"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Ticket, Calendar, MapPin, CheckCircle2, Scissors, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return; // Wait for auth to initialize
    
    if (user === null) {
      router.push('/');
      return;
    }

    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/bookings/mybookings');
        setBookings(data);
      } catch (error) {
        toast.error('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">My Bookings</h1>
        <p className="text-lg text-slate-600">View and manage all your event tickets.</p>
      </div>

      <div className="space-y-6">
        {bookings.map((booking: any) => (
          <div key={booking._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-64 h-48 md:h-auto relative">
              <img 
                src={booking.eventId?.image || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80'} 
                alt={booking.eventId?.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Confirmed
                      </span>
                      <span className="text-slate-500 text-sm font-mono">ID: {booking.bookingId}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{booking.eventId?.title || 'Event Removed'}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-500 text-sm">Amount Paid</div>
                    <div className="text-xl font-bold text-slate-900">₹{booking.totalAmount}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center text-slate-600 text-sm">
                    <Calendar className="h-5 w-5 mr-2 text-rose-400" />
                    {booking.eventId?.date ? new Date(booking.eventId.date).toLocaleDateString() : 'N/A'}
                  </div>
                  <div className="flex items-center text-slate-600 text-sm">
                    <MapPin className="h-5 w-5 mr-2 text-rose-400" />
                    {booking.eventId?.location || 'N/A'}
                  </div>
                  <div className="flex items-center text-slate-600 text-sm">
                    <Ticket className="h-5 w-5 mr-2 text-rose-400" />
                    {booking.ticketCount} Ticket(s)
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <button 
                  onClick={() => setSelectedTicket(booking)}
                  className="bg-[#B87A3D] hover:bg-[#9E652E] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Ticket className="w-3.5 h-3.5" /> View Ticket
                </button>
                <Link 
                  href={`/events/${booking.eventId?._id}`}
                  className="text-slate-500 hover:text-[#B87A3D] text-sm font-semibold transition-colors"
                >
                  Event Details &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
            <Ticket className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-slate-700 mb-2">No tickets yet</h3>
            <p className="text-slate-500 mb-8">You haven't booked any events yet. Start exploring!</p>
            <Link 
              href="/events" 
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Discover Events
            </Link>
          </div>
        )}
      </div>

      {/* Luxury Ticket Modal Overlay */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-[#0B132B]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl border border-slate-100 flex flex-col md:flex-row relative text-[#0B132B]"
          >
            {/* Background design */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 to-white -z-10" />
            
            {/* Left Side: Main ticket content */}
            <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex justify-between items-start">
                  <div className="bg-[#B87A3D]/10 text-[#B87A3D] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Official Ticket
                  </div>
                  <div className="flex items-center gap-1 text-[#0B132B] font-bold font-serif text-lg italic">
                    <Sparkles className="h-4.5 w-4.5 text-[#B87A3D]" />
                    <span>Lumina</span>
                  </div>
                </div>
                
                <h2 className="text-2xl font-serif font-bold text-[#0B132B] mt-4 mb-2 italic leading-tight">
                  {selectedTicket.eventId?.title || 'Event Booking'}
                </h2>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Date</p>
                    <p className="text-xs font-semibold text-slate-700">
                      {selectedTicket.eventId?.date ? new Date(selectedTicket.eventId.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Venue</p>
                    <p className="text-xs font-semibold text-slate-700 truncate">{selectedTicket.eventId?.location || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Attendee</p>
                    <p className="text-xs font-semibold text-slate-700">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Seats Booked</p>
                    <p className="text-xs font-semibold text-slate-700">{selectedTicket.ticketCount} Seat(s)</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Amount Paid</p>
                  <p className="text-lg font-bold text-[#0B132B]">₹{selectedTicket.totalAmount}</p>
                </div>
                <div className="bg-green-500/10 text-green-600 border border-green-500/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Payment Verified
                </div>
              </div>
            </div>
            
            {/* Cut Line / Dotted divider */}
            <div className="relative flex md:flex-col items-center justify-center">
              <div className="absolute -top-3 md:-top-3 md:-left-3 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 w-6 h-6 bg-[#0B132B] rounded-full" />
              <div className="absolute -bottom-3 md:-bottom-3 md:-left-3 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 w-6 h-6 bg-[#0B132B] rounded-full" />
              
              <div className="w-full md:w-px h-px md:h-full border-t-2 md:border-l-2 border-dashed border-slate-200" />
              
              <div className="absolute bg-white p-1 rounded-full border border-slate-100 text-slate-400 hover:text-[#B87A3D] transition-colors">
                <Scissors className="h-4 w-4" />
              </div>
            </div>
            
            {/* Right Side: Rip-off Stub / Barcode */}
            <div className="p-8 bg-slate-50 md:w-60 flex flex-col justify-between items-center text-center shrink-0">
              <div className="space-y-2">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Booking Code</p>
                <p className="text-sm font-mono font-bold text-[#0B132B] tracking-wider">{selectedTicket.bookingId}</p>
              </div>
              
              {/* CSS Barcode */}
              <div className="my-6 bg-white p-4 rounded-xl border border-slate-100 flex flex-col items-center space-y-2">
                <div className="flex h-14 items-slice justify-center gap-[2px] w-36">
                  {[2,1,3,2,1,4,1,2,3,1,2,2,4,1,2,3,1,2].map((width, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800"
                      style={{ width: `${width}px` }}
                    />
                  ))}
                </div>
                <span className="text-[8px] font-mono text-slate-400 tracking-[0.2em]">ADMIT {selectedTicket.ticketCount}</span>
              </div>
              
              <div className="w-full space-y-2">
                <button
                  onClick={() => window.print()}
                  className="w-full bg-[#0B132B] hover:bg-[#15234b] text-white py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-colors shadow-sm"
                >
                  Print Ticket
                </button>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="w-full text-slate-400 hover:text-slate-600 font-bold text-[10px] uppercase tracking-widest"
                >
                  Close Ticket
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
