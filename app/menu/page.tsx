'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Star, Plus, LogOut, Search } from 'lucide-react';
import Link from 'next/link';

// Data Dummy 4 Section Menu (12 Menu Per Section)
const MENU_SECTIONS: Record<number, Array<{ id: number; name: string; price: number; image: string }>> = {
  1: [
    { id: 101, name: 'Rujak Coel', price: 5000, image: '/rujak coel.jpg' },
    { id: 102, name: 'Rujak Cuka', price: 5000, image: '/rujak cuka.jpeg' },
    { id: 103, name: 'Rujak Serut', price: 5000, image: '/rujak serut.jpeg' },
    { id: 104, name: 'Korean Street Food', price: 5000, image: '/korean food.jpg' },
    { id: 105, name: 'Salad Jeli', price: 6000, image: '/salad jeli.jpeg' },
    { id: 106, name: 'Setup Roti', price: 5000, image: '/stup roti.jpeg' },
    { id: 107, name: 'Roti Goreng', price: 2000, image: '/roti goreng.jpeg' },
    { id: 108, name: 'Kue Basah', price: 2000, image: '/kue basah.jpeg' },
    { id: 109, name: 'Puding Cokelat', price: 4000, image: '/puding.jpeg' },
    { id: 110, name: 'Risoles Mayonaise', price: 3000, image: '/risol.jpeg' },
    { id: 111, name: 'Pastel Daging', price: 3000, image: '/pastel.jpeg' },
    { id: 112, name: 'Lumpia Goreng', price: 2500, image: '/lumpia.jpeg' },
  ],
  2: [
    { id: 201, name: 'Mie Bakso', price: 8000, image: '/bakso.jpeg' },
    { id: 202, name: 'Mie Campur', price: 8000, image: '/bakso.jpeg' },
    { id: 203, name: 'Mie Yamin', price: 8000, image: '/yamin.jpeg' },
    { id: 204, name: 'Pop Ice', price: 3000, image: '/popice.jpeg' },
    { id: 205, name: 'Batagor', price: 5000, image: '/batagor.jpeg' },
    { id: 206, name: 'Tea Jus', price: 1000, image: '/teajus.jpeg' },
    { id: 207, name: 'Cemilan', price: 2000, image: '/cemilan.jpeg' },
    { id: 208, name: 'Marimas', price: 1000, image: '/marimas.jpeg' },
    { id: 209, name: 'Siomay Bandung', price: 7000, image: '/siomay.jpeg' },
    { id: 210, name: 'Cireng Bumbu Rujak', price: 5000, image: '/cireng.jpeg' },
    { id: 211, name: 'Es Milo', price: 4000, image: '/milo.jpeg' },
    { id: 212, name: 'Es Nutrisari', price: 3000, image: '/nutrisari.jpeg' },
  ],
  3: [
    { id: 301, name: 'Kentang Goreng', price: 5000, image: '/kentang.jpeg' },
    { id: 302, name: 'Tahu Crispy', price: 3000, image: '/tahu.jpeg' },
    { id: 303, name: 'Bola Aci', price: 1000, image: '/aci.jpeg' },
    { id: 304, name: 'Otak-otak', price: 3000, image: '/otak.jpeg' },
    { id: 305, name: 'Aneka Gorengan', price: 1000, image: '/gorengan.jpeg' },
    { id: 306, name: 'Aksesoris', price: 2000, image: '/aksesoris.jpeg' },
    { id: 307, name: 'Lontong', price: 2000, image: '/lontong.jpeg' },
    { id: 308, name: 'Baso Tahu', price: 5000, image: '/basotahu.jpeg' },
    { id: 309, name: 'Sosis Bakar', price: 4000, image: '/sosis.jpeg' },
    { id: 310, name: 'Nugget Goreng', price: 5000, image: '/nugget.jpeg' },
    { id: 311, name: 'Pangsit Goreng', price: 3000, image: '/pangsit.jpeg' },
    { id: 312, name: 'Es Jeruk', price: 4000, image: '/esjeruk.jpeg' },
  ],
  4: [
    { id: 413, name: 'Nasi Putih', price: 3000, image: '/nasi.jpeg' },
    { id: 414, name: 'Mie Goreng', price: 6000, image: '/miegoreng.jpeg' },
    { id: 415, name: 'Rencang Sangu', price: 5000, image: '/rencang.jpeg' },
    { id: 416, name: 'Mie Kuah', price: 6000, image: '/miekuah.jpeg' },
    { id: 417, name: 'Es Teh Manis', price: 3000, image: '/es teh.jpeg' },
    { id: 418, name: 'Pop Ice Coklat', price: 3000, image: '/popice.jpeg' },
    { id: 419, name: 'Juice Alpukat', price: 8000, image: '/juice.jpeg' },
    { id: 420, name: 'Ayam Geprek', price: 10000, image: '/geprek.jpeg' },
    { id: 421, name: 'Nasi Goreng', price: 10000, image: '/nasgor.jpeg' },
    { id: 422, name: 'Ayam Penyet', price: 10000, image: '/penyet.jpeg' },
    { id: 423, name: 'Kopi Hitam', price: 3000, image: '/kopi.jpeg' },
    { id: 424, name: 'Air Mineral', price: 3000, image: '/air.jpeg' },
  ],
};

interface MenusRepsonse {
  res: {
    data: Array<{
      id: number
      documentId: string
      name: string
      category: string
      price: number
      stock: number
      ketersediaan: string
      description: string
      slug: any
      createdAt: string
      updatedAt: string
      publishedAt: string
      image: {
        id: number
        documentId: string
        name: string
        alternativeText: any
        caption: any
        focalPoint: any
        width: number
        height: number
        formats: {
          large: {
            ext: string
            url: string
            hash: string
            mime: string
            name: string
            path: any
            size: number
            width: number
            height: number
            sizeInBytes: number
          }
          small: {
            ext: string
            url: string
            hash: string
            mime: string
            name: string
            path: any
            size: number
            width: number
            height: number
            sizeInBytes: number
          }
          medium: {
            ext: string
            url: string
            hash: string
            mime: string
            name: string
            path: any
            size: number
            width: number
            height: number
            sizeInBytes: number
          }
          thumbnail: {
            ext: string
            url: string
            hash: string
            mime: string
            name: string
            path: any
            size: number
            width: number
            height: number
            sizeInBytes: number
          }
        }
        hash: string
        ext: string
        mime: string
        size: number
        url: string
        previewUrl: any
        provider: string
        provider_metadata: any
        createdAt: string
        updatedAt: string
        publishedAt: string
      }
      tenant: {
        id: number
        documentId: string
        name: string
        rating: number
        slug: any
        createdAt: string
        updatedAt: string
        publishedAt: string
      }
    }>
    meta: {
      pagination: {
        page: number
        pageSize: number
        pageCount: number
        total: number
      }
    }
  }
}

export default function MenuPage() {
  const [data, setData] = useState<MenusRepsonse['res'] | undefined>(undefined)
  const router = useRouter();

  const [activeSection, setActiveSection] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const currentSectionMenus = MENU_SECTIONS[activeSection] || [];

  const filteredMenus = currentSectionMenus.filter((menu) =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  useMemo(async () => {
    async function getAboutData() {
      try {
        const data = await fetch('http://localhost:1337/api/menus?populate=*&pagination[limit]=10000')
        const res: MenusRepsonse['res'] = await data.json()
        setData(res)
      } catch (error) {
        console.error({ error })
      }
    }
    await getAboutData()
  }, [])

  // console.log({ data })

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20 w-full overflow-x-hidden">
      {/* --- MAIN CONTENT --- */}
      <main className="w-full mt-24 px-6 sm:px-12 md:px-16">

        {/* BANNER HEADER (Style Gambar 1) */}
        <div className="relative w-full h-64 sm:h-72 md:h-80 overflow-hidden rounded-[36px] bg-gray-900 shadow-sm border border-gray-100">
          <img
            src="/bg_makanan.jpeg"
            alt="Banner Makanan"
            className="w-full h-full object-cover object-center opacity-80 brightness-90"

          />

          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-white text-3xl sm:text-4xl font-serif font-normal drop-shadow-md mb-1">
              Selamat Datang
            </h1>
            <p className="text-white text-sm sm:text-base font-sans font-light drop-shadow-sm mb-5">
              Cari makanan favoritmu hari ini!
            </p>

            {/* Input Search (Ikon di Kiri) */}
            <div className="relative w-full max-w-md sm:max-w-lg">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full bg-white px-5 py-3 pl-11 text-sm text-gray-700 placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="mt-10 flex items-center justify-between">
          <h3 className="text-2xl sm:text-3xl font-serif font-medium text-gray-900">Menu Kami</h3>
          <span className="text-xs sm:text-sm font-medium text-gray-400">Halaman {activeSection} dari 4</span>
        </div>

        {/* --- GRID MENU --- */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {data?.data?.map((menu) => (
            <div
              key={menu.id}
              className="flex items-center gap-4 rounded-[28px] border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              {/* Foto Makanan */}
              <div className="h-28 w-28 sm:h-32 sm:w-32 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                <img src={`http://localhost:1337${menu.image.url}`} alt={menu.name} className="h-full w-full object-cover object-center" />
              </div>

              {/* Info Makanan */}
              <div className="flex flex-grow flex-col justify-between py-1 h-full min-w-0">
                <div>
                  <h4 className="text-base sm:text-lg font-serif font-medium text-gray-800 truncate">{menu.name}</h4>
                  <p className="text-sm sm:text-base font-bold text-gray-900 mt-0.5">Rp {menu.price.toLocaleString('id-ID')}</p>
                  <div className="mt-1.5 flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#FFD700" className="text-yellow-400" />
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-2">
                  {/* TOMBOL PLUS: Background Oranye, Ikon HITAM */}
                  <button className="rounded-xl bg-orange-500 p-2 text-black shadow-md hover:bg-orange-600 transition-colors active:scale-95">
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- PAGINATION (ANGKA TETAP HITAM) --- */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            onClick={() => setActiveSection((prev) => Math.max(prev - 1, 1))}
            disabled={activeSection === 1}
            className="px-2 py-1 text-sm text-gray-500 hover:text-black disabled:opacity-30 transition-colors"
          >
            &lt;
          </button>

          {[1, 2, 3, 4].map((sectionNum) => (
            <button
              key={sectionNum}
              onClick={() => {
                setActiveSection(sectionNum);
                setSearchTerm('');
              }}
              className={`h-9 w-9 rounded-full text-xs font-semibold transition-all ${activeSection === sectionNum
                ? 'bg-orange-500 text-black shadow-md scale-105' // background oranye, teks HITAM
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {sectionNum}
            </button>
          ))}

          <button
            onClick={() => setActiveSection((prev) => Math.min(prev + 1, 4))}
            disabled={activeSection === 4}
            className="px-2 py-1 text-sm text-gray-500 hover:text-black disabled:opacity-30 transition-colors"
          >
            &gt;
          </button>
        </div>

      </main>
    </div>
  );
}