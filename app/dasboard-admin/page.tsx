import React from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  UtensilsCrossed, 
  BarChart3, 
  LogOut 
} from 'lucide-react';
import Link from 'next/link';

// 1. Definisikan tipe data untuk TypeScript
interface SummaryCardProps {
  title: string;
  value: number;
  textColorClass: string;
}

interface OrderItem {
  id: string;
  customer: string;
  time: string;
  status: 'Siap Diambil' | 'Sedang Disiapkan' | 'Menunggu Konfirmasi';
}

export default function Dashboard() {
  // Data dummy untuk list pesanan terbaru
  const recentOrders: OrderItem[] = [
    { id: '#SC09062026-001', customer: 'Siswa A', time: '09:30', status: 'Siap Diambil' },
    { id: '#SC09062026-002', customer: 'Siswa B', time: '09:25', status: 'Sedang Disiapkan' },
    { id: '#SC09062026-003', customer: 'Siswa C', time: '09:20', status: 'Menunggu Konfirmasi' },
    { id: '#SC09062026-004', customer: 'Siswa D', time: '09:40', status: 'Siap Diambil' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* SIDEBAR LEFT */}
      <aside className="w-80 bg-white border-r border-slate-200 p-6 flex flex-col justify-between">
        <div>
          {/* Logo Brand */}
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="bg-orange-500 text-white p-2 rounded-full flex items-center justify-center">
              <UtensilsCrossed size={24} />
            </div>
            <span className="text-xl font-bold">
              <span className="text-orange-500">Smart</span> Canteen
            </span>
          </div>

          {/* Profile Card */}
          <div className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm mb-8">
            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-lg">
              A
            </div>
            <div>
              <h4 className="font-bold text-slate-900 leading-tight">Admin</h4>
              <p className="text-sm text-slate-500">Penjual</p>
            </div>
          </div>

          {/* Menu Navigation */}
          <nav className="space-y-3">
            <button className="w-full flex items-center gap-3 px-4 py-3.5 bg-orange-100 text-orange-600 font-semibold rounded-full transition-all">
              <LayoutDashboard size={20} />
              Dashboard
            </button>
            <Link 
            href="/daftar-pesanan"
             className="w-full flex items-center gap-3 px-4 py-3.5 bg-orange-50/50 text-orange-500 font-semibold rounded-full border border-orange-200/40 hover:bg-orange-100/70 transition-all">
              <ClipboardList size={20} />
              Daftar Pesanan
            </Link>
            <Link
            href="/kelola-menu"
             className="w-full flex items-center gap-3 px-4 py-3.5 bg-orange-50/50 text-orange-500 font-semibold rounded-full border border-orange-200/40 hover:bg-orange-100/70 transition-all">
              <UtensilsCrossed size={20} />
              Kelola Menu
            </Link>
            <Link
            href="/laporan"
             className="w-full flex items-center gap-3 px-4 py-3.5 bg-orange-50/50 text-orange-500 font-semibold rounded-full border border-orange-200/40 hover:bg-orange-100/70 transition-all">
              <BarChart3 size={20} />
              Laporan
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <button className="flex items-center gap-3 px-4 py-3 text-slate-700 font-medium hover:text-red-600 transition-colors w-full mt-auto">
          <LogOut size={20} />
          Keluar
        </button>
      </aside>

      {/* MAIN CONTENT RIGHT */}
      <main className="flex-1 p-10">
        
        {/* Header Dashboard */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-950 mb-1">Dashboard</h1>
            <p className="text-slate-600 font-medium">Halo, Admin!</p>
            <p className="text-slate-600">Berikut ringkasan data hari ini.</p>
          </div>
          <div className="px-4 py-1.5 bg-slate-100 border border-slate-200 text-slate-500 text-sm rounded-full font-medium shadow-sm">
            Senin, 9 Juli 2026
          </div>
        </div>

        {/* 4 Summary Cards Grid */}
        <div className="grid grid-cols-4 gap-5 mb-8">
          <SummaryCard title="Total Pesanan" value={32} textColorClass="text-slate-900" />
          <SummaryCard title="Menunggu" value={8} textColorClass="text-slate-900" />
          <SummaryCard title="Sedang Disiapkan" value={12} textColorClass="text-orange-500" />
          <SummaryCard title="Siap Diambil" value={12} textColorClass="text-green-500" />
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Pesanan Terbaru</h3>
            <button className="text-orange-500 font-bold hover:underline text-sm">Lihat Semua</button>
          </div>

          {/* Table / List View */}
          <div className="divide-y divide-slate-100">
            {recentOrders.map((order) => (
              <div key={order.id} className="grid grid-cols-4 items-center py-4 text-sm font-medium">
                <span className="text-slate-900">{order.id}</span>
                <span className="text-slate-700">{order.customer}</span>
                <span className="text-slate-500">{order.time}</span>
                <div className="justify-self-start">
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}

// 3. Komponen Pendukung: Summary Card (TSX + TypeScript)
function SummaryCard({ title, value, textColorClass }: SummaryCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-sm">
      <span className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1">{title}</span>
      <span className={`text-4xl font-extrabold ${textColorClass} mb-1`}>{value}</span>
      <span className="text-xs text-slate-500 font-medium">Pesanan</span>
    </div>
  );
}

// 4. Komponen Pendukung: Badge Status Warna Dinamis
function StatusBadge({ status }: { status: OrderItem['status'] }) {
  if (status === 'Siap Diambil') {
    return (
      <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 border border-green-200 rounded-full">
        Siap Diambil
      </span>
    );
  }
  if (status === 'Sedang Disiapkan') {
    return (
      <span className="px-3 py-1 text-xs font-semibold text-orange-700 bg-orange-100 border border-orange-200 rounded-full">
        Sedang Disiapkan
      </span>
    );
  }
  return (
    <span className="px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full">
      Menunggu Konfirmasi
    </span>
  );
}