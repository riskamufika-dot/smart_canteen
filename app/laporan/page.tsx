'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface MenuReport {
  no: number;
  nama: string;
  jumlahTerjual: number;
  totalPendapatan: number;
}

const laporanData: MenuReport[] = [
  { no: 1, nama: 'Mie Bakso', jumlahTerjual: 60, totalPendapatan: 480000 },
  { no: 2, nama: 'Mie Campur', jumlahTerjual: 25, totalPendapatan: 200000 },
  { no: 3, nama: 'Mie Yamin', jumlahTerjual: 30, totalPendapatan: 280000 },
];

const menuTerlarisData: MenuReport[] = [
  { no: 1, nama: 'Mie Bakso', jumlahTerjual: 60, totalPendapatan: 480000 },
  { no: 2, nama: 'Mie Campur', jumlahTerjual: 25, totalPendapatan: 200000 },
];

function formatRupiah(value: number) {
  return `Rp ${value.toLocaleString('id-ID')}`;
}

export default function LaporanPage() {
  const router = useRouter();

  const totalKeseluruhan = laporanData.reduce(
    (sum, item) => sum + item.totalPendapatan,
    0
  );

  return (
    <div className="min-h-screen w-full bg-[#F5F5F5] flex flex-col">
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-5 sm:px-8 sm:py-8 flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 sm:mb-8 shrink-0">
          <button
            type="button"
            onClick={() => router.push('/dasboard-admin')}
            aria-label="Kembali ke dashboard admin"
            className="p-2 -ml-2 rounded-lg hover:bg-gray-200 transition-colors shrink-0"
          >
            <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Laporan</h1>
        </div>

        {/* Tabel Laporan Utama */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-8 mb-5 sm:mb-8 overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left font-bold text-sm sm:text-base text-black py-3 px-2 sm:px-4">
                  No.
                </th>
                <th className="text-left font-bold text-sm sm:text-base text-black py-3 px-2 sm:px-4">
                  Nama Menu
                </th>
                <th className="text-right sm:text-center font-bold text-sm sm:text-base text-black py-3 px-2 sm:px-4">
                  Jumlah Item Terjual
                </th>
              </tr>
            </thead>
            <tbody>
              {laporanData.map((item) => (
                <tr key={item.no} className="border-b border-gray-100">
                  <td className="py-4 px-2 sm:px-4 text-sm sm:text-base text-black">
                    {item.no}.
                  </td>
                  <td className="py-4 px-2 sm:px-4 text-sm sm:text-base text-black">
                    {item.nama}
                  </td>
                  <td className="py-4 px-2 sm:px-4 text-sm sm:text-base text-black text-right sm:text-center">
                    {item.jumlahTerjual}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Keseluruhan - selalu sejajar kiri-kanan */}
          <div className="flex flex-row items-center justify-between gap-3 pt-5 mt-2">
            <span className="text-green-600 font-bold text-base sm:text-xl">
              Total Keseluruhan
            </span>
            <span className="text-green-600 font-bold text-lg sm:text-2xl whitespace-nowrap">
              {formatRupiah(totalKeseluruhan)}
            </span>
          </div>
        </div>

        {/* Menu Terlaris */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-8 flex-1 overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-bold text-black mb-4">
            Menu Terlaris
          </h2>
          <table className="w-full min-w-[420px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left font-bold text-sm sm:text-base text-black py-3 px-2 sm:px-4">
                  No.
                </th>
                <th className="text-left font-bold text-sm sm:text-base text-black py-3 px-2 sm:px-4">
                  Nama Menu
                </th>
                <th className="text-right sm:text-center font-bold text-sm sm:text-base text-black py-3 px-2 sm:px-4">
                  Jumlah Item Terjual
                </th>
              </tr>
            </thead>
            <tbody>
              {menuTerlarisData.map((item) => (
                <tr key={item.no} className="border-b border-gray-100 last:border-b-0">
                  <td className="py-4 px-2 sm:px-4 text-sm sm:text-base text-black">
                    {item.no}.
                  </td>
                  <td className="py-4 px-2 sm:px-4 text-sm sm:text-base text-black">
                    {item.nama}
                  </td>
                  <td className="py-4 px-2 sm:px-4 text-sm sm:text-base text-black text-right sm:text-center">
                    {item.jumlahTerjual}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}