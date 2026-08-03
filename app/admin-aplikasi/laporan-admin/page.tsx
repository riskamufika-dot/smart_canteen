'use client';

import React from 'react';
import { LogOut, Users } from 'lucide-react';
import Link from 'next/link';

export default function LaporanAdmin() {
  // Data Kantin Terlaris berdasarkan gambar
  const kantinTerlaris = [
    { nama: 'Kantin Mas Arjo', total: 'Rp 4.500.000' },
    { nama: 'Warung Nasi Bu Joe', total: 'Rp 3.200.000' },
    { nama: 'Kedai Hampura', total: 'Rp 2.800.000' },
    { nama: 'Kantin Bi Nani', total: 'Rp 1.600.000' },
    { nama: 'Kantin Teh Nci', total: 'Rp 1.200.000' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 p-8 text-slate-800">
      <div className="mx-auto flex w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl">
        
        {/* ================= SIDEBAR ================= */}
        <aside className="flex w-64 flex-col justify-between border-r border-slate-100 p-6">
          <div>
            {/* Logo */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white font-bold">
                🍽️
              </div>
              <span className="text-xl font-bold">
                <span className="text-orange-500">Smart</span> Canteen
              </span>
            </div>

            {/* Profile Card */}
            <div className="mb-8 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200">
                <Users className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Admin</h4>
                <p className="text-xs text-slate-400">Admin Sistem</p>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex flex-col gap-3">
              <Link
               href="/admin-aplikasi/dasboard-aplikasi"
               className="flex w-full items-center justify-center rounded-full border border-orange-200 bg-white py-2.5 font-semibold text-orange-500 transition-colors hover:bg-orange-50">
                Dashboard
              </Link>
              <Link 
                href="/admin-aplikasi/kelola-kantin"
                className="flex w-full items-center justify-center rounded-full border border-orange-200 bg-white py-2.5 font-semibold text-orange-500 transition-colors hover:bg-orange-50">
                Kelola Kantin
            </Link>
            <Link 
                href="/admin-aplikasi/kelola-user"
                className="flex w-full items-center justify-center rounded-full border border-orange-200 bg-white py-2.5 font-semibold text-orange-500 transition-colors hover:bg-orange-50">
                Kelola User
            </Link>
            <Link 
                href="/admin-aplikasi/laporan-admin"
                className="flex w-full items-center justify-center rounded-full border border-orange-200 bg-white py-2.5 font-semibold text-orange-500 transition-colors hover:bg-orange-50">
                Laporan
            </Link>
            </nav>
          </div>

          {/* Logout Button */}
          <button className="flex items-center gap-3 font-semibold text-slate-700 transition-colors hover:text-red-500 px-2">
            <LogOut className="h-5 w-5" />
            <span>Keluar</span>
          </button>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 p-8">
          {/* Header Title */}
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Laporan</h1>
          </header>

          {/* Metric Cards Section */}
          <div className="mb-6 grid grid-cols-4 gap-4">
            {/* Total Transaksi */}
            <div className="rounded-2xl border border-slate-200 p-4">
              <span className="text-xs font-bold text-slate-800">Total Transaksi</span>
              <div className="mt-2 text-3xl font-extrabold text-slate-900">1.180</div>
            </div>

            {/* Rata-rata/Hari */}
            <div className="rounded-2xl border border-slate-200 p-4">
              <span className="text-xs font-bold text-slate-800">Rata-rata/Hari</span>
              <div className="mt-2 text-3xl font-extrabold text-slate-900">41</div>
            </div>

            {/* Total Pesanan */}
            <div className="rounded-2xl border border-slate-200 p-4">
              <span className="text-xs font-bold text-slate-800">Total Pesanan</span>
              <div className="mt-2 text-3xl font-extrabold text-orange-500">1.250</div>
            </div>

            {/* Total Pendapatan */}
            <div className="rounded-2xl border border-slate-200 p-4">
              <span className="text-xs font-bold text-slate-800">Total Pendapatan</span>
              <div className="mt-2 text-lg font-extrabold text-emerald-600">Rp 12.500.000</div>
            </div>
          </div>

          {/* Middle Section: Chart & Top Canteen */}
          <div className="grid grid-cols-3 gap-4">
            {/* Bar Chart Section */}
            <div className="col-span-2 flex flex-col justify-between rounded-2xl border border-slate-200 p-5">
              <h3 className="mb-4 text-sm font-bold text-slate-800">Grafik Pesanan</h3>

              {/* Bar Chart Visualization (SVG) */}
              <div className="h-56 w-full">
                <svg className="h-full w-full overflow-visible" viewBox="0 0 450 160">
                  {/* Grid Lines */}
                  <line x1="30" y1="20" x2="430" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="60" x2="430" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="100" x2="430" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="140" x2="430" y2="140" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Y-Axis Labels */}
                  <text x="5" y="24" className="text-[10px] fill-slate-500 font-medium">3Jt</text>
                  <text x="5" y="64" className="text-[10px] fill-slate-500 font-medium">2Jt</text>
                  <text x="5" y="104" className="text-[10px] fill-slate-500 font-medium">1Jt</text>
                  <text x="15" y="144" className="text-[10px] fill-slate-500 font-medium">0</text>

                  {/* Bar 1 (Minggu Ke-1) */}
                  <rect x="65" y="90" width="22" height="50" rx="2" fill="#f97316" />

                  {/* Bar 2 (Minggu Ke-2) */}
                  <rect x="160" y="75" width="22" height="65" rx="2" fill="#f97316" />

                  {/* Bar 3 (Minggu Ke-3) */}
                  <rect x="255" y="60" width="22" height="80" rx="2" fill="#f97316" />

                  {/* Bar 4 (Minggu Ke-4) */}
                  <rect x="350" y="20" width="22" height="120" rx="2" fill="#f97316" />
                </svg>

                {/* X-Axis Labels */}
                <div className="mt-2 flex justify-between pl-8 pr-4 text-[10px] font-semibold text-slate-700">
                  <span>Minggu Ke-1</span>
                  <span>Minggu Ke-2</span>
                  <span>Minggu Ke-3</span>
                  <span>Minggu Ke-4</span>
                </div>
              </div>

              {/* Date Indicator Label */}
              <div className="mt-4 text-right text-[11px] font-semibold text-slate-600">
                21-25Mei
              </div>
            </div>

            {/* Kantin Terlaris Table */}
            <div className="rounded-2xl border border-slate-200 p-4">
              <h3 className="mb-4 text-center text-sm font-bold text-slate-800">Kantin Terlaris</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-slate-100">
                    {kantinTerlaris.map((item, index) => (
                      <tr key={index}>
                        <td className="py-3 font-semibold text-slate-800">{item.nama}</td>
                        <td className="py-3 text-right font-bold text-slate-900">{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}