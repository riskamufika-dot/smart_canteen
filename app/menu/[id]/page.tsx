'use client';

import SubHeader from '@/components/sub-header';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Home, ShoppingCart, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

interface MenuDetail {
  id: number;
  documentId?: string;
  name?: string;
  price?: number;
  stock?: number;
  description?: string;
  image?: any;
  attributes?: any;
}

export default function DetailMenuPage() {
  const params = useParams();
  const router = useRouter();

  const { addToCart, totalItems } = useCart();

  const [menu, setMenu] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    async function getMenuDetail() {
      const menuId = params?.id;
      if (!menuId) return;

      setLoading(true);

      try {
        // 1. Coba fetch berdasarkan Strapi ID / documentId biasa
        let res = await fetch(`http://localhost:1337/api/menus/${menuId}?populate=*`);
        
        if (res.ok) {
          const result = await res.json();
          if (result && result.data) {
            setMenu(result.data);
            setLoading(false);
            return;
          }
        }

        // 2. Fallback: Filter documentId jika Strapi v5
        res = await fetch(`http://localhost:1337/api/menus?filters[documentId][$eq]=${menuId}&populate=*`);
        if (res.ok) {
          const filterResult = await res.json();
          if (filterResult?.data && filterResult.data.length > 0) {
            setMenu(filterResult.data[0]);
            setLoading(false);
            return;
          }
        }

        // 3. Fallback: Filter id angka
        res = await fetch(`http://localhost:1337/api/menus?filters[id][$eq]=${menuId}&populate=*`);
        if (res.ok) {
          const filterResult = await res.json();
          if (filterResult?.data && filterResult.data.length > 0) {
            setMenu(filterResult.data[0]);
            setLoading(false);
            return;
          }
        }

        setMenu(null);
      } catch (err) {
        console.warn('Gagal memuat detail menu dari server:', err);
        setMenu(null);
      } finally {
        setLoading(false);
      }
    }

    getMenuDetail();
  }, [params?.id]);

  // Helper Ambil URL Gambar Safe
  const getImageUrl = (dataObj: any) => {
    if (!dataObj) return '/placeholder.jpeg';
    const imgData = dataObj.image || dataObj.foto || dataObj.gambar;
    if (!imgData) return '/placeholder.jpeg';

    const rawUrl =
      imgData?.url ||
      imgData?.data?.attributes?.url ||
      imgData?.attributes?.url ||
      imgData?.formats?.medium?.url ||
      imgData?.formats?.small?.url;

    if (!rawUrl) return '/placeholder.jpeg';
    return rawUrl.startsWith('http') ? rawUrl : `http://localhost:1337${rawUrl}`;
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!menu) return;

    const data: any = menu.attributes || menu;

    addToCart({
      id: menu.id || params?.id || 'menu-item',
      documentId: menu.documentId || String(menu.id || params?.id),
      name: data.name || data.nama || 'Menu',
      price: Number(data.price || data.harga || 0),
      quantity: quantity,
      note: note,
      image: getImageUrl(data),
    });

    router.push('/keranjang');
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium animate-pulse">Memuat detail menu...</p>
      </div>
    );
  }

  if (!menu) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 gap-4 px-4 text-center">
        <p className="text-gray-700 font-medium">Menu tidak ditemukan atau server Strapi belum aktif.</p>
        <button
          onClick={() => router.back()}
          className="px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors"
        >
          Kembali
        </button>
      </div>
    );
  }

  // Ekstrak data menu aman
  const menuData: any = menu.attributes || menu;

  return (
    <div className="min-h-screen w-full bg-[#FDFDFD] flex flex-col items-center py-4 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-6 lg:p-8">
        
        <div className="mb-6">
                          <SubHeader title="Riwayat" showBack={true} showBell={true} titleAlign="center" />
                        </div>

        {/* MAIN CONTENT */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-start">
          <div className="w-full h-56 sm:h-72 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 shadow-inner border border-gray-100">
            <img
              src={getImageUrl(menuData)}
              alt={menuData.name || menuData.nama || 'Menu'}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col justify-between h-full space-y-4 sm:space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  {menuData.name || menuData.nama || 'Menu Kantin'}
                </h2>
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F28728]">
                  Rp {menuData.price || menuData.harga ? Number(menuData.price || menuData.harga).toLocaleString('id-ID') : '0'}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-semibold border border-emerald-200">
                  <CheckCircle2 size={14} className="fill-emerald-600 text-white" />
                  <span>Tersedia</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-700 font-semibold">
                  Stok: {menuData.stock ?? menuData.stok ?? 50} Porsi
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                {menuData.description || menuData.deskripsi || 'Makanan lezat khas kantin yang dibuat dengan bahan-bahan terbaik.'}
              </p>

              {/* JUMLAH */}
              <div className="mt-5 sm:mt-6">
                <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2">
                  Jumlah
                </label>
                <div className="inline-flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                  <button
                    onClick={handleDecrease}
                    className="w-8 h-8 flex items-center justify-center text-gray-700 font-bold text-lg hover:bg-gray-200 rounded-lg"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm sm:text-base text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="w-8 h-8 flex items-center justify-center text-gray-700 font-bold text-lg hover:bg-gray-200 rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CATATAN */}
              <div className="mt-4 sm:mt-5">
                <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2">
                  Catatan Untuk Penjual:
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Contoh: Tidak pedas, tidak pakai timun, dll."
                  className="w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-700 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#F28728] hover:bg-orange-600 text-black font-bold py-3.5 sm:py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <ShoppingCart size={18} className="text-black" />
                <span className="text-sm sm:text-base">Tambah Ke Keranjang</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}