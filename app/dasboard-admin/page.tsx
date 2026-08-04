'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, ClipboardList, Utensils, BarChart2, Menu, X } from 'lucide-react';

type StatusPesanan = 'Menunggu Konfirmasi' | 'Sedang Disiapkan' | 'Siap Diambil';

interface Pesanan {
  id: string;
  namaSiswa: string;
  waktu: string;
  status: StatusPesanan;
}

export default function DashboardAdmin() {
  const router = useRouter();

  // State buat buka/tutup sidebar di mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 1. State Tanggal Otomatis (Real-time Hari Ini)
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setCurrentDate(formattedDate);
  }, []);

  // 2. MASTER DATA: Semua Daftar Pesanan (Misal ada 32 data pesanan)
  const [allOrders, setAllOrders] = useState<Pesanan[]>([
    { id: '#SC09062026-001', namaSiswa: 'Siswa A', waktu: '09:30', status: 'Siap Diambil' },
    { id: '#SC09062026-002', namaSiswa: 'Siswa B', waktu: '09:25', status: 'Sedang Disiapkan' },
    { id: '#SC09062026-003', namaSiswa: 'Siswa C', waktu: '09:20', status: 'Menunggu Konfirmasi' },
    { id: '#SC09062026-004', namaSiswa: 'Siswa D', waktu: '09:40', status: 'Siap Diambil' },
    { id: '#SC09062026-005', namaSiswa: 'Siswa E', waktu: '09:15', status: 'Sedang Disiapkan' },
    { id: '#SC09062026-006', namaSiswa: 'Siswa F', waktu: '09:10', status: 'Menunggu Konfirmasi' },
    { id: '#SC09062026-007', namaSiswa: 'Siswa G', waktu: '09:05', status: 'Siap Diambil' },
    { id: '#SC09062026-008', namaSiswa: 'Siswa H', waktu: '09:00', status: 'Sedang Disiapkan' },
    // Kamu bisa panggil API database kamu di sini nantinya
  ]);

  // 3. KALKULASI RINGKASAN KOTAK: Dihitung dari SELURUH data (allOrders)
  const totalPesanan = allOrders.length;
  const totalMenunggu = allOrders.filter((p) => p.status === 'Menunggu Konfirmasi').length;
  const totalDisiapkan = allOrders.filter((p) => p.status === 'Sedang Disiapkan').length;
  const totalSiap = allOrders.filter((p) => p.status === 'Siap Diambil').length;

  // 4. TABEL HANYA MENAMPILKAN 4 PESANAN TERBARU
  const recentOrders = allOrders.slice(0, 4);

  // 5. Fungsi untuk Mengubah Status Pesanan saat Button Di-klik
  const handleNextStatus = (id: string) => {
    setAllOrders((prevOrders) =>
      prevOrders.map((item) => {
        if (item.id === id) {
          // Kalau sudah 'Siap Diambil', berhenti di situ — tidak balik lagi ke awal
          if (item.status === 'Siap Diambil') return item;

          let nextStatus: StatusPesanan = item.status;
          if (item.status === 'Menunggu Konfirmasi') nextStatus = 'Sedang Disiapkan';
          else if (item.status === 'Sedang Disiapkan') nextStatus = 'Siap Diambil';

          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  // Helper untuk Warna Button Status
  const getStatusStyle = (status: StatusPesanan) => {
    switch (status) {
      case 'Siap Diambil':
        return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'Sedang Disiapkan':
        return 'bg-orange-100 text-orange-700 hover:bg-orange-200';
      case 'Menunggu Konfirmasi':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Overlay gelap saat sidebar terbuka di mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Left */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 p-6 flex flex-col gap-6 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Smart Canteen Logo"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div className="font-bold text-xl leading-tight">
              <span className="text-orange-500">Smart </span>
              <span className="text-gray-900">Canteen</span>
            </div>
          </div>

          {/* Tombol close, cuma muncul di mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-gray-50 border border-gray-100 p-3 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
            A
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-900">Admin</h4>
            <p className="text-xs text-gray-500">Penjual</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <Link
            href="/dasboard-admin"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-500 rounded-full font-medium text-sm transition"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>

          <Link
            href="/daftar-pesanan"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-full font-medium text-sm transition"
          >
            <ClipboardList className="w-5 h-5" />
            Daftar Pesanan
          </Link>

          <Link
            href="/kelola-menu"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-full font-medium text-sm transition"
          >
            <Utensils className="w-5 h-5" />
            Kelola Menu
          </Link>

          <Link
            href="/laporan"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-full font-medium text-sm transition"
          >
            <BarChart2 className="w-5 h-5" />
            Laporan
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 w-full min-w-0">
        {/* Topbar mobile: tombol hamburger */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-white border border-gray-100 shadow-sm text-gray-600"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="font-bold text-lg">
            <span className="text-orange-500">Smart </span>
            <span className="text-gray-900">Canteen</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
            <p className="text-gray-500 text-sm">Halo, Admin!</p>
            <p className="text-gray-500 text-sm">Berikut ringkasan data hari ini.</p>
          </div>

          <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-xs font-medium self-start">
            {currentDate || 'Loading tanggal...'}
          </div>
        </div>

        {/* 4 KOTAK RINGKASAN DATA — 2 kolom di HP, 4 kolom di layar lebar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <span className="text-[10px] md:text-xs font-bold tracking-wider text-gray-400 uppercase block mb-2">
              Total Pesanan
            </span>
            <span className="text-2xl md:text-4xl font-extrabold text-gray-900 block mb-1">
              {totalPesanan}
            </span>
            <span className="text-xs text-gray-400">Pesanan</span>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <span className="text-[10px] md:text-xs font-bold tracking-wider text-gray-400 uppercase block mb-2">
              Menunggu
            </span>
            <span className="text-2xl md:text-4xl font-extrabold text-gray-900 block mb-1">
              {totalMenunggu}
            </span>
            <span className="text-xs text-gray-400">Pesanan</span>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <span className="text-[10px] md:text-xs font-bold tracking-wider text-gray-400 uppercase block mb-2">
              Sedang Disiapkan
            </span>
            <span className="text-2xl md:text-4xl font-extrabold text-orange-500 block mb-1">
              {totalDisiapkan}
            </span>
            <span className="text-xs text-gray-400">Pesanan</span>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <span className="text-[10px] md:text-xs font-bold tracking-wider text-gray-400 uppercase block mb-2">
              Siap Diambil
            </span>
            <span className="text-2xl md:text-4xl font-extrabold text-green-500 block mb-1">
              {totalSiap}
            </span>
            <span className="text-xs text-gray-400">Pesanan</span>
          </div>
        </div>

        {/* PESANAN TERBARU SECTION */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Pesanan Terbaru</h2>

            <button
              onClick={() => router.push('/daftar-pesanan')}
              className="text-orange-500 text-sm font-semibold hover:underline"
            >
              Lihat Semua
            </button>
          </div>

          {/* LIST PESANAN — stack ke bawah di HP, sejajar di layar lebar */}
          <div className="flex flex-col gap-3">
            {recentOrders.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 py-3 px-4 hover:bg-gray-50/80 rounded-xl transition border-b border-gray-50 last:border-none"
              >
                <span className="font-bold text-sm text-gray-900 sm:w-1/4">{item.id}</span>
                <span className="text-sm text-gray-600 sm:w-1/4">{item.namaSiswa}</span>
                <span className="text-sm text-gray-400 sm:w-1/4">{item.waktu}</span>

                <div className="sm:w-1/4 sm:text-right">
                  <button
                    onClick={() => handleNextStatus(item.id)}
                    disabled={item.status === 'Siap Diambil'}
                    title={
                      item.status === 'Siap Diambil'
                        ? 'Status akhir — tidak bisa diubah lagi'
                        : 'Klik untuk mengubah status'
                    }
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                      item.status === 'Siap Diambil'
                        ? 'cursor-default'
                        : 'active:scale-95 cursor-pointer'
                    } ${getStatusStyle(item.status)}`}
                  >
                    {item.status}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}