'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar'; // Navbar utama kamu

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Daftar rute yang TIDAK menampilkan Navbar utama
  const disableNavbarRoutes = [
    '/login', 
    '/signup', 
    '/riwayat', 
    '/aboutus' // Sesuaikan dengan nama folder kamu (misal: /tentang-kami)
  ];

  // Sembunyikan Navbar utama jika rute cocok
  if (disableNavbarRoutes.includes(pathname)) {
    return null;
  }

  return <Navbar />;
}