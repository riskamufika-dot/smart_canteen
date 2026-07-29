'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  // Daftar halaman yang TIDAK boleh menampilkan Navbar
  const hiddenPaths = [
    '/login',
    '/signup',
    '/aboutus',
    '/riwayat',
  
  ];

  // Jika halaman saat ini ada di dalam daftar hiddenPaths, jangan tampilkan Navbar
  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/aboutus' },
    { name: 'History', href: '/riwayat' },
  ];

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-1 sm:gap-4">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="flex flex-col sm:flex-row leading-tight font-bold text-xs sm:text-xl whitespace-nowrap shrink-0"
          >
            <span className="text-orange-500">Smart</span>
            <span className="text-black sm:ml-1">Canteen</span>
          </Link>

          {/* Navigasi */}
          <div className="flex items-center gap-2 sm:gap-6 md:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-semibold text-xs sm:text-base whitespace-nowrap transition-colors duration-150 ${
                    isActive ? 'text-orange-500' : 'text-black'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Logout */}
          <div className="flex items-center shrink-0">
            <Link
              href="/login"
              title="Keluar"
              className="flex items-center text-black p-1 sm:p-2 rounded-lg"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}