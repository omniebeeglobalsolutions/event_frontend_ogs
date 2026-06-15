"use client";

import { usePathname } from 'next/navigation';
import { Providers } from './Providers';
import Navbar from './Navbar';
import Footer from './Footer';
import CompanyFooter from './CompanyFooter';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isLuminaPath = pathname.startsWith('/') || 
                       pathname.startsWith('/events') || 
                       pathname.startsWith('/gallery') || 
                       pathname.startsWith('/bookings');
                       
  const isAuthPath = pathname === '/login' || pathname === '/register';

  const showCompanyFooter = !isLuminaPath && !isAuthPath;

  return (
    <Providers>
      {isLuminaPath && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {pathname === '/' && <Footer />}
      {showCompanyFooter && <CompanyFooter />}
    </Providers>
  );
}
