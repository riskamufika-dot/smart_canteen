'use client';

<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> fb772c414c78a934e9b4b121ed184ef285537f53
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// 1. Tipe data status pesanan yang valid
type OrderStatus = 'Siap Diambil' | 'Sedang Disiapkan' | 'Menunggu Konfirmasi' | 'Selesai';

interface OrderItem {
  id: string;
  customer: string;
  time: string;
  itemCount: number;
  price: string;
  status: OrderStatus;
}

type TabType = 'Semua' | 'Menunggu' | 'Sedang Disiapkan' | 'Siap Diambil' | 'Selesai';

<<<<<<< HEAD
export default function DaftarPesanan() {
  const [activeTab, setActiveTab] = useState<TabType>('Semua');
  
  // 2. Gunakan useState agar data pesanan bisa diubah-ubah (diupdate statusnya)
  const [orders, setOrders] = useState<OrderItem[]>([
    { id: '#SC09062026-001', customer: 'Siswa A', time: '09:30', itemCount: 2, price: 'Rp 16.000', status: 'Siap Diambil' },
    { id: '#SC09062026-002', customer: 'Siswa B', time: '09:25', itemCount: 3, price: 'Rp 15.000', status: 'Sedang Disiapkan' },
    { id: '#SC09062026-003', customer: 'Siswa C', time: '09:20', itemCount: 1, price: 'Rp 5.000', status: 'Menunggu Konfirmasi' },
    { id: '#SC09062026-004', customer: 'Siswa D', time: '09:40', itemCount: 4, price: 'Rp 12.000', status: 'Siap Diambil' },
    { id: '#SC09062026-005', customer: 'Siswa F', time: '08:50', itemCount: 2, price: 'Rp 10.000', status: 'Selesai' },
    { id: '#SC09062026-006', customer: 'Siswa G', time: '09:00', itemCount: 3, price: 'Rp 24.000', status: 'Sedang Disiapkan' },
    { id: '#SC09062026-007', customer: 'Siswa H', time: '08:30', itemCount: 1, price: 'Rp 8.000', status: 'Selesai' },
  ]);

  const tabs: TabType[] = ['Semua', 'Menunggu', 'Sedang Disiapkan', 'Siap Diambil', 'Selesai'];

  // 3. Fungsi untuk mengubah siklus status saat diklik
=======
const INITIAL_ORDERS: OrderItem[] = [
  { id: '#SC09062026-001', customer: 'Siswa A', time: '09:30', itemCount: 2, price: 'Rp 16.000', status: 'Siap Diambil' },
  { id: '#SC09062026-002', customer: 'Siswa B', time: '09:25', itemCount: 3, price: 'Rp 15.000', status: 'Sedang Disiapkan' },
  { id: '#SC09062026-003', customer: 'Siswa C', time: '09:20', itemCount: 1, price: 'Rp 5.000', status: 'Menunggu Konfirmasi' },
  { id: '#SC09062026-004', customer: 'Siswa D', time: '09:40', itemCount: 4, price: 'Rp 12.000', status: 'Siap Diambil' },
  { id: '#SC09062026-005', customer: 'Siswa F', time: '08:50', itemCount: 2, price: 'Rp 10.000', status: 'Selesai' },
  { id: '#SC09062026-006', customer: 'Siswa G', time: '09:00', itemCount: 3, price: 'Rp 24.000', status: 'Sedang Disiapkan' },
  { id: '#SC09062026-007', customer: 'Siswa H', time: '08:30', itemCount: 1, price: 'Rp 8.000', status: 'Selesai' },
];

export default function DaftarPesanan() {
  const [activeTab, setActiveTab] = useState<TabType>('Semua');
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Ambil data dari localStorage saat pertama kali dimuat
  useEffect(() => {
    const saved = localStorage.getItem('smart_canteen_orders');
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch (e) {
        setOrders(INITIAL_ORDERS);
      }
    } else {
      setOrders(INITIAL_ORDERS);
    }
    setIsLoaded(true);
  }, []);

  // Simpan data ke localStorage setiap kali ada perubahan status
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('smart_canteen_orders', JSON.stringify(orders));
    }
  }, [orders, isLoaded]);

  const tabs: TabType[] = ['Semua', 'Menunggu', 'Sedang Disiapkan', 'Siap Diambil', 'Selesai'];

  // Fungsi untuk mengubah siklus status saat diklik
>>>>>>> fb772c414c78a934e9b4b121ed184ef285537f53
  const handleStatusChange = (orderId: string, currentStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
<<<<<<< HEAD
          // Menentukan urutan status berikutnya saat diklik
=======
>>>>>>> fb772c414c78a934e9b4b121ed184ef285537f53
          let nextStatus: OrderStatus = 'Menunggu Konfirmasi';
          if (currentStatus === 'Menunggu Konfirmasi') nextStatus = 'Sedang Disiapkan';
          else if (currentStatus === 'Sedang Disiapkan') nextStatus = 'Siap Diambil';
          else if (currentStatus === 'Siap Diambil') nextStatus = 'Selesai';
<<<<<<< HEAD
          else if (currentStatus === 'Selesai') nextStatus = 'Menunggu Konfirmasi'; // kembali berputar
=======
          else if (currentStatus === 'Selesai') nextStatus = 'Menunggu Konfirmasi';
>>>>>>> fb772c414c78a934e9b4b121ed184ef285537f53

          return { ...order, status: nextStatus };
        }
        return order;
      })
    );
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'Semua') return true;
    if (activeTab === 'Menunggu') return order.status === 'Menunggu Konfirmasi';
    return order.status === activeTab;
  });

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-slate-50 p-10 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dasboard-admin" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-700">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Daftar Pesanan</h1>
        </div>

        {/* Tab Filter */}
        <div className="flex border-b border-slate-200 mb-8 gap-2">
=======
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-10 font-sans text-slate-800">
      <div className="w-full max-w-7xl mx-auto bg-white border border-slate-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Link href="/dasboard-admin" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-700">
            <ArrowLeft size={22} />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Daftar Pesanan</h1>
        </div>

        {/* Tab Filter (Responsif & Bisa di-scroll di HP) */}
        <div className="flex border-b border-slate-200 mb-6 sm:mb-8 gap-1 sm:gap-2 overflow-x-auto whitespace-nowrap pb-1 no-scrollbar">
>>>>>>> fb772c414c78a934e9b4b121ed184ef285537f53
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
<<<<<<< HEAD
              className={`px-6 py-3 font-semibold text-sm rounded-t-xl transition-all ${
=======
              className={`px-4 sm:px-6 py-2.5 sm:py-3 font-semibold text-xs sm:text-sm rounded-t-xl transition-all shrink-0 ${
>>>>>>> fb772c414c78a934e9b4b121ed184ef285537f53
                activeTab === tab
                  ? 'text-orange-500 bg-orange-50/70 border-b-2 border-orange-500'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

<<<<<<< HEAD
        {/* Tabel */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-900 font-bold text-sm">
                <th className="p-4 pl-6">Order Id</th>
                <th className="p-4">Pelanggan</th>
                <th className="p-4">Waktu</th>
                <th className="p-4">Item</th>
                <th className="p-4">Harga</th>
                <th className="p-4 pr-6">Status (Klik untuk Ubah)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 pl-6 text-slate-900">{order.id}</td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4 text-slate-500">{order.time}</td>
                    <td className="p-4 text-slate-600">{order.itemCount} Item</td>
                    <td className="p-4 text-slate-950">{order.price}</td>
                    <td className="p-4 pr-6">
=======
        {/* Container Tabel dengan Scroll Horizontal di Layar Kecil */}
        <div className="border border-slate-200 rounded-xl sm:rounded-2xl overflow-x-auto">
          <table className="w-full min-w-[650px] text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-900 font-bold text-xs sm:text-sm">
                <th className="p-3 sm:p-4 pl-4 sm:pl-6">Order Id</th>
                <th className="p-3 sm:p-4">Pelanggan</th>
                <th className="p-3 sm:p-4">Waktu</th>
                <th className="p-3 sm:p-4">Item</th>
                <th className="p-3 sm:p-4">Harga</th>
                <th className="p-3 sm:p-4 pr-4 sm:pr-6">Status (Klik untuk Ubah)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-3 sm:p-4 pl-4 sm:pl-6 text-slate-900 whitespace-nowrap">{order.id}</td>
                    <td className="p-3 sm:p-4 whitespace-nowrap">{order.customer}</td>
                    <td className="p-3 sm:p-4 text-slate-500 whitespace-nowrap">{order.time}</td>
                    <td className="p-3 sm:p-4 text-slate-600 whitespace-nowrap">{order.itemCount} Item</td>
                    <td className="p-3 sm:p-4 text-slate-950 whitespace-nowrap">{order.price}</td>
                    <td className="p-3 sm:p-4 pr-4 sm:pr-6 whitespace-nowrap">
>>>>>>> fb772c414c78a934e9b4b121ed184ef285537f53
                      {/* Tombol badge yang bisa diklik */}
                      <button 
                        onClick={() => handleStatusChange(order.id, order.status)}
                        className="focus:outline-none active:scale-95 transition-transform"
                      >
                        <StatusBadge status={order.status} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Tidak ada pesanan dengan status "{activeTab}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  if (status === 'Siap Diambil') {
    return (
<<<<<<< HEAD
      <span className="px-3 py-1 text-xs font-bold text-green-700 bg-green-100 border border-green-200 rounded-full cursor-pointer hover:bg-green-200 transition-colors">
=======
      <span className="px-3 py-1 text-xs font-bold text-green-700 bg-green-100 border border-green-200 rounded-full cursor-pointer hover:bg-green-200 transition-colors inline-block">
>>>>>>> fb772c414c78a934e9b4b121ed184ef285537f53
        Siap Diambil
      </span>
    );
  }
  if (status === 'Sedang Disiapkan') {
    return (
<<<<<<< HEAD
      <span className="px-3 py-1 text-xs font-bold text-orange-700 bg-orange-100 border border-orange-200 rounded-full cursor-pointer hover:bg-orange-200 transition-colors">
=======
      <span className="px-3 py-1 text-xs font-bold text-orange-700 bg-orange-100 border border-orange-200 rounded-full cursor-pointer hover:bg-orange-200 transition-colors inline-block">
>>>>>>> fb772c414c78a934e9b4b121ed184ef285537f53
        Sedang Disiapkan
      </span>
    );
  }
  if (status === 'Selesai') {
    return (
<<<<<<< HEAD
      <span className="px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 rounded-full cursor-pointer hover:bg-emerald-200 transition-colors">
=======
      <span className="px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 rounded-full cursor-pointer hover:bg-emerald-200 transition-colors inline-block">
>>>>>>> fb772c414c78a934e9b4b121ed184ef285537f53
        Selesai
      </span>
    );
  }
  return (
<<<<<<< HEAD
    <span className="px-3 py-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-full cursor-pointer hover:bg-amber-100 transition-colors">
=======
    <span className="px-3 py-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-full cursor-pointer hover:bg-amber-100 transition-colors inline-block">
>>>>>>> fb772c414c78a934e9b4b121ed184ef285537f53
      Menunggu Konfirmasi
    </span>
  );
}