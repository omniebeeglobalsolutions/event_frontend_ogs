import Link from 'next/link';
import { Globe, MessageCircle, Camera, Briefcase, Mail, Phone, MapPin } from 'lucide-react';

export default function CompanyFooter() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-white font-bold tracking-widest text-lg uppercase mb-4">RS (OPC) PVT LTD</h2>
            <p className="text-sm text-stone-400 leading-relaxed font-light mb-6">
              A premier holding company cultivating exceptional brands and exclusive services, redefining luxury and innovation across industries.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Globe size={18} /></a>
              <a href="#" className="hover:text-white transition-colors"><MessageCircle size={18} /></a>
              <a href="#" className="hover:text-white transition-colors"><Camera size={18} /></a>
              <a href="#" className="hover:text-white transition-colors"><Briefcase size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm font-light">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-blue-400 transition-colors">Services</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-4">Our Services</h3>
            <ul className="space-y-3 text-sm font-light">
              <li><Link href="/home" className="hover:text-blue-400 transition-colors">Event Management</Link></li>
              <li><Link href="/gold" className="hover:text-blue-400 transition-colors">Gold Investment</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-4">Get In Touch</h3>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-blue-400 mt-1 shrink-0" />
                <span>123 Corporate Avenue,<br />Business District,<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-blue-400 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-blue-400 shrink-0" />
                <span>contact@rsopc.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-stone-500">
          <p>&copy; {new Date().getFullYear()} RAKESH SUAGDNH (OPC) PVT LTD. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-stone-300">Privacy Policy</Link>
            <Link href="#" className="hover:text-stone-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
