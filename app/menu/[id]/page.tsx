'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Home, ShoppingCart, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface MenuDetail {
  id: number;
  documentId?: string;
  name: string;
  price: number;
  stock?: number;
  ketersediaan?: string;
  description?: string;
  image?: {
    url: string;
    formats?: {
      medium?: { url: string };
      small?: { url: string };
    };
  };
}

export default function DetailMenuPage() {
  const params = useParams();
  const router = useRouter();

  const [menu, setMenu] = useState<MenuDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState<string>('');

  // Fetch Data Menu dari Strapi
  useEffect(() => {
    async function getMenuDetail() {
      if (!params?.id) return;
      setLoading(true);

      try {
        let res = await fetch(
          `http://localhost:1337/api/menus/${params.id}?populate=*`
        );

        if (res.ok) {
          const result = await res.json();
          if (result.data) {
            setMenu(result.data);
            setLoading(false);
            return;
          }
        }

        // Fallback Strapi v5 (Filter documentId)
        res = await fetch(
          `http://localhost:1337/api/menus?filters[documentId][$eq]=${params.id}&populate=*`
        );
        let filterResult = await res.json();

        if (filterResult?.data && filterResult.data.length > 0) {
          setMenu(filterResult.data[0]);
          setLoading(false);
          return;
        }

        // Fallback Strapi v4 (Filter id)
        res = await fetch(
          `http://localhost:1337/api/menus?filters[id][$eq]=${params.id}&populate=*`
        );
        filterResult = await res.json();

        if (filterResult?.data && filterResult.data.length > 0) {
          setMenu(filterResult.data[0]);
          setLoading(false);
          return;
        }

        setMenu(null);
      } catch (error) {
        console.error('Gagal mengambil detail menu:', error);
        setMenu(null);
      } finally {
        setLoading(false);
      }
    }

    getMenuDetail();
  }, [params?.id]);

  // Helper Gambar
  const getImageUrl = (imageObj: any) => {
    if (!imageObj) return '/placeholder.jpeg';
    const imgPath =
      imageObj.url ||
      imageObj.formats?.medium?.url ||
      imageObj.formats?.small?.url;
    if (!imgPath) return '/placeholder.jpeg';
    return imgPath.startsWith('http') ? imgPath : `http://localhost:1337${imgPath}`;
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <p className="text-gray-400 font-medium">Memuat detail menu...</p>
      </div>
    );
  }

  if (!menu) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 gap-4 px-4 text-center">
        <p className="text-gray-600 font-medium">Menu tidak ditemukan.</p>
        <button
          onClick={() => router.back()}
          className="px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors"
        >
          Kembali ke Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FDFDFD] flex flex-col items-center py-4 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      
      {/* CONTAINER UTAMA (Menyesuaikan Ukuran Layar HP sampai Desktop) */}
      <div className="w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-6 lg:p-8">
        
        {/* --- HEADER NAVBAR --- */}
        <header className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4 sm:mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            title="Kembali"
          >
            <ArrowLeft size={22} className="sm:w-6 sm:h-6" />
          </button>

          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 font-sans tracking-tight">
            Detail Menu
          </h1>

          <div className="flex items-center gap-2 sm:gap-3 text-gray-800">
            <Link href="/home" className="p-1.5 hover:text-orange-500 hover:bg-gray-50 rounded-full transition-colors">
              <Home size={20} className="sm:w-5 sm:h-5" />
            </Link>
            <Link href="/keranjang" className="p-1.5 hover:text-orange-500 hover:bg-gray-50 rounded-full transition-colors">
              <ShoppingCart size={20} className="sm:w-5 sm:h-5" />
            </Link>
          </div>
        </header>

        {/* --- CONTENT LAYOUT (1 Kolom di HP, 2 Kolom di Laptop/Desktop) --- */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-start">
          
          {/* FOTO MENU */}
          <div className="w-full h-56 sm:h-72 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 shadow-inner border border-gray-100">
            <img
              src={getImageUrl(menu.image)}
              alt={menu.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* INFORMASI & AKSI */}
          <div className="flex flex-col justify-between h-full space-y-4 sm:space-y-6">
            <div>
              {/* NAMA & HARGA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 font-sans">
                  {menu.name}
                </h2>
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F28728] font-sans">
                  Rp {menu.price ? menu.price.toLocaleString('id-ID') : '0'}
                </span>
              </div>

              {/* STATUS TERSEDIA & STOK */}
              <div className="mt-3 flex items-center gap-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-semibold border border-emerald-200">
                  <CheckCircle2 size={14} className="fill-emerald-600 text-white" />
                  <span>Tersedia</span>
                </div>

                <span className="text-xs sm:text-sm text-gray-700 font-semibold">
                  Stok: {menu.stock ?? 30} Porsi
                </span>
              </div>

              {/* DESKRIPSI */}
              <p className="mt-4 text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed font-sans">
                {menu.description ||
                  'Rasakan kehangatan tradisional dalam semangkuk makanan lezat. Dibuat dari bahan pilihan dengan racikan rempah khas yang gurih meresap hingga suapan terakhir.'}
              </p>

              {/* ATUR JUMLAH (+ / -) */}
              <div className="mt-5 sm:mt-6">
                <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2">
                  Jumlah
                </label>
                <div className="inline-flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                  <button
                    onClick={handleDecrease}
                    className="w-8 h-8 flex items-center justify-center text-gray-700 font-bold text-lg hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm sm:text-base text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="w-8 h-8 flex items-center justify-center text-gray-700 font-bold text-lg hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* INPUT CATATAN */}
              <div className="mt-4 sm:mt-5">
                <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2">
                  Catatan Untuk Penjual:
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Contoh: Tidak pedas, tidak pakai timun, dll."
                  className="w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-700 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder:text-gray-400 shadow-sm"
                />
              </div>
            </div>

            {/* TOMBOL KANJANG */}
            <div className="pt-2">
              <button className="w-full bg-[#F28728] hover:bg-orange-600 text-white font-bold py-3.5 sm:py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99]">
                <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Tambah Ke Keranjang</span>
              </button>
            </div>

          </div>

        </main>
      </div>

    </div>
  );
}