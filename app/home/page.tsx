'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, Star, Plus, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface MenuItem {
  id: number;
  documentId?: string;
  name?: string;
  price?: number;
  image?: any;
  tenant?: any;
}

interface TenantItem {
  id: number;
  documentId?: string;
  name?: string;
  rating?: number;
  image?: any;
  foto?: any;
  gambar?: any;
  cover?: any;
}

export default function HomePage() {
  const pathname = usePathname();
  const router = useRouter();

  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [tenants, setTenants] = useState<TenantItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const menuScrollRef = useRef<HTMLDivElement>(null);
  const storeScrollRef = useRef<HTMLDivElement>(null);

  // 1. Fetch Data Menu & Toko/Homes dari Strapi
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [resMenus, resHomes] = await Promise.all([
          fetch('http://localhost:1337/api/menus?populate=*'),
          fetch('http://localhost:1337/api/homes?populate=*'),
        ]);

        const dataMenus = await resMenus.json();
        const dataHomes = await resHomes.json();

        // Cek data di Console Browser (F12)
        console.log('--- DATA HOMES / TOKO DARI STRAPI ---', dataHomes);

        setMenus(dataMenus?.data || []);
        setTenants(dataHomes?.data || []);
      } catch (error) {
        console.error('Gagal mengambil data Home:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // 2. Filter Search Real-Time
  const filteredMenus = useMemo(() => {
    if (!searchTerm.trim()) return menus;
    const query = searchTerm.toLowerCase().trim().replace(/\s+/g, ' ');
    return menus.filter((menu) => {
      if (!menu.name) return false;
      return menu.name.toLowerCase().includes(query);
    });
  }, [menus, searchTerm]);

  // Helper URL Gambar yang Memeriksa Semua Kemungkinan Field (image, foto, gambar, cover)
  const getImageUrl = (item: any) => {
  if (!item) return '/placeholder.jpeg';

  // 1. Ambil objek media dari berbagai kemungkinan nama field di Strapi
  const media = item.image || item.foto || item.gambar || item.cover;

  if (!media) return '/placeholder.jpeg';

  // 2. Handling jika bentuknya Array
  const target = Array.isArray(media) ? media[0] : media;

  // 3. Handling jika Strapi v4 (pake .data atau .data.attributes)
  const nestedData = target?.data?.attributes || target?.data || target;

  // 4. Ambil URL gambarnya
  const rawUrl =
    nestedData?.url ||
    nestedData?.formats?.medium?.url ||
    nestedData?.formats?.small?.url ||
    nestedData?.formats?.thumbnail?.url;

  if (!rawUrl) return '/placeholder.jpeg';

  // 5. Pastikan selalu menggunakan domain localhost:1337 jika url berbentuk relatif (/uploads/...)
  return rawUrl.startsWith('http') ? rawUrl : `http://localhost:1337${rawUrl}`;
};

  // Handler Scroll Horizontal
  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleGoToMenuDetail = (menu: MenuItem) => {
    const targetId = menu.documentId || menu.id;
    router.push(`/menu/${targetId}`);
  };

  const handleGoToTenantDetail = (tenant: TenantItem) => {
    const targetId = tenant.documentId || tenant.id;
    router.push(`/toko/${targetId}`);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20 w-full overflow-x-hidden">
      {/* --- MAIN CONTENT --- */}
      <main className="w-full mt-24 px-6 sm:px-12 md:px-16">
        
        {/* HERO BANNER */}
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
                placeholder="Search makanan favoritmu..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ml-3 w-full bg-transparent text-sm sm:text-base outline-none text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* REKOMENDASI MENU */}
        <section className="mt-12 relative group">
          <h3 className="text-2xl font-serif font-medium text-gray-900 sm:text-3xl">
            {searchTerm ? `Hasil Pencarian ("${searchTerm}")` : 'Rekomendasi Menu'}
          </h3>

          {loading ? (
            <p className="py-8 text-gray-400">Memuat menu...</p>
          ) : filteredMenus.length > 0 ? (
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
                {filteredMenus.map((menu) => (
                  <div 
                    key={menu.id} 
                    className="flex min-w-[320px] sm:min-w-[420px] flex-shrink-0 items-center gap-4 sm:gap-6 rounded-[32px] border border-gray-100 bg-white p-4 sm:p-5 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="h-28 w-28 sm:h-36 sm:w-36 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                      <img 
                        src={getImageUrl(menu)} 
                        alt={menu.name || 'Menu'} 
                        className="h-full w-full object-cover" 
                      />
                    </div>

                    <div className="flex flex-grow flex-col justify-between py-1 h-full min-w-0">
                      <div>
                        <h4 className="text-lg font-serif font-medium text-gray-800 sm:text-xl truncate">
                          {menu.name}
                        </h4>
                        <p className="text-base font-bold text-orange-500 mt-1">
                          Rp {menu.price ? menu.price.toLocaleString('id-ID') : '0'}
                        </p>
                        
                        <div className="mt-2 flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill="#FFD700" className="text-yellow-400" />
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end mt-3">
                        <button 
                          onClick={() => handleGoToMenuDetail(menu)}
                          className="rounded-2xl bg-orange-500 p-2.5 sm:p-3 text-white shadow-md transition-colors hover:bg-orange-600 active:scale-95"
                          title="Lihat Detail Menu"
                        >
                          <Plus size={20} />
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
          ) : (
            <div className="mt-6 py-10 text-center text-gray-500 border border-gray-100 rounded-3xl">
              Menu "{searchTerm}" tidak ditemukan.
            </div>
          )}
        </section>

        {/* TOKO KAMI */}
        {!searchTerm && (
          <section className="mt-14 relative group">
            <h3 className="text-2xl font-serif font-medium text-gray-900 sm:text-3xl">
              Toko Kami
            </h3>

            {tenants.length === 0 ? (
              <div className="mt-6 p-6 text-center text-gray-400 border border-dashed border-gray-200 rounded-2xl">
                Belum ada data Toko dari Strapi.
              </div>
            ) : (
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
                  {tenants.map((store) => (
                    <div 
                      key={store.id} 
                      className="flex w-[240px] sm:w-[260px] flex-shrink-0 flex-col items-center rounded-[28px] border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="h-36 sm:h-40 w-full overflow-hidden rounded-2xl bg-gray-100">
                        <img 
                          src={getImageUrl(store)} 
                          alt={store.name || 'Toko'} 
                          className="h-full w-full object-cover" 
                        />
                      </div>

                      <div className="mt-3 text-center w-full">
                        <h4 className="text-base sm:text-lg font-serif font-medium text-gray-800 truncate">
                          {store.name || 'Nama Toko'}
                        </h4>
                        
                        <div className="mt-1 flex justify-center gap-0.5">
                          {[...Array(Math.floor(Number(store.rating) || 5))].map((_, i) => (
                            <Star key={i} size={15} fill="#FFD700" className="text-yellow-400" />
                          ))}
                        </div>

                        <button 
                          onClick={() => handleGoToTenantDetail(store)}
                          className="mt-4 w-full rounded-xl bg-orange-500 py-2.5 text-xs sm:text-sm font-medium text-white shadow-sm transition-colors hover:bg-orange-600 active:scale-95"
                        >
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
            )}
          </section>
        )}

      </main>
    </div>
  );
}