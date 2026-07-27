'use client';

import React, { useState, useRef } from 'react';
import { Search, Star, Plus, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Data Dummy Rekomendasi Menu
const RECOMMENDED_MENUS = [
  { id: 1, name: 'Es Teh', price: 'Rp 3.000', rating: 5, image: '/es teh.jpeg' },
  { id: 2, name: 'Rencang Sangu', price: 'Rp 3.000', rating: 5, image: '/masakan.jpeg' },
  { id: 3, name: 'Rujak Coel', price: 'Rp 5.000', rating: 5, image: '/rujak coel.jpg' },
  { id: 4, name: 'Rujak Cuka', price: 'Rp 5.000', rating: 5, image: '/rujak cuka.jpeg' },
  { id: 5, name: 'Korean Street Food', price: 'Rp 3.000', rating: 5, image: '/korean food.jpg' },
  { id: 6, name: 'Salad Jeli', price: 'Rp 6.000', rating: 5, image: '/salad jeli.jpeg' },
];

// Data Dummy Toko/Kantin
const STORES = [
  { id: 1, name: 'Mas Arjo', rating: 5, image: '/kantin mas arjo.jpeg' },
  { id: 2, name: 'Kantin Lies', rating: 5, image: '/kantin lies.jpeg' },
  { id: 3, name: 'Kantin Bu Nani', rating: 5, image: '/kantin bi nani.jpeg' },
  { id: 4, name: 'Kantin Teh Enci', rating: 5, image: '/kantin teh enci.jpeg' },
  { id: 5, name: 'Kantin Apih', rating: 5, image: '/kantin apih.jpeg' },
  { id: 6, name: 'Kantin Pa Zaenal', rating: 5, image: '/kanten pa zaenal.jpeg' },
  { id: 7, name: 'Kantin Bu Joe', rating: 5, image: '/kantin bu joe.jpeg' },
  { id: 8, name: 'Kantin Hampura', rating: 5, image: '/kantin hampura.jpeg' },
  { id: 9, name: 'Kantin Mas Echo', rating: 5, image: '/kantin mas echo.jpeg' },
];

export default function HomePage() {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');

  const menuScrollRef = useRef<HTMLDivElement>(null);
  const storeScrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20 w-full overflow-x-hidden">
      {/* --- MAIN CONTENT --- */}
      <main className="w-full mt-24 px-6 sm:px-12 md:px-16">
        
        {/* --- HERO BANNER --- */}
        <div 
          className="relative h-64 w-full overflow-hidden rounded-[32px] sm:rounded-[40px] bg-cover bg-center sm:h-80 shadow-sm"
          style={{ backgroundImage: "url('/bg_makanan.jpeg')" }}
        >
          <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-2xl font-serif text-white sm:text-4xl">Selamat Datang</h2>
            <p className="mt-2 text-sm text-gray-200 sm:text-lg">Cari makanan favoritmu hari ini!</p>

            <div className="mt-6 flex w-full max-w-xl items-center rounded-full bg-white px-5 py-3 shadow-lg">
              <Search className="text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ml-3 w-full bg-transparent text-sm sm:text-base outline-none text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* --- SECTION 1: REKOMENDASI MENU --- */}
        <section className="mt-12 relative group">
          <h3 className="text-2xl font-serif font-medium text-gray-900 sm:text-3xl">
            Rekomendasi Menu
          </h3>

          <div className="relative mt-6">
            <button 
              onClick={() => handleScroll(menuScrollRef, 'left')}
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl text-orange-500 border border-gray-100 hover:bg-orange-50 hover:scale-110 transition-all"
            >
              <ChevronLeft size={28} />
            </button>

            <div 
              ref={menuScrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-3 px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {RECOMMENDED_MENUS.map((menu) => (
                <div 
                  key={menu.id} 
                  className="flex min-w-[480px] sm:min-w-[540px] flex-shrink-0 items-center gap-6 rounded-[32px] border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="h-36 w-36 sm:h-40 sm:w-40 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                    <img src={menu.image} alt={menu.name} className="h-full w-full object-cover" />
                  </div>

                  <div className="flex flex-grow flex-col justify-between py-1 h-full min-w-0">
                    <div>
                      <h4 className="text-xl font-serif font-medium text-gray-800 sm:text-2xl truncate">
                        {menu.name}
                      </h4>
                      <p className="text-lg font-bold text-gray-900 mt-2">{menu.price}</p>
                      
                      <div className="mt-3 flex gap-1">
                        {[...Array(menu.rating)].map((_, i) => (
                          <Star key={i} size={18} fill="#FFD700" className="text-yellow-400" />
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button className="rounded-2xl bg-orange-500 p-3 text-white shadow-lg transition-colors hover:bg-orange-600">
                        <Plus size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleScroll(menuScrollRef, 'right')}
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl text-orange-500 border border-gray-100 hover:bg-orange-50 hover:scale-110 transition-all"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </section>

        {/* --- SECTION 2: TOKO KAMI --- */}
        <section className="mt-14 relative group">
          <h3 className="text-2xl font-serif font-medium text-gray-900 sm:text-3xl">
            Toko Kami
          </h3>

          <div className="relative mt-6">
            <button 
              onClick={() => handleScroll(storeScrollRef, 'left')}
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg text-orange-500 border border-gray-100 hover:bg-orange-50 hover:scale-110 transition-all"
            >
              <ChevronLeft size={24} />
            </button>

            <div 
              ref={storeScrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-2 px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {STORES.map((store) => (
                <div 
                  key={store.id} 
                  className="flex w-[260px] flex-shrink-0 flex-col items-center rounded-[28px] border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="h-40 w-full overflow-hidden rounded-2xl bg-gray-100">
                    <img src={store.image} alt={store.name} className="h-full w-full object-cover" />
                  </div>

                  <div className="mt-3 text-center w-full">
                    <h4 className="text-lg font-serif font-medium text-gray-800">{store.name}</h4>
                    
                    <div className="mt-1 flex justify-center gap-0.5">
                      {[...Array(store.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="#FFD700" className="text-yellow-400" />
                      ))}
                    </div>

                    <button className="mt-4 w-full rounded-xl bg-orange-500 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-orange-600">
                      Lihat Menu
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleScroll(storeScrollRef, 'right')}
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg text-orange-500 border border-gray-100 hover:bg-orange-50 hover:scale-110 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}