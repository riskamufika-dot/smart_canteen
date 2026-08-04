'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, Trash2, ShoppingCart, Home, LogOut } from 'lucide-react';

interface SubHeaderProps {
  title: string;
  titleAlign?: 'center' | 'left';
  showBack?: boolean;
  showBell?: boolean;
  showTrash?: boolean;
  showCart?: boolean;
  showHome?: boolean;
  showLogout?: boolean;
  onBellClick?: () => void;
  onTrashClick?: () => void;
  onCartClick?: () => void;
  onHomeClick?: () => void;
  onLogoutClick?: () => void;
}

export default function SubHeader({ 
  title, 
  titleAlign = 'center',
  showBack = true,
  showBell = false,
  showTrash = false,
  showCart = false,
  showHome = false,
  showLogout = false,
  onBellClick,
  onTrashClick,
  onCartClick,
  onHomeClick,
  onLogoutClick,
}: SubHeaderProps) {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between py-2 w-full">
      {/* Bagian Kiri: Tombol Kembali + Judul */}
      <div className={`flex items-center gap-3 ${titleAlign === 'center' ? 'flex-1 justify-between' : ''}`}>
        {showBack && (
          <button 
            onClick={() => router.back()} 
            className="text-black hover:opacity-75 transition p-1 -ml-1 flex items-center justify-center shrink-0"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-7 h-7 stroke-[2.5]" />
          </button>
        )}

        <h1 
          className={`text-2xl font-bold text-gray-900 ${
            titleAlign === 'left' ? 'text-left' : 'text-center flex-1'
          }`}
        >
          {title}
        </h1>
      </div>

      {/* Bagian Kanan: Deretan Ikon Aksi */}
      <div className="flex items-center gap-2">
        {/* Ikon Rumah */}
        {showHome && (
          <button 
            onClick={onHomeClick || (() => router.push('/'))} 
            className="text-gray-700 hover:text-black transition p-1"
            aria-label="Beranda"
          >
            <Home className="w-6 h-6" />
          </button>
        )}

        {/* Ikon Keranjang */}
        {showCart && (
          <button 
            onClick={onCartClick || (() => router.push('/cart'))} 
            className="text-gray-700 hover:text-black transition p-1"
            aria-label="Keranjang"
          >
            <ShoppingCart className="w-6 h-6" />
          </button>
        )}

        {/* Ikon Tong Sampah */}
        {showTrash && (
          <button 
            onClick={onTrashClick} 
            className="text-black hover:text-black transition p-1"
            aria-label="Hapus"
          >
            <Trash2 className="w-6 h-6" />
          </button>
        )}

        {/* Ikon Lonceng Notifikasi */}
        {showBell && (
          <button 
            onClick={onBellClick || (() => alert('Notifikasi'))} 
            className="text-gray-700 hover:text-black transition p-1"
            aria-label="Notifikasi"
          >
            <Bell className="w-6 h-6" />
          </button>
        )}

        {/* Ikon Keluar / Logout */}
        {showLogout && (
          <button 
            onClick={onLogoutClick} 
            className="text-red-500 hover:text-red-700 transition p-1"
            aria-label="Keluar"
          >
            <LogOut className="w-6 h-6" />
          </button>
        )}
      </div>
    </header>
  );
}