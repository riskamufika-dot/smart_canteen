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
    '/aboutus',
    '/menu', // Sesuaikan dengan nama folder kamu (misal: /tentang-kami)
  ];

  // 2. Cek halaman statis
  const isStaticDisabled = disableNavbarRoutes.includes(pathname);

  // 3. Cek apakah jalurnya mengarah ke halaman detail menu (folder menu/[id])
  // "/menu/" artinya cocok untuk URL seperti /menu/1, /menu/2, /menu/nasi-goreng, dll.
  const isDetailMenuPage = pathname.startsWith('/menu/');

  // Sembunyikan Navbar jika berada di salah satu halaman tersebut
  if (isStaticDisabled || isDetailMenuPage) {
    return null;
  }
  // Sembunyikan Navbar utama jika rute cocok
  if (disableNavbarRoutes.includes(pathname)) {
    return null;
  }

  return <Navbar />;
}