"use client";

import React, { useState } from "react";
import {Clock,ChevronDown,CircleDollarSign,CircleAlert, ArrowLeft,House,Trash2  } from "lucide-react";

// Tipe data untuk item di keranjang
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Keranjang() {
  // State untuk menyimpan data produk di keranjang
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Mie Bakso",
      price: 8000,
      quantity: 1,
      image: "bakso.jpg", // Ganti dengan path gambarmu
    },
    {
      id: 2,
      name: "Mie Campur",
      price: 8000,
      quantity: 1,
      image: "mii_campur.jpeg", // Ganti dengan path gambarmu
    },
  ]);

  // Fungsi tambah jumlah item
  const handleIncrease = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Fungsi kurang jumlah item
  const handleDecrease = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Fungsi hapus seluruh isi keranjang
  const handleClearCart = () => {
    if (confirm("Apakah Anda yakin ingin mengosongkan keranjang?")) {
      setCartItems([]);
    }
  };
  const [isWaktuOpen, setIsWaktuOpen] = useState(false);
  const [waktuTerpilih, setWaktuTerpilih] = useState("Istirahat ke 1 (09.00 - 09.25)");

  const listWaktu = [
    "Istirahat ke 1 (09.00 - 09.25)",
    "Istirahat ke 2 (11.40 - 12.00)"
  ];

  const [isPembayaranOpen, setIsPembayaranOpen] = useState(false);
  const [pembayaranTerpilih, setpembayaranTerpilih] = useState("Bayar di kantin (cash)");

  const listPembayaran = [
    "Bayar di kantin (cash)",
    "Qris"
  ];

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] text-slate-800 flex justify-center">
      {/* Container utama dengan max-width agar responsif mobile/tablet */}
      <div className="w-full min-h-screen  bg-white shadow-sm flex flex-col justify-between p-4">
        
        {/* === HEADER === */}
        <header className="flex items-center justify-between pb-4 border-b border-gray-100">
          <button className="p-1 hover:bg-gray-100 rounded-full transition" aria-label="Kembali">
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </button>
          
          <h1 className="text-xl font-bold text-slate-900">Keranjang</h1>
          
          <div className="flex items-center gap-3">
            <button className="p-1 hover:bg-gray-100 rounded-full transition" aria-label="Home">
              <House className="w-6 h-6 text-slate-700" />
            </button>
            <button onClick={handleClearCart} className="p-1 hover:bg-red-50 rounded-full transition" aria-label="Hapus Semua">
              <Trash2 className="w-6 h-6 text-slate-700" />
            </button>
          </div>
        </header>

        {/* === ISI KONTEN === */}
        <main className="flex-1 py-4 space-y-5 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 text-gray-400">Keranjang belanja kosong.</div>
          ) : (
            /* Card Putih untuk Daftar Produk */
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-4">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-center justify-between gap-4">
                    {/* Foto Produk */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-16 object-cover rounded-xl bg-gray-50 shrink-0"
                    />

                    {/* Detail Informasi & Harga */}
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-slate-900 text-sm md:text-base truncate">{item.name}</h2>
                      <div className="flex items-center gap-6 mt-1 text-xs md:text-sm text-slate-600 font-medium">
                        <span>{item.quantity}</span>
                        <span>Rp {item.price.toLocaleString("id-ID")}</span>
                      </div>
                    </div>

                    {/* Total Harga Per Menu & Counter */}
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-bold text-amber-600 text-sm md:text-base">
                        Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                      </span>
                      {/* Tombol Plus Minus */}
                      <div className="flex items-center border border-gray-200 rounded-md bg-white p-0.5 shadow-sm text-xs">
                        <button
                          onClick={() => handleDecrease(item.id)}
                          className="px-2 py-0.5 hover:bg-gray-100 font-bold rounded"
                        >
                          -
                        </button>
                        <span className="px-3 font-semibold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(item.id)}
                          className="px-2 py-0.5 hover:bg-gray-100 font-bold rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Divider abu-abu tipis antar item (tidak muncul di item terakhir) */}
                  {index < cartItems.length - 1 && <hr className="border-gray-100 mt-4" />}
                </div>
              ))}
            </div>
          )}
          
          {/* === PILIHAN WAKTU PENGAMBILAN === */}
<div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800 px-1">
    <span>Waktu Pengambilan</span>
  </div>

  {/* KOTAK UTAMA DROPDOWN (Tombol yang bisa diklik) */}
  <div className="relative">
    <button
      onClick={() => setIsWaktuOpen(!isWaktuOpen)}
      type="button"
      className="w-full flex items-center justify-between border border-gray-300 rounded-lg p-2.5 bg-white text-xs text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
     <div className="flex items-center gap-2">
    <Clock className="w-5 h-5" /> {/* Ikon kamu */}
    <span>{waktuTerpilih}</span>  {/* Tulisan kamu */}
  </div>
      {/* Ikon segitiga otomatis berputar saat diklik */}
      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isWaktuOpen ? "rotate-180" : ""}`} />
    </button>

    {/* PERBAIKAN: Sekarang dibungkus dengan {isOpen && (...)} */}
    {isWaktuOpen && (
      <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 flex flex-col overflow-hidden">
        {listWaktu.map((waktu, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              setWaktuTerpilih(waktu); // Ganti teks utama
              setIsWaktuOpen(false);        // Tutup kotak setelah dipilih
            }}
            className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 transition-colors border-b border-gray-50 last:border-0"
          >
            {waktu}
          </button>
        ))}
      </div>
    )}
  
  </div>
</div>

{/*pilihan pembayaran*/}
         <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800 px-1">
    <span>Metode Pembayaran</span>
  </div>

  {/* KOTAK UTAMA DROPDOWN (Tombol yang bisa diklik) */}
  <div className="relative">
    <button
      onClick={() => setIsPembayaranOpen(!isPembayaranOpen)}
      type="button"
      className="w-full flex items-center justify-between border border-gray-300 rounded-lg p-2.5 bg-white text-xs text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      <div className="flex items-center gap-2">
    <CircleDollarSign className="w-5 h-5" /> {/* Ikon kamu */}
    <span>{pembayaranTerpilih}</span>  {/* Tulisan kamu */}
  </div>
      {/* Ikon segitiga otomatis berputar saat diklik */}
      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isPembayaranOpen ? "rotate-180" : ""}`} />
    </button>

    {/* PERBAIKAN: Sekarang dibungkus dengan {isOpen && (...)} */}
    {isPembayaranOpen && (
      <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 flex flex-col overflow-hidden">
        {listPembayaran.map((pembayaran, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              setpembayaranTerpilih(pembayaran); // Ganti teks utama
              setIsPembayaranOpen(false);        // Tutup kotak setelah dipilih
            }}
            className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 transition-colors border-b border-gray-50 last:border-0"
          >
            {pembayaran}
          </button>
        ))}
      </div>
    )}
  
  </div>
</div>

          {/* === BOX CATATAN DARI PENJUAL === */}
          <div className="bg-gray-400 border border-gray-200 rounded-xl p-4 shadow-sm text-xs md:text-sm text-slate-800 flex items-start gap- leading-relaxed">
            <CircleAlert className="w-5 h-5" />
            Apakah pesanan anda sudah benar?Mohon untuk cek kembali pesanan anda.
          </div>
        </main>

        {/* === BUTTON BUAT PESANAN === */}
        <footer className="pt-4 border-t border-gray-100">
          <button
            disabled={cartItems.length === 0}
            onClick={() => alert("Pesanan berhasil dibuat!")}
            className="w-full bg-[#2cb31a] hover:bg-[#249614] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl text-center shadow-md transition-all active:scale-[0.99]"
          >
            Buat Pesanan
          </button>
        </footer>

      </div>
    </div>
  );
}