'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Tutup sidebar otomatis setiap kali pindah halaman
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Kunci scroll body saat sidebar mobile terbuka
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const hiddenExactPaths = [
    '/login',
    '/signup',
    '/aboutus',
    '/riwayat',
    '/keranjang',
    '/status-pesanan',
    '/dasboard-admin',
    '/daftar-pesanan',
    '/kelola-menu',
    '/laporan',
  ];

  const isExactHidden = hiddenExactPaths.includes(pathname);
  const isMenuDetailHidden = pathname.startsWith('/menu/');

  if (isExactHidden || isMenuDetailHidden) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/aboutus' },
    { name: 'History', href: '/riwayat' },
  ];

  return (
    <>
      <nav className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">

            {/* Logo */}
            <Link
              href="/"
              className="flex flex-col sm:flex-row leading-tight font-bold text-sm sm:text-xl whitespace-nowrap shrink-0"
            >
              <span className="text-orange-500">Smart</span>
              <span className="text-black sm:ml-1">Canteen</span>
            </Link>

            {/* Navigasi Desktop */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-semibold text-base whitespace-nowrap transition-colors duration-150 hover:text-orange-500 ${
                      isActive ? 'text-orange-500' : 'text-black'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Logout Desktop */}
            <div className="hidden md:flex items-center shrink-0">
              <Link
                href="/login"
                title="Keluar"
                className="flex items-center text-black p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </Link>
            </div>

            {/* Tombol Hamburger (Mobile) */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="md:hidden flex items-center justify-center p-2 rounded-lg text-black hover:bg-gray-100 transition-colors"
              aria-label="Buka menu"
            >
              <Menu className="w-6 h-6" />
            </button>

          </div>
        </div>
      </nav>

      {/* Overlay untuk mobile sidebar */}
      <div
        onClick={() => setIsOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sidebar Mobile */}
      <aside
        className={`md:hidden fixed top-0 right-0 h-full w-72 max-w-[80%] bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-gray-100 shrink-0">
          <span className="font-bold text-sm">
            <span className="text-orange-500">Smart</span>
            <span className="text-black ml-1">Canteen</span>
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-black hover:bg-gray-100 transition-colors"
            aria-label="Tutup menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Link Navigasi */}
        <div className="flex flex-col p-4 gap-1 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-semibold text-base px-3 py-3 rounded-lg transition-colors duration-150 ${
                  isActive
                    ? 'text-orange-500 bg-orange-50'
                    : 'text-black hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Logout di bawah sidebar */}
        <div className="mt-auto p-4 border-t border-gray-100">
          <Link
            href="/login"
            className="flex items-center gap-2 text-black px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Keluar</span>
          </Link>
        </div>
      </aside>
    </>
  );
}