"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { emailOrUsername: email, password });
      toast.success('Welcome back!');
      login(data);
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#FAF9F6] p-4 overflow-hidden">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-100 flex overflow-hidden h-[550px]">
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
              Meaningful connections start here.
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Lumina is a dedicated space for intentional professionals to discover workshops, dinners, and social circles that matter.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-between p-10 h-full">
          {/* Header */}
          <div>
            <h2 className="text-xs font-bold text-[#B87A3D] uppercase tracking-[0.2em] mb-4">Lumina</h2>
            <h3 className="text-2xl font-semibold text-[#0B132B] mb-1.5 tracking-tight">Welcome Back</h3>
            <p className="text-slate-400 text-xs font-light leading-relaxed">Sign in to your account to continue your journey.</p>
          </div>

          {/* Form */}
          <form className="space-y-4 my-auto py-2" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[10px] font-bold text-[#0B132B] uppercase tracking-wider mb-1.5 pl-0.5">
                Email Address
              </label>
              <input
                type="text"
                required
                placeholder="name@example.com"
                className="block w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#0B132B] focus:border-[#0B132B] transition-colors text-xs outline-none text-slate-700 placeholder:text-slate-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5 pl-0.5">
                <label className="block text-[9px] font-bold text-[#0B132B] uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-[10px] font-medium text-[#B87A3D] hover:text-[#8C5A2A] transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="block w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#0B132B] focus:border-[#0B132B] transition-colors text-xs tracking-widest outline-none text-slate-700 placeholder:text-slate-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-xs font-bold text-white bg-[#0B132B] hover:bg-[#15234b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B132B] transition-colors mt-6 tracking-wide"
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>

          {/* Footer */}
          <div>
            <div className="pt-3 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400 font-light">
                New to Lumina?{' '}
                <Link href="/register" className="font-semibold text-[#B87A3D] hover:text-[#8C5A2A] transition-colors pl-1">
                  Create an Account
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
