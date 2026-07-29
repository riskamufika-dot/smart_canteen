"use client";

import SubHeader from '@/components/sub-header';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Leaf, Smartphone, Wallet } from "lucide-react";

export default function AboutUs() {
  // const [data, setData] = useState()

  // useEffect(() => {
  //   async function getAboutData() {
  //     try {
  //       const data = await fetch('http://localhost:1337/api/about')
  //       const res = await data.json()
  //       console.log({ res })
  //     } catch (error) {
  //       console.error({ error })
  //     }
  //   }
  //   await getAboutData()
  // }, [])
  const data = useMemo(async() => {
    console.log('render')
      async function getAboutData() {
        try {
          const data = await fetch('http://localhost:1337/api/about')
          const res = await data.json()
          console.log({ res })
        } catch (error) {
          console.error({ error })
        }
      }
      await getAboutData()
  }, [])
  return (
   <div className="min-h-screen bg-[#F5F5F5] p-4 md:p-10 flex justify-center items-center">
      {/* Kontainer Utama */}
      <div className="w-full bg-white rounded-3xl p-6 md:p-10 shadow-sm">
        
        {/* 1. Memanggil SubHeader */}
        <SubHeader title="About Us" backUrl="/home" />

        {/* 2. Layout Isi Konten (2 Kolom) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Kolom Kiri - Smart Canteen */}
          <div className="md:col-span-5 border border-gray-100 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-sm bg-white">
            <div className="relative w-32 h-32 mb-4">
              <Image
                src="/logo.png" // Sesuaikan dengan nama file logo di folder public
                alt="Smart Canteen Logo"
                fill
                className="object-contain"
              />
            </div>
            
            <h2 className="text-2xl font-extrabold mb-4">
              <span className="text-orange-500">Smart </span>
              <span className="text-black">Canteen</span>
            </h2>

            <p className="text-black font-bold text-xs sm:text-sm leading-relaxed max-w-xs">
              platform digital resmi SMK Negeri 2 Sumedang yang mengintegrasikan teknologi modern dengan ekosistem kantin sekolah. Aplikasi ini dirancang untuk menciptakan pengalaman jajan yang lebih higienis, praktis, dan bebas antrean bagi seluruh siswa, guru, dan staf sekolah.
            </p>
          </div>

          {/* Kolom Kanan - 3 Fitur */}
          <div className="md:col-span-7 flex flex-col justify-between gap-4">
            
            {/* Fitur 1 */}
            <div className="border border-orange-200/60 rounded-2xl p-5 flex items-start gap-4 shadow-sm bg-white">
              <div className="p-3 bg-orange-100/70 text-orange-500 rounded-xl shrink-0">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-orange-500 text-base mb-1">
                  Komitmen Kantin Sehat
                </h3>
                <p className="text-orange-600/90 text-xs sm:text-sm leading-relaxed font-medium">
                  Seluruh mitra kuliner kami berkomitmen menyajikan menu yang higienis, menggunakan bahan segar setiap hari, dan dengan harga yang tetap bersahabat bagi kantong pelajar.
                </p>
              </div>
            </div>

            {/* Fitur 2 */}
            <div className="border border-gray-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm bg-white">
              <div className="p-3 bg-green-100/70 text-green-500 rounded-xl shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-black text-base mb-1">
                  Smart Pre-Order
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Pesan makanan favoritmu langsung dari dalam kelas sebelum bel berbunyi. Ambil pesanan tepat waktu di stan vendor tanpa perlu terjebak antrean panjang.
                </p>
              </div>
            </div>

            {/* Fitur 3 */}
            <div className="border border-gray-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm bg-white">
              <div className="p-3 bg-orange-100/70 text-orange-500 rounded-xl shrink-0">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-black text-base mb-1">
                  Metode Pembayaran Fleksibel
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Bebas pilih cara bayar! Kamu bisa bertransaksi cepat menggunakan Saldo Digital (QR Code), atau tetap menggunakan Uang Tunai langsung di kasir stan kantin.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}