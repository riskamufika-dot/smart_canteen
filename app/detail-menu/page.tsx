"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation"; // 1. Tambahkan import untuk routing dinamis
import { ArrowLeft, House, ShieldCheck, ShoppingCart } from "lucide-react";

// 2. WADAH DESKRIPSI MENU: Tambahkan deskripsi menu lain di objek ini
// GANTIKAN DATA MASTER KAMU DENGAN KODE DI BAWAH INI:
const DATA_MENU_MASTER = {
  // === MAKANAN UTAMA (1 - 15) ===
 
  "1": {
    "nama": "Rujak Coel",
    "harga": 5000,
    "stok": 30,
    "gambar": "/rujak-coel.jpg",
    "deskripsi": "Irisan buah-buahan segar seperti mangga muda, bengkuang, dan kedondong yang disajikan bersama cocolan sambal gula merah pedas manis."
  },
  "2": {
    "nama": "Rujak Cuka",
    "harga": 5000,
    "stok": 20,
    "gambar": "/rujak-cuka.jpg",
    "deskripsi": "Olahan irisan buah segar dan sayuran renyah yang disiram kuah cuka manis, asam, dan pedas menyegarkan."
  },
  "3": {
    "nama": "Rujak Serut",
    "harga": 5000,
    "stok": 25,
    "gambar": "/rujak-serut.jpg",
    "deskripsi": "Serutan aneka buah-buahan segar yang diaduk rata dengan bumbu rujak pedas manis menyegarkan."
  },
  "4": {
    "nama": "Korean Streetfood",
    "harga": 3000,
    "stok": 15,
    "gambar": "/korean-streetfood.jpg",
    "deskripsi": "Jajanan khas Korea seperti tteokbokki atau odeng dengan saus gochujang pedas gurih yang lezat."
  },
  "5": {
    "nama": "Salad Jeli",
    "harga": 6000,
    "stok": 15,
    "gambar": "/salad-jelly.jpg",
    "deskripsi": "Potongan jeli aneka rasa buah yang kenyal, dipadukan dengan saus mayones manis creamy dan parutan keju di atasnya."
  },
  "6": {
    "nama": "Stup Roti",
    "harga": 5000,
    "stok": 20,
    "gambar": "/stup-roti.jpg",
    "deskripsi": "Olahan roti tawar yang disiram saus olahan susu creamy yang lembut, disajikan dingin dengan taburan keju."
  },
  "7": {
    "nama": "Roti Goreng",
    "harga": 2000,
    "stok": 15,
    "gambar": "/roti-goreng.jpg",
    "deskripsi": "Roti goreng bertestur renyah di luar dan lembut di dalam dengan isian manis/gurih yang menggugah selera."
  },
  "8": {
    "nama": "Kue Basah",
    "harga": 2000,
    "stok": 30,
    "gambar": "/kue-basah.jpg",
    "deskripsi": "Aneka jajanan pasar tradisional yang lembut, gurih, dan manis, cocok untuk teman minum teh."
  },
  "9": {
    "nama": "Spageti",
    "harga": 5000,
    "stok": 20,
    "gambar": "/spaghetti.jpg",
    "deskripsi": "Pasta spageti lembut yang disiram saus bolognese gurih dengan racikan daging cincang dan taburan keju."
  },
  "10": {
    "nama": "Lotek",
    "harga": 5000,
    "stok": 25,
    "gambar": "/lotek.jpg",
    "deskripsi": "Aneka sayuran rebus segar yang diulek langsung bersama saus kacang khas Sunda yang gurih dan legit."
  },
  "11": {
    "nama": "Cemilan Keringan",
    "harga": 5000,
    "stok": 15,
    "gambar": "/cemilan-kering.jpg",
    "deskripsi": "Aneka aneka keripik dan camilan renyah dengan varian rasa gurih pedas yang bikin nagih."
  },
  "12": {
    "nama": "Lontong Sayur",
    "harga": 7000,
    "stok": 30,
    "gambar": "/lontong-sayur.jpg",
    "deskripsi": "Potongan lontong lembut yang disiram kuah santan gurih kaya rempah, dilengkapi labu siam dan kerupuk."
  },
  "13": {
    "nama": "Mie Bakso",
    "harga": 8000,
    "stok": 25,
    "gambar": "/mie-bakso.jpg",
    "deskripsi": "Semangkuk mie kuning/bihun dengan bakso daging sapi kenyal disiram kuah kaldu hangat yang gurih dan segar."
  },
  "14": {
    "nama": "Mie Campur",
    "harga": 8000,
    "stok": 20,
    "gambar": "/mie-campur.jpg",
    "deskripsi": "Kombinasi mie dan bihun yang diolah dengan bumbu spesial, dilengkapi dengan topping ayam dan sayuran."
  },
  "15": {
    "nama": "Mie Yamin",
    "harga": 8000,
    "stok": 10,
    "gambar": "/mie-yamin.jpg",
    "deskripsi": "Mie kenyal berbalut bumbu manis atau asin khas yamin, disajikan dengan topping ayam cincang dan kuah terpisah."
  },
  "16": {
    "nama": "Basreng",
    "harga": 3000,
    "stok": 50,
    "gambar": "/basreng.jpg",
    "deskripsi": "Bakso goreng renyah yang diiris tipis, ditaburi bumbu pedas gurih dan aroma daun jeruk yang khas."
  },
  "17": {
    "nama": "Tea Jus",
    "harga": 1000,
    "stok": 40,
    "gambar": "/tea-jus.jpg",
    "deskripsi": "Minuman teh instan manis dingin yang segar dan pas untuk melepas dahaga."
  },
  "18": {
    "nama": "Cemilan",
    "harga": 1000,
    "stok": 20,
    "gambar": "/cemilan.jpg",
    "deskripsi": "Aneka jajanan ringan gurih dan renyah dengan porsi pas untuk menemani waktu santai."
  },
  "19": {
    "nama": "Marimas",
    "harga": 1000,
    "stok": 25,
    "gambar": "/marimas.jpg",
    "deskripsi": "Minuman serbuk rasa buah-buahan segar yang disajikan dingin menggelegar."
  },
  "20": {
    "nama": "Pop Ice",
    "harga": 5000,
    "stok": 20,
    "gambar": "/pop-ice.jpg",
    "deskripsi": "Minuman blender rasa milk shake favorit dengan aneka topping seperti meises atau keju di atasnya."
  },
  "21": {
    "nama": "Seblak",
    "harga": 8000,
    "stok": 25,
    "gambar": "/seblak.jpg",
    "deskripsi": "Jajanan khas Sunda berkuah pedas kencur gurih dengan isian kerupuk basah, makaroni, telur, dan sosis."
  },
  "22": {
    "nama": "Spageti",
    "harga": 8000,
    "stok": 15,
    "gambar": "/spaghetti.jpg",
    "deskripsi": "Pasta spageti dengan porsi mantap disiram saus bolognaise kaya bumbu dan daging cincang."
  },
  "23": {
    "nama": "Bubur Ayam",
    "harga": 8000,
    "stok": 35,
    "gambar": "/bubur-ayam.jpg",
    "deskripsi": "Bubur beras lembut disajikan dengan suwiran ayam, cakwe, kedelai goreng, kerupuk, dan kuah kaldu kuning."
  },
  "24": {
    "nama": "Lontong Sayur",
    "harga": 8000,
    "stok": 20,
    "gambar": "/lontong-sayur.jpg",
    "deskripsi": "Porsi mantap lontong lembut berpadu kuah santan gurih, olahan labu, dan kerupuk yang renyah."
  },
  "25": {
    "nama": "Nasi",
    "harga": 3000,
    "stok": 40,
    "gambar": "/nasi-putih.jpg",
    "deskripsi": "Satu porsi nasi putih hangat yang pulen, cocok dipadukan dengan berbagai lauk pauk."
  },
  "26": {
    "nama": "Mie Goreng",
    "harga": 10000,
    "stok": 30,
    "gambar": "/mie-goreng.jpg",
    "deskripsi": "Mie yang ditumis dengan sayuran, telur, dan bumbu kecap gurih manis yang nikmat."
  },
  "27": {
    "nama": "Mie Kuah",
    "harga": 9000,
    "stok": 30,
    "gambar": "/mie-kuah.jpg",
    "deskripsi": "Mie telur berkuah hangat dengan bumbu gurih yang pas, dilengkapi sayuran dan telur."
  },
  "28": {
    "nama": "Rencang Sangu",
    "harga": 6000,
    "stok": 15,
    "gambar": "/rencang-sangu.jpg",
    "deskripsi": "Aneka lauk pauk olahan pendamping nasi hangat yang gurih dan lezat."
  },
  "29": {
    "nama": "Kentang",
    "harga": 3000,
    "stok": 100,
    "gambar": "/kentang-goreng.jpg",
    "deskripsi": "Olahan kentang gurih yang digoreng hingga renyah di luar dan lembut di dalam."
  },
  "30": {
    "nama": "Tahu Crispy",
    "harga": 3000,
    "stok": 40,
    "gambar": "/tahu-crispy.jpg",
    "deskripsi": "Potongan tahu berbumbu yang digoreng krispi dengan balutan tepung renyah gurih."
  },
  "31": {
    "nama": "Bola Aci",
    "harga": 1000,
    "stok": 30,
    "gambar": "/bola-aci.jpg",
    "deskripsi": "Camilan kenyal berbahan dasar tepung tapioka/aci dengan bumbu tabur pedas atau gurih."
  },
  "32": {
    "nama": "Otak-Otak",
    "harga": 3000,
    "stok": 20,
    "gambar": "/otak-otak.jpg",
    "deskripsi": "Olahan ikan pilihan yang digoreng garing, nikmat disajikan dengan bumbu tabur atau saus."
  },
  "34": {
    "nama": "Pop Ice",
    "harga": 5000,
    "stok": 25,
    "gambar": "/pop-ice.jpg",
    "deskripsi": "Es blender manis dengan pilihan rasa favorit yang bikin adem dan segar."
  },
  "35": {
    "nama": "Es Teh",
    "harga": 3000,
    "stok": 15,
    "gambar": "/es-teh.jpg",
    "deskripsi": "Seduhan teh pilihan disajikan dingin dengan tingkat kemanisan yang pas menyegarkan."
  },
  "36": {
    "nama": "Juice",
    "harga": 8000,
    "stok": 15,
    "gambar": "/jus-buah.jpg",
    "deskripsi": "Jus buah segar pilihan yang diblender halus dengan es batu dan sedikit gula murni."
  },
  "37": {
    "nama": "Aneka Gorengan",
    "harga": 1000,
    "stok": 20,
    "gambar": "/gorengan.jpg",
    "deskripsi": "Pilihan gorengan renyah dan hangat seperti bakwan, tempe, tahu, atau pisang goreng."
  },
  "38": {
    "nama": "Aksesoris",
    "harga": 2000,
    "stok": 15,
    "gambar": "/aksesoris.jpg",
    "deskripsi": "Pernak-pernik atau barang pelengkap serbaguna dengan harga terjangkau."
  },
  "39": {
    "nama": "Cemilan",
    "harga": 2000,
    "stok": 30,
    "gambar": "/cemilan.jpg",
    "deskripsi": "Aneka jajanan ringan ekonomis untuk melengkapi waktu santaimu."
  },
  "40": {
    "nama": "Lontong",
    "harga": 2000,
    "stok": 20,
    "gambar": "/lontong.jpg",
    "deskripsi": "Lontong daun pisang yang padat, padat, dan lembut, cocok sebagai pendamping makanan berkuah/bumbu kacang."
  },
  "41": {
    "nama": "Baso Tahu",
    "harga": 5000,
    "stok": 25,
    "gambar": "/baso-tahu.jpg",
    "deskripsi": "Olahan tahu isi adonan olahan ikan/daging kukus/goreng yang disiram dengan saus kacang gurih."
  },
  "42": {
    "nama": "Baso Ikan",
    "harga": 2000,
    "stok": 15,
    "gambar": "/baso-ikan.jpg",
    "deskripsi": "Bakso berbahan dasar daging ikan segar yang kenyal dan gurih, disajikan goreng atau berkuah."
  },
  "43": {
    "nama": "Batagor",
    "harga": 5000,
    "stok": 30,
    "gambar": "/batagor.jpg",
    "deskripsi": "Bakso tahu goreng renyah isi adonan ikan tenggiri, disajikan dengan siraman saus kacang kental manis-pedas."
  },
  "44": {
    "nama": "Cilok",
    "harga": 2000,
    "stok": 15,
    "gambar": "/cilok.jpg",
    "deskripsi": "Bola-bola tepung tapioka kenyal yang disajikan hangat dengan siraman bumbu kacang atau saus pedas."
  }
}

export default function DetailMenu() {
  const params = useParams(); // 3. Ambil ID dari URL (misal: /1 atau /2)
  const router = useRouter(); // Dipakai untuk fungsi tombol kembali

  // Ambil data berdasarkan ID di URL. Jika ID tidak terdaftar atau folder baru diakses langsung, default ke menu ID "1" (Bakso)
  const idMenu = (params.id as string) || "1";
  const menuTerpilih = DATA_MENU_MASTER[idMenu as keyof typeof DATA_MENU_MASTER] || DATA_MENU_MASTER["1"];

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // 4. State lama kamu sekarang nilainya mengambil dari data dinamis di atas
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const stock = menuTerpilih.stok;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    alert(`Berhasil menambahkan ${quantity} ${menuTerpilih.nama} ke keranjang dengan catatan: "${notes || 'Tidak ada'}"`);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex justify-center">
      <div className="w-full min-h-screen bg-white shadow-sm flex flex-col justify-between p-4">
        
        {/* === HEADER === */}
        <header className="flex items-center justify-between pb-4 border-b border-gray-100">
          {/* Tombol kembali sekarang berfungsi otomatis balik ke halaman sebelumnya */}
          <button onClick={() => router.back()} className="p-1 hover:bg-gray-100 rounded-full transition" aria-label="Kembali">
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </button>
          <h1 className="text-lg font-bold text-slate-800">Detail Menu</h1>
          <div className="flex items-center gap-3">
            <button className="p-1 hover:bg-gray-100 rounded-full transition" aria-label="Home">
              <House className="w-6 h-6 text-slate-700" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-full transition relative" aria-label="Keranjang">
              <ShoppingCart className="w-6 h-6 text-slate-700" />
            </button>
          </div>
        </header>

        {/* === ISI KONTEN === */}
        <main className="flex-1 py-4 space-y-4">
          {/* Gambar Banner Dinamis */}
          <div className="relative w-full h-56 md:h-72 rounded-2xl overflow-hidden shadow-inner bg-gray-100 flex items-center justify-center">
            <Image
              className="object-cover w-full h-full"
              src={menuTerpilih.gambar}
              alt={menuTerpilih.nama}
              width={500}
              height={300}
              priority
            />
          </div>

          {/* Info Utama Dinamis */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
            <div>
              {/* Nama Menu Otomatis Berubah */}
              <h2 className="text-2xl font-semibold text-slate-900">{menuTerpilih.nama}</h2>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1 bg-green-50 text-green-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-200">
                  <ShieldCheck className="w-6 h-6 text-slate-700" />
                  Tersedia
                </span>
                <span className="text-sm text-slate-600 font-medium">
                  Stok: <span className="font-semibold text-slate-800">{stock} Porsi</span>
                </span>
              </div>
            </div>
            <div className="text-right">
              {/* Harga Otomatis Berubah format Rupiah */}
              <span className="text-2xl font-bold text-amber-600">
                {isMounted
               ? Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(menuTerpilih.harga): "Rp ..."}
              </span>
            </div>
          </div>

          {/* Deskripsi Menu Dinamis */}
          <p className="text-sm text-slate-600 leading-relaxed text-justify">
            {menuTerpilih.deskripsi}
          </p>

          <hr className="border-gray-100" />

          {/* Input Jumlah */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800">Jumlah</label>
            <div className="flex items-center border border-gray-200 rounded-lg w-28 bg-gray-50/50 justify-between p-1">
              <button 
                onClick={handleDecrease}
                className="w-8 h-8 flex items-center justify-center font-bold text-slate-600 hover:bg-gray-200 rounded transition"
              >
                -
              </button>
              <span className="font-semibold text-slate-850 text-sm">{quantity}</span>
              <button 
                onClick={handleIncrease}
                className="w-8 h-8 flex items-center justify-center font-bold text-slate-600 hover:bg-gray-200 rounded transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Catatan Untuk Penjual */}
          <div className="space-y-2">
            <label htmlFor="notes" className="block text-sm font-bold text-slate-800">
              Catatan Untuk Penjual:
            </label>
            <input
              id="notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Tidak pedas, tidak pakai timun, dll."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm bg-white placeholder:text-gray-400"
            />
          </div>
        </main>

        {/* === FOOTER BUTTON === */}
        <footer className="pt-4 border-t border-gray-100">
          <button
            onClick={handleAddToCart}
            className="w-full bg-orange-400 hover:bg-[#e07b00] active:scale-[0.99] text-white font-semibold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-orange-500/25 transition-all"
          >
            <ShoppingCart className="w-6 h-6 text-white" />
            Tambah Ke Keranjang
          </button>
        </footer>

      </div>
    </div>
  );
}