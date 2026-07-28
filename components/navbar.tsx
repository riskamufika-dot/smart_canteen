'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // 1. Import usePathname

export default function Navbar() {
  const pathname = usePathname(); // 2. Ambil path URL saat ini

  // 3. Daftar halaman yang TIDAK boleh ada navbar
  const hideNavbarOn = ['/', '/signup']; 
  // (Sesuaikan '/' kalau halaman login kamu ada di paling depan, atau ganti ke '/login')

  // 4. Jika URL saat ini ada di daftar di atas, sembunyikan Navbar (return null)
  if (hideNavbarOn.includes(pathname)) {
    return null;
  }

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <div className="font-bold text-xl text-orange-500">
        Smart Canteen
      </div>
      <div className="flex gap-6 items-center">
        {/* Gunakan class Tailwind 'text-gray-900' atau 'text-black' agar teksnya HITAM */}
        <Link href="/home" className="text-black font-medium hover:text-orange-500 transition">
          Home
        </Link>
        <Link href="/menu" className="text-black font-medium hover:text-orange-500 transition">
          Menu
        </Link>
        <Link href="/aboutus" className="text-black font-medium hover:text-orange-500 transition">
          About
        </Link>
        <Link href="/riwayat" className="text-black font-medium hover:text-orange-500 transition">
          History
        </Link>
      </div>
    </nav>
  );
}