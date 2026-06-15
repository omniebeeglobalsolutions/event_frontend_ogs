"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, MapPin, IndianRupee, Users, ArrowLeft, CheckCircle2, Star, Sparkles, ShieldAlert, Heart, Scissors, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import api from '../../../lib/api';
import { useAuth } from '../../../context/AuthContext';
import Link from 'next/link';
import Script from 'next/script';

// Dynamic Background Component for Event Details
const ThemeBackground = ({ theme }: { theme: string }) => {
  const [particles, setParticles] = useState<any[]>([]);
  const isSpiritual = theme === 'spiritual';

  useEffect(() => {
    // Large sparkles/hearts blinking/pulsing in place across the background
    setParticles(Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 30 + 20, 
      x: Math.random() * 100,
      y: Math.random() * 100, 
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
          className={`absolute ${isSpiritual ? 'text-[#B87A3D]/40' : 'text-rose-400/40'}`}
          style={{ left: `${p.x}vw`, top: `${p.y}vh` }}
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
          {isSpiritual ? <Sparkles size={p.size} /> : <Heart size={p.size} />}
        </motion.div>
      ))}
    </div>
  );
};

export default function EventDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Booking state
  const [ticketCount, setTicketCount] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookedTicket, setBookedTicket] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);
  
  const [hasBooked, setHasBooked] = useState(false);
  const [checkingBooking, setCheckingBooking] = useState(true);

  const isTraditional = event && event.category && event.category.toLowerCase().trim() === 'traditional event';
  const totalAmount = event
    ? (isTraditional
        ? event.ticketPrice + (ticketCount - 1) * 100
        : event.ticketPrice * ticketCount)
    : 0;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/events/${id}`);
        setEvent(data);
      } catch (error) {
        toast.error('Failed to fetch event details');
        router.push('/events');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEvent();
  }, [id, router]);

  useEffect(() => {
    const checkUserBooking = async () => {
      if (authLoading) return; // wait for auth context to load
      
      if (!user) {
        setCheckingBooking(false);
        return;
      }
      try {
        const { data } = await api.get('/bookings/mybookings');
        
        // Ensure data is an array
        const bookingsArray = Array.isArray(data) ? data : data.bookings || [];
        
        const alreadyBooked = bookingsArray.some((booking: any) => {
          if (!booking) return false;
          // Depending on population, event ID could be in multiple places
          const bEventId = booking.eventId?._id || booking.eventId || booking.event;
          return String(bEventId) === String(id);
        });
        
        setHasBooked(alreadyBooked);
      } catch (error) {
        console.error("Failed to check bookings", error);
      } finally {
        setCheckingBooking(false);
      }
    };
    if (id) checkUserBooking();
  }, [id, user, authLoading]);

  const hasAgeLimit = event && event.minAge !== undefined && event.maxAge !== undefined;

  const handleBookClick = () => {
    if (!user) {
      toast.info('Please create an account to book tickets');
      router.push('/register');
      return;
    }
    // Intercept with verification modal if there is a configured age limit range
    if (hasAgeLimit) {
      setShowAgeModal(true);
    } else {
      setShowPayment(true);
    }
  };

  const handleRazorpayPayment = async () => {
    setIsBooking(true);
    try {
      // 1. Create a pending booking order on the backend
      const { data } = await api.post('/bookings', {
        eventId: event._id,
        ticketCount,
        totalAmount
      });

      const { booking, order } = data;

      // 2. Configure Razorpay checkout options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_dummykey',
        amount: order.amount,
        currency: order.currency,
        name: "Lumina Events",
        description: `Ticket Booking for ${event.title}`,
        image: event.image || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80',
        order_id: order.id,
        handler: async function (response: any) {
          setIsBooking(true);
          try {
            // Verify signature on backend
            const verifyRes = await api.post('/bookings/verify', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyRes.data && verifyRes.data.booking) {
              setBookedTicket(verifyRes.data.booking);
              setBookingSuccess(true);
              setShowPayment(false);
              toast.success('Payment verified! Ticket booked successfully.');
            }
          } catch (verifyError: any) {
            toast.error(verifyError.response?.data?.message || 'Payment verification failed');
          } finally {
            setIsBooking(false);
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: ''
        },
        theme: {
          color: event.theme === 'spiritual' ? "#B87A3D" : "#F43F5E"
        },
        modal: {
          ondismiss: function () {
            setIsBooking(false);
            toast.info("Payment cancelled.");
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Booking initiation failed');
      setIsBooking(false);
    }
  };

  if (loading || checkingBooking) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FAF9F6]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B87A3D]"></div>
      </div>
    );
  }

  if (!event) return null;

  const isSpiritual = event.theme === 'spiritual';
  const bgColor = isSpiritual ? 'bg-amber-50/50' : 'bg-rose-50/50';

  return (
    <div className={`${bgColor} min-h-screen py-4 font-sans relative`}>
      <ThemeBackground theme={event.theme} />
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-1 pb-12 relative z-10">

        {/* Back Link - Balanced & beautiful */}
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-[#B87A3D] font-bold text-sm uppercase tracking-wider mb-5 transition-colors">
          <ArrowLeft className="h-4.5 w-4.5 mr-2" />
          Back to Home
        </Link>

        {/* 1. Top Cover Banner: Premium full-width banner header with balanced height */}
        <div className="relative h-56 md:h-[250px] w-full rounded-2xl overflow-hidden shadow-sm bg-[#0B132B] mb-8">
          <img
            src={event.image || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80'}
            alt={event.title}
            className="w-full h-full object-cover opacity-85"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/95 via-[#0B132B]/45 to-transparent"></div>

          {/* Banner Text details (Large, clear typography) */}
          <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap gap-2 items-center mb-1">
                <span className="bg-[#B87A3D] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block shadow-sm">
                  {event.category}
                </span>
                {hasAgeLimit && (
                  <span className="bg-[#FAF9F6]/10 border border-white/20 text-[#FAF9F6] text-[10px] font-semibold px-3 py-0.5 rounded-full uppercase tracking-wider inline-block shadow-sm">
                    Age: {event.minAge} - {event.maxAge} Yrs
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-1.5 italic leading-tight">{event.title}</h1>
              <div className="flex items-center gap-2 text-slate-200 text-sm font-light">
                <MapPin className="h-4.5 w-4.5 text-[#B87A3D]" />
                <span>{event.location}</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 px-4.5 py-2.5 rounded-2xl text-white shrink-0 sm:text-right">
              <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-0.5">Price per seat</p>
              <p className="text-lg font-bold flex items-center"><IndianRupee className="h-4 w-4 mr-0.5 text-[#B87A3D]" />{event.ticketPrice}</p>
            </div>
          </div>
        </div>

        {/* 2. Bottom Grid: Large clear fonts, tight gaps, natural start heights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Left Column (col-span-2) - Content Card (Larger, highly legible fonts) */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 space-y-6 shadow-sm">

              {/* Category Sparks Tag */}
              <div className="flex items-center gap-1.5 text-[#B87A3D] text-sm font-bold tracking-widest uppercase">
                <Sparkles className="h-4 w-4" />
                <span>Private Gathering</span>
              </div>

              {/* About gathering text (Large, rich standard book font size) */}
              <section className="space-y-3">
                <h3 className="text-lg md:text-xl font-serif text-[#0B132B] font-bold italic">About this Gathering</h3>
                <p className="text-slate-600 leading-relaxed text-base font-light whitespace-pre-wrap">{event.description}</p>
              </section>

              {/* Instructions Panel - Large readable bullets */}
              <section className="bg-[#FAF9F6] border border-slate-100 p-6 rounded-xl space-y-3">
                <h3 className="text-xs font-bold text-[#0B132B] uppercase tracking-wider flex items-center gap-2">
                  <Star className="h-4.5 w-4.5 text-[#B87A3D]" /> Instructions
                </h3>
                <ul className="list-disc list-inside text-slate-500 text-sm font-light space-y-2 pl-1 leading-relaxed">
                  <li>Please arrive 15 minutes before the start time.</li>
                  <li>Tickets are non-refundable within 24 hours of the event.</li>
                  <li>Bring a valid ID for entry verification.</li>
                </ul>
              </section>

            </div>
          </div>

          {/* Right Column (col-span-1) - Booking details card (Larger, clean inputs & icons) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 sticky top-26 space-y-6 shadow-sm">

              {/* Beautiful, spacious schedule details */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-[#B87A3D]/10 p-2.5 rounded-xl text-[#B87A3D]"><Calendar className="h-5 w-5" /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Date</p>
                    <p className="text-sm font-semibold text-[#0B132B]">
                      {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 p-2.5 rounded-xl text-blue-500"><MapPin className="h-5 w-5" /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Location</p>
                    <p className="text-sm font-semibold text-[#0B132B]">{event.location}</p>
                  </div>
                </div>

                {hasAgeLimit && (
                  <div className="flex items-center gap-4">
                    <div className="bg-amber-50 p-2.5 rounded-xl text-amber-500"><ShieldAlert className="h-5 w-5" /></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Age Requirement</p>
                      <p className="text-sm font-semibold text-[#0B132B]">{event.minAge} - {event.maxAge} Years</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <div className="bg-green-50 p-2.5 rounded-xl text-green-500"><Users className="h-5 w-5" /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Availability</p>
                    <p className="text-sm font-semibold text-[#0B132B]">{event.availableSeats} / {event.totalSeats} Seats Left</p>
                  </div>
                </div>
              </div>

              {/* Transaction elements */}
              <div className="pt-2 border-t border-slate-100">
                {bookingSuccess || hasBooked ? (
                  <div className="bg-green-50/50 border border-green-200 p-6 rounded-xl text-center space-y-4">
                    <CheckCircle2 className="h-10 w-10 text-green-500 mx-auto" />
                    <div>
                      <h4 className="text-sm font-bold text-green-800 uppercase tracking-wider">
                        {hasBooked ? 'Already Booked' : 'Booking Confirmed!'}
                      </h4>
                      <p className="text-green-600 text-xs font-light">
                        {hasBooked ? 'You have already secured a seat for this event.' : 'Seat details logged instantly.'}
                      </p>
                    </div>
                    <Link href="/bookings" className="inline-block bg-[#0B132B] text-white text-[10px] font-bold uppercase tracking-wider px-5 py-3 rounded-xl hover:bg-[#15234b] transition-colors">
                      View My Bookings
                    </Link>
                  </div>
                ) : showPayment ? (
                  <div className="bg-[#FAF9F6] p-5 rounded-xl border border-slate-200 space-y-5">
                    <div>
                      <h4 className="font-bold text-[#0B132B] text-xs uppercase tracking-wider mb-3 pl-0.5">Payment Summary</h4>
                      <div className="flex justify-between text-sm text-slate-500 font-light mb-2">
                        {isTraditional ? (
                          <>
                            <span>1x Main Ticket + {ticketCount - 1}x Guest(s)</span>
                            <span>₹{totalAmount}</span>
                          </>
                        ) : (
                          <>
                            <span>{ticketCount}x Ticket</span>
                            <span>₹{totalAmount}</span>
                          </>
                        )}
                      </div>
                      <div className="flex justify-between font-bold text-sm border-t border-slate-200/60 pt-2.5 mt-2.5 text-[#0B132B]">
                        <span>Total</span>
                        <span>₹{totalAmount}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={handleRazorpayPayment}
                        disabled={isBooking}
                        className="w-full bg-[#0B132B] hover:bg-[#15234b] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors shadow-sm disabled:opacity-70 flex justify-center items-center"
                      >
                        {isBooking ? 'Processing...' : 'Pay with Razorpay'}
                      </button>
                      <button
                        onClick={() => setShowPayment(false)}
                        className="w-full text-center text-slate-400 text-[10px] uppercase tracking-wider font-bold hover:text-slate-600 pt-0.5"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {isTraditional ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-medium text-slate-700">
                          <span>Your Ticket:</span>
                          <span className="flex items-center font-bold text-[#0B132B]"><IndianRupee className="h-3.5 w-3.5 mr-0.5 text-[#B87A3D]" />{event.ticketPrice}</span>
                        </div>
                        
                        <div className="bg-[#FAF9F6] p-3.5 rounded-xl border border-slate-100 space-y-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-xs font-bold text-[#0B132B] uppercase tracking-wider">Additional Guests</p>
                              <p className="text-[11px] text-slate-500">₹100 per guest</p>
                            </div>
                            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shrink-0">
                              <button
                                onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                                className="px-3.5 py-1.5 hover:bg-slate-100 text-[#0B132B] font-bold transition-colors text-base"
                                disabled={ticketCount <= 1}
                              >-</button>
                              <div className="px-3.5 text-center font-bold text-sm text-[#0B132B] min-w-5">{ticketCount - 1}</div>
                              <button
                                onClick={() => setTicketCount(Math.min(event.availableSeats, ticketCount + 1))}
                                className="px-3.5 py-1.5 hover:bg-slate-100 text-[#0B132B] font-bold transition-colors text-base"
                                disabled={ticketCount >= event.availableSeats}
                              >+</button>
                            </div>
                          </div>
                          
                          {ticketCount > 1 && (
                            <div className="flex justify-between text-xs text-slate-500 font-light pt-2 border-t border-slate-200/50">
                              <span>Guests ({ticketCount - 1} × ₹100):</span>
                              <span className="flex items-center"><IndianRupee className="h-3 w-3 mr-0.5" />{(ticketCount - 1) * 100}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                          <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Final Price</p>
                            <p className="text-base font-bold text-[#0B132B] flex items-center"><IndianRupee className="h-4 w-4 text-[#B87A3D] mr-0.5" />{totalAmount}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Seats</p>
                            <p className="text-sm font-semibold text-slate-700">{ticketCount} Seat{ticketCount > 1 ? 's' : ''}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center bg-[#FAF9F6] p-3 rounded-xl border border-slate-100">
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shrink-0">
                          <button
                            onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                            className="px-4 py-2 hover:bg-slate-100 text-[#0B132B] font-bold transition-colors text-base"
                          >-</button>
                          <div className="px-3 text-center font-bold text-sm text-[#0B132B] min-w-5">{ticketCount}</div>
                          <button
                            onClick={() => setTicketCount(Math.min(event.availableSeats, ticketCount + 1))}
                            className="px-4 py-2 hover:bg-slate-100 text-[#0B132B] font-bold transition-colors text-base"
                          >+</button>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total</p>
                          <p className="text-base font-bold text-[#0B132B] flex items-center justify-end"><IndianRupee className="h-4 w-4 text-[#B87A3D]" />{totalAmount}</p>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleBookClick}
                      disabled={event.availableSeats === 0}
                      className="w-full bg-[#B87A3D] hover:bg-[#9E652E] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors shadow-sm disabled:opacity-50"
                    >
                      {event.availableSeats === 0 ? 'Sold Out' : 'Book Seat Now'}
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* 3. Luxury Age Verification Dialog Modal Overlay */}
      {showAgeModal && (
        <div className="fixed inset-0 z-50 bg-[#0B132B]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center space-y-6 animate-fade-in">
            <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mx-auto">
              <ShieldAlert className="h-7 w-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-serif text-[#0B132B] font-bold italic">Age Verification Required</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                This exclusive gathering is curated specifically for the age group of <span className="font-bold text-[#B87A3D]">{event.minAge} to {event.maxAge}</span> years.
              </p>
              <p className="text-[#0B132B] font-medium text-sm pt-2">
                Are you having age between {event.minAge} and {event.maxAge}?
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowAgeModal(false)}
                className="flex-1 py-3 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors"
              >
                No, Cancel
              </button>
              <button
                onClick={() => {
                  setShowAgeModal(false);
                  setShowPayment(true);
                }}
                className="flex-1 py-3 bg-[#B87A3D] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#9E652E] transition-colors shadow-md"
              >
                Yes, I Am (OK)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Razorpay Checkout Script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* 5. Luxury Ticket Modal Overlay */}
      {bookingSuccess && bookedTicket && (
        <div className="fixed inset-0 z-50 bg-[#0B132B]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl border border-slate-100 flex flex-col md:flex-row relative"
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
                  {event.title}
                </h2>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Date</p>
                    <p className="text-xs font-semibold text-slate-700">
                      {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Venue</p>
                    <p className="text-xs font-semibold text-slate-700 truncate">{event.location}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Attendee</p>
                    <p className="text-xs font-semibold text-slate-700">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Seats Booked</p>
                    <p className="text-xs font-semibold text-slate-700">{bookedTicket.ticketCount} Seat(s)</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Amount Paid</p>
                  <p className="text-lg font-bold text-[#0B132B]">₹{bookedTicket.totalAmount}</p>
                </div>
                <div className="bg-green-500/10 text-green-600 border border-green-500/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Payment Verified
                </div>
              </div>
            </div>
            
            {/* Cut Line / Dotted divider (Vertical on desktop, horizontal on mobile) */}
            <div className="relative flex md:flex-col items-center justify-center">
              {/* Semi-circular cuts on top and bottom/sides */}
              <div className="absolute -top-3 md:-top-3 md:-left-3 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 w-6 h-6 bg-[#0B132B] rounded-full" />
              <div className="absolute -bottom-3 md:-bottom-3 md:-left-3 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 w-6 h-6 bg-[#0B132B] rounded-full" />
              
              {/* Dashed line */}
              <div className="w-full md:w-px h-px md:h-full border-t-2 md:border-l-2 border-dashed border-slate-200" />
              
              {/* Scissors icon */}
              <div className="absolute bg-white p-1 rounded-full border border-slate-100 text-slate-400 hover:text-[#B87A3D] transition-colors">
                <Scissors className="h-4 w-4" />
              </div>
            </div>
            
            {/* Right Side: Rip-off Stub / Barcode */}
            <div className="p-8 bg-slate-50 md:w-60 flex flex-col justify-between items-center text-center shrink-0">
              <div className="space-y-2">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Booking Code</p>
                <p className="text-sm font-mono font-bold text-[#0B132B] tracking-wider">{bookedTicket.bookingId}</p>
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
                <span className="text-[8px] font-mono text-slate-400 tracking-[0.2em]">ADMIT {bookedTicket.ticketCount}</span>
              </div>
              
              <div className="w-full space-y-2">
                <button
                  onClick={() => window.print()}
                  className="w-full bg-[#0B132B] hover:bg-[#15234b] text-white py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-colors shadow-sm"
                >
                  Print Ticket
                </button>
                <button
                  onClick={() => setBookingSuccess(false)}
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
