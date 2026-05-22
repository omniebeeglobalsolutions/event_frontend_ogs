"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Ticket, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
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

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <Link 
                  href={`/events/${booking.eventId?._id}`}
                  className="text-rose-500 hover:text-rose-700 font-medium transition-colors"
                >
                  View Event Details &rarr;
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
    </div>
  );
}
