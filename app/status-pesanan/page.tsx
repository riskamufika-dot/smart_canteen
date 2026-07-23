"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, House, Utensils } from "lucide-react";

// 1. Definisikan tipe data agar struktur dari Strapi nanti terbaca rapi
interface MenuPesanan {
  id: number;
  nama: string;
  qty: number;
  hargaSatuan: number; // Angka ini diubah penjual di dashboard Strapi, Next.js tinggal baca
}

export default function Keranjang() {
  // State untuk menyimpan data menu. Saat ini memakai contoh data (dummy)
  // Besok kalau sudah disambungkan ke Strapi, tinggal ganti isi setPesanan() lewat fetch API
  const [pesanan, setPesanan] = useState<MenuPesanan[]>([
    { id: 1, nama: "Mie Bakso", qty: 1, hargaSatuan: 25000 }, 
    { id: 2, nama: "Mie Campur", qty: 1, hargaSatuan: 10000 },
  ]);

  // State untuk mencegah Hydration Error saat merender format rupiah
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. Fungsi otomatis untuk menghitung TOTAL harga keseluruhan (Jumlah Porsi x Harga dari Strapi)
  const hitungTotal = () => {
    return pesanan.reduce((total, item) => total + (item.qty * item.hargaSatuan), 0);
  };

  // Fungsi format Rupiah yang aman dari Hydration Error
  const formatRupiah = (angka: number) => {
    if (!isMounted) return "Rp ...";
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(angka).replace("IDR", "Rp");
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] text-slate-800 flex justify-center">
      <div className="w-full min-h-screen bg-white shadow-sm flex flex-col justify-between p-4">
        
        {/* === HEADER === */}
        <header className="flex items-center justify-between pb-4 border-b border-gray-100">
          <button className="p-1 hover:bg-gray-100 rounded-full transition" aria-label="Kembali">
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </button>
          <h1 className="text-xl font-bold text-slate-900">Status Pesanan</h1>
          <div className="flex items-center gap-3">
            <button className="p-1 hover:bg-gray-100 rounded-full transition" aria-label="Home">
              <House className="w-6 h-6 text-slate-700" />
            </button>
          </div>
        </header>

        {/* === INFO PESANAN === */}
        <div className="flex justify-between items-start p-6 bg-orange-50 border border-orange-500 rounded-2xl mb-8 mt-4">
          <div>
            <span className="text-sm text-gray-400 font-medium block mb-1">Order ID</span>
            <span className="text-xl font-bold text-gray-900">#SC020826-001</span>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-400 font-medium block mb-1">Tanggal</span>
            <span className="text-sm text-gray-500">02 Agustus 2026, 08:50</span>
          </div>
        </div>

        {/* === TIMELINE STATUS === */}
        <div className="ml-4 space-y-0">
          {/* Status 1 */}
          <div className="relative flex gap-6 pb-10 z-10">
            <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-orange-400 z-0"></div>
            <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white shadow-sm flex-shrink-0 z-10">
              <Utensils size={20} />
            </div>
            <div className="flex-grow pt-1">
              <h4 className="text-base font-semibold text-gray-950 leading-none mb-1">Menunggu Konfirmasi</h4>
              <p className="text-sm text-gray-500">Pesananmu telah diterima oleh penjual</p>
            </div>
            <span className="text-sm text-gray-400 font-medium w-16 text-right flex-shrink-0 pt-1">08:50</span>
          </div>

          {/* Status 2 */}
          <div className="relative flex gap-6 pb-10 z-10">
            <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-emerald-500 z-0"></div>
            <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white shadow-sm flex-shrink-0 z-10">
              <Utensils size={20} />
            </div>
            <div className="flex-grow pt-1">
              <h4 className="text-base font-semibold text-gray-950 leading-none mb-1">Sedang Disiapkan</h4>
              <p className="text-sm text-gray-500">Pesananmu sedang disiapkan</p>
            </div>
            <span className="text-sm text-gray-400 font-medium w-16 text-right flex-shrink-0 pt-1">08:53</span>
          </div>

          {/* Status 3 */}
          <div className="relative flex gap-6 pb-10 z-10">
            <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gray-200 z-0"></div>
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm flex-shrink-0 z-10">
              <Utensils size={20} />
            </div>
            <div className="flex-grow pt-1">
              <h4 className="text-base font-semibold text-gray-950 leading-none mb-1">Siap Diambil</h4>
              <p className="text-sm text-gray-500">Pesananmu sudah siap</p>
            </div>
            <span className="text-sm text-gray-400 font-medium w-16 text-right flex-shrink-0 pt-1">09:10</span>
          </div>

          {/* Status 4 */}
          <div className="relative flex gap-6 z-10">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 shadow-sm flex-shrink-0 z-10">
              <Utensils size={20} />
            </div>
            <div className="flex-grow pt-1">
              <h4 className="text-base font-semibold text-gray-950 leading-none mb-1">Selesai</h4>
              <p className="text-sm text-gray-500">Pesanan telah diambil</p>
            </div>
            <span className="text-sm text-gray-400 font-medium w-16 text-right flex-shrink-0 pt-1">-</span>
          </div>
        </div>

        {/* === KOTAK DETAIL & TOTAL HARGA (SEKARANG SUDAH OTOMATIS) === */}
        <div className="mt-8 bg-white border border-gray-150 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-400 mb-4">Detail Pesanan</h3>

          {/* List Item Makanan di-looping otomatis berdasarkan data state */}
          <div className="space-y-3">
            {pesanan.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-gray-900 font-medium w-4">{item.qty}</span>
                  <span className="text-gray-800">{item.nama}</span>
                </div>
                {/* Otomatis mengalikan qty makanan dengan harga terbarunya */}
                <span className="text-gray-900 font-medium">
                  {formatRupiah(item.qty * item.hargaSatuan)}
                </span>
              </div>
            ))}
          </div>

          <hr className="border-gray-100 my-4" />
          
          {/* Baris Total Akhir */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-900">Total</span>
            <span className="text-xl font-black text-orange-500">
              {formatRupiah(hitungTotal())}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}