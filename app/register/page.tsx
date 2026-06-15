"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    mobile: '', gender: 'Male', age: '', city: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      await api.post('/auth/register', registerData);
      toast.success('Account created successfully! Please sign in.');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#FAF9F6] p-4 overflow-hidden">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-100 flex overflow-hidden h-[620px]">
        {/* Left Side - Image */}
        <div className="hidden md:flex md:w-1/2 relative bg-[#0a0a0a]">
          <img 
            src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80" 
            alt="People connecting" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B132B]/60 to-[#0B132B]"></div>
          
          <div className="relative z-10 flex flex-col justify-end p-8 text-white h-full max-w-sm">
            <h1 className="text-2xl font-semibold leading-snug mb-3 tracking-tight">
              Curated spaces for intentional growth.
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Apply for membership to access exclusive events and connect with a community that shares your values.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-between p-10 h-full">
          {/* Header */}
          <div>
            <h2 className="text-xs font-bold text-[#B87A3D] uppercase tracking-[0.2em] mb-4">Lumina</h2>
            <h3 className="text-2xl font-semibold text-[#0B132B] mb-1.5 tracking-tight">Create an Account</h3>
            <p className="text-slate-400 text-xs font-light leading-relaxed">Join our waiting list and elevate your social circle.</p>
          </div>

          {/* Form */}
          <form className="space-y-3.5 my-auto py-2 overflow-y-auto pr-1" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
              <div className="col-span-2">
                <label className="block text-[8px] font-bold text-[#0B132B] uppercase tracking-wider mb-1 pl-0.5">Full Name</label>
                <input type="text" name="name" required className="block w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#0B132B] focus:border-[#0B132B] transition-colors text-xs outline-none text-slate-700 placeholder:text-slate-300" onChange={handleChange} />
              </div>
              <div className="col-span-2">
                <label className="block text-[8px] font-bold text-[#0B132B] uppercase tracking-wider mb-1 pl-0.5">Email Address</label>
                <input type="email" name="email" required className="block w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#0B132B] focus:border-[#0B132B] transition-colors text-xs outline-none text-slate-700 placeholder:text-slate-300" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-[8px] font-bold text-[#0B132B] uppercase tracking-wider mb-1 pl-0.5">Password</label>
                <input type="password" name="password" required className="block w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#0B132B] focus:border-[#0B132B] transition-colors text-xs outline-none text-slate-700 placeholder:text-slate-300" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-[8px] font-bold text-[#0B132B] uppercase tracking-wider mb-1 pl-0.5">Confirm Password</label>
                <input type="password" name="confirmPassword" required className="block w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#0B132B] focus:border-[#0B132B] transition-colors text-xs outline-none text-slate-700 placeholder:text-slate-300" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-[8px] font-bold text-[#0B132B] uppercase tracking-wider mb-1 pl-0.5">Mobile</label>
                <input type="tel" name="mobile" required className="block w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#0B132B] focus:border-[#0B132B] transition-colors text-xs outline-none text-slate-700 placeholder:text-slate-300" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-[8px] font-bold text-[#0B132B] uppercase tracking-wider mb-1 pl-0.5">Gender</label>
                <select name="gender" className="block w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#0B132B] focus:border-[#0B132B] transition-colors text-xs bg-white outline-none text-slate-700" onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[8px] font-bold text-[#0B132B] uppercase tracking-wider mb-1 pl-0.5">Age</label>
                <input type="number" name="age" className="block w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#0B132B] focus:border-[#0B132B] transition-colors text-xs outline-none text-slate-700 placeholder:text-slate-300" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-[8px] font-bold text-[#0B132B] uppercase tracking-wider mb-1 pl-0.5">City</label>
                <input type="text" name="city" className="block w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#0B132B] focus:border-[#0B132B] transition-colors text-xs outline-none text-slate-700 placeholder:text-slate-300" onChange={handleChange} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-xs font-bold text-white bg-[#0B132B] hover:bg-[#15234b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B132B] transition-colors mt-4 tracking-wide"
            >
              {loading ? 'CREATING ACCOUNT...' : 'APPLY FOR MEMBERSHIP'}
            </button>
          </form>

          {/* Footer */}
          <div>
            <div className="pt-3 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400 font-light">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-[#B87A3D] hover:text-[#8C5A2A] transition-colors pl-1">
                  Sign In
                </Link>
              </p>
            </div>

            <div className="mt-4 flex justify-center gap-6 text-[9px] font-semibold text-slate-400 uppercase tracking-widest">
              <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
