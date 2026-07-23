"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowLeft, Leaf, Phone, Wallet } from "lucide-react";
import Link from "next/link";

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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex justify-center py-6">
      {/* Container Utama */}
      <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

        {/* === HEADER === */}
        <header className="flex items-center gap-4 pb-6 mb-8 border-b border-gray-100">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-slate-900">About Us</h1>
        </header>

        {/* === KONTEN UTAMA (Dua Kolom) === */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* 1. KOLOM KIRI (Profil Smart Canteen) - Bobot Lebar: 5 dari 12 */}
          <div className="md:col-span-5 border border-gray-150 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center bg-white h-full justify-center">

            {/* TEMPAT FOTO BARU (Menggantikan ikon jeruk) */}
            <div className="w-28 h-28 relative mb-6 rounded-2xl overflow-hidden shadow-sm bg-orange-50">
              <Image
                src="/logo.png" // <-- Ganti nama file ini sesuai foto di folder public kamu
                alt="Logo Smart Canteen"
                fill
                priority
                className="object-cover" // Menjaga foto tetap proporsional & tidak gepeng
              />
            </div>

            {/* Nama Brand */}
            <h2 className="text-2xl font-black mb-4">
              <span className="text-orange-500">Smart</span> <span className="text-slate-900">Canteen</span>
            </h2>

            {/* Deskripsi */}
            <p className="text-xs text-gray-800 font-medium leading-relaxed max-w-xs">
              platform digital resmi SMK Negeri 2 Sumedang yang mengintegrasikan teknologi modern dengan ekosistem kantin sekolah. Aplikasi ini dirancang untuk menciptakan pengalaman jajan yang lebih higienis, praktis, dan bebas antrean bagi seluruh siswa, guru, dan staf sekolah.
            </p>
          </div>

          {/* 2. KOLOM KANAN (Daftar Komitmen & Fitur) - Bobot Lebar: 7 dari 12 */}
          <div className="md:col-span-7 space-y-4">

            {/* Kartu 1: Komitmen Kantin Sehat */}
            <div className="border border-orange-200 bg-orange-50/30 rounded-2xl p-5 flex gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                <Leaf className="w-6 h-6 fill-orange-600/10" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-orange-600 mb-1">Komitmen Kantin Sehat</h3>
                <p className="text-xs text-orange-800/80 leading-relaxed font-medium">
                  Seluruh mitra kuliner kami berkomitmen menyajikan menu yang higienis, menggunakan bahan segar setiap hari, dan dengan harga yang tetap bersahabat bagi kantong pelajar.
                </p>
              </div>
            </div>

            {/* Kartu 2: Smart Pre-Order */}
            <div className="border border-gray-150 bg-white rounded-2xl p-5 flex gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <Phone className="w-6 h-6 fill-emerald-600/10" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Smart Pre-Order</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  Pesan makanan favoritmu langsung dari dalam kelas sebelum bel berbunyi. Ambil pesanan tepat waktu di stan vendor tanpa perlu terjebak antrean panjang.
                </p>
              </div>
            </div>

            {/* Kartu 3: Metode Pembayaran Fleksibel */}
            <div className="border border-gray-150 bg-white rounded-2xl p-5 flex gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 flex-shrink-0">
                <Wallet className="w-6 h-6 fill-orange-500/10" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Metode Pembayaran Fleksibel</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
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