"use client";

import SubHeader from '@/components/sub-header';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, Bell, Star } from "lucide-react";

interface RiwayatTransaksi {
  id: number;
  namaKantin: string;
  gambarKantin: string;
  ratingKantin: number;
  tanggal: string; // Teks tanggal akan diisi otomatis di client
  status: string;
  detailMenu: string;
  totalHarga: number;
  jumlahMenu: number;
  ratingUser?: number;
}

export default function Riwayat() {
  const [isClient, setIsClient] = useState(false);

  // State awal: biarkan string tanggal kosong terlebih dahulu untuk mencegah error hydration
  const [daftarRiwayat, setDaftarRiwayat] = useState<RiwayatTransaksi[]>([
    {
      id: 1,
      namaKantin: "Mas Arjo",
      gambarKantin: "/bakso.jpg", 
      ratingKantin: 4.8,
      tanggal: "", 
      status: "Selesai",
      detailMenu: "1 Mie Bakso + 1 Mie Campur",
      totalHarga: 16000,
      jumlahMenu: 2,
      ratingUser: 0,
    },
    {
      id: 2,
      namaKantin: "Kantin Bu Nani",
      gambarKantin: "/bakso.jpg", 
      ratingKantin: 4.8,
      tanggal: "", 
      status: "Selesai",
      detailMenu: "2 Tea Jus + 3 Basreng",
      totalHarga: 19000,
      jumlahMenu: 2,
      ratingUser: 0,
    },
  ]);

  useEffect(() => {
    setIsClient(true);

    // Pembuat format tanggal otomatis Indonesia (Contoh hasil: 18 Agustus 2026, 10:43)
    const dapatkanTanggalOtomatis = () => {
      const sekarang = new Date();
      
      const opsiTanggal: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "long",
        year: "numeric",
      };
      
      const opsiWaktu: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };

      const tanggalFormat = sekarang.toLocaleDateString("id-ID", opsiTanggal);
      const waktuFormat = sekarang.toLocaleTimeString("id-ID", opsiWaktu).replace(".", ":");

      return `${tanggalFormat}, ${waktuFormat}`;
    };

    // Masukkan tanggal otomatis saat ini ke dalam state riwayat
    const tanggalHariIni = dapatkanTanggalOtomatis();
    setDaftarRiwayat((prevData) =>
      prevData.map((item) => ({ ...item, tanggal: tanggalHariIni }))
    );
  }, []);

  // Fungsi saat bintang diklik untuk memberi penilaian
  const handleBeriRating = (idTransaksi: number, bintangYangDiklik: number) => {
    setDaftarRiwayat(
      daftarRiwayat.map((item) => {
        if (item.id === idTransaksi) {
          return { ...item, ratingUser: bintangYangDiklik };
        }
        return item;
      })
    );
  };

  // Fungsi pembantu format rupiah
  const formatRupiah = (angka: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(angka).replace("IDR", "Rp");
  };

  if (!isClient) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex justify-center py-6">
      <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
    
     <SubHeader title="riwayat" backUrl="/home" />
      
        {/* === DAFTAR KARTU RIWAYAT === */}
        <div className="space-y-6 flex-grow">
          {daftarRiwayat.map((item) => (
            <div 
              key={item.id} 
              className="border border-gray-150 rounded-2xl p-5 flex gap-5 shadow-sm relative hover:shadow-md transition"
            >
              
              {/* Sisi Kiri: Gambar Kantin & Rating */}
              <div className="relative w-28 h-28 flex-shrink-0">
                <div className="w-full h-full rounded-xl overflow-hidden relative border border-gray-100">
                  <Image
                    src={item.gambarKantin}
                    alt={item.namaKantin}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow border border-gray-100 text-xs font-bold text-gray-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{item.ratingKantin}</span>
                </div>
              </div>

              {/* Sisi Tengah: Detail Transaksi */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{item.namaKantin}</h2>
                  
                  {/* TANGGAL OTOMATIS AKAN MUNCUL DI SINI */}
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {item.tanggal || "Memuat tanggal..."} • <span className="text-emerald-500 font-semibold">{item.status}</span>
                  </p>

                  <p className="text-xs text-gray-700 mt-2 font-medium">{item.detailMenu}</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">{formatRupiah(item.totalHarga)}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.jumlahMenu} Menu</p>
                </div>

                {/* Rating Penilaian Bintang Interaktif */}
                <div className="mt-3">
                  <span className="text-[10px] text-gray-400 block mb-1">
                    {item.ratingUser && item.ratingUser > 0 ? "Penilaianmu" : "Beri Penilaian Mu"}
                  </span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isYellow = star <= (item.ratingUser || 0);
                      return (
                        <Star 
                          key={star} 
                          onClick={() => handleBeriRating(item.id, star)}
                          className={`w-4 h-4 cursor-pointer transition duration-150
                            ${isYellow 
                              ? "text-amber-400 fill-amber-400" 
                              : "text-gray-200 fill-gray-200 hover:text-amber-300"
                            }`} 
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sisi Kanan: Tombol Beli Lagi */}
              <div className="absolute bottom-5 right-5">
                <button className="px-4 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition text-xs font-bold rounded-full">
                  Beli Lagi
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}