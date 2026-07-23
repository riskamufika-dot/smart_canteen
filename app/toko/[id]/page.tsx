"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Plus } from "lucide-react";

// Data dummy menu per toko
const dataToko: Record<string, { name: string; banner: string; menu: { name: string; price: string; image: string }[] }> = {
  "mas-arjo": {
    name: "Mas Arjo",
    banner: "/banner-mas-arjo.jpg",
    menu: [
      { name: "Mie Bakso", price: "Rp 8.000", image: "/menu-mie-bakso.jpg" },
      { name: "Mie Campur", price: "Rp 8.000", image: "/menu-mie-campur.jpg" },
      { name: "Mie Yamin", price: "Rp 8.000", image: "/menu-mie-yamin.jpg" },
    ]
  },
  "bu-nani": {
    name: "Kantin Bi Nani",
    banner: "/banner-bi-nani.jpg",
    menu: [
      { name: "Basreng", price: "Rp 1.000", image: "/menu-basreng.jpg" },
      { name: "Tea Jus", price: "Rp 1.000", image: "/menu-tea-jus.jpg" },
    ]
  }
};

export default function DetailTokoPage() {
  const params = useParams();
  const id = params?.id as string;
  
  // Ambil data berdasarkan URL ID, jika tidak ada fallback ke Mas Arjo
  const toko = dataToko[id] || dataToko["mas-arjo"];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Tombol Kembali */}
      <Link href="/home" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-orange-500 transition">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Home
      </Link>

      {/* Header Banner Toko */}
      <div className="relative rounded-2xl overflow-hidden h-40 shadow-md">
        <img src={toko.banner} alt={toko.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 flex items-center px-6">
          <h1 className="text-2xl font-serif font-bold text-white uppercase">{toko.name}</h1>
        </div>
      </div>

      {/* List Menu Toko Ini */}
      <section className="space-y-3">
        <h2 className="text-sm font-serif font-bold text-slate-800">Menu Kami</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {toko.menu.map((item, idx) => (
            <div key={idx} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
              <img src={item.image} alt={item.name} className="w-20 h-16 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="font-serif font-bold text-xs">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.price}</p>
                <div className="flex text-amber-400 text-[10px] mt-1">{"★".repeat(5)}</div>
              </div>
              <button className="bg-orange-500 text-white p-1.5 rounded-lg hover:bg-orange-600 transition">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}