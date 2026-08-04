'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Plus, 
  SquarePen, 
  Trash2, 
  X, 
  Upload 
} from 'lucide-react';

interface MenuItem {
  id: number;
  documentId?: string;
  fotoUrl: string;
  namaMenu: string;
  kategori: string;
  harga: string;
  stok: number;
  status: string;
}

export default function KelolaMenu() {
  const router = useRouter();

  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // State Modal Tambah & Hapus
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<{ id: number; nama: string; docId?: string } | null>(null);

  // Form State Tambah Menu
  const [formNama, setFormNama] = useState('');
  const [formKategori, setFormKategori] = useState('Makanan');
  const [formHarga, setFormHarga] = useState('');
  const [formStok, setFormStok] = useState('');
  const [formStatus, setFormStatus] = useState('Tersedia');

  // State Khusus Gambar
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const STRAPI_URL = 'http://localhost:1337';

  // FETCH DATA DARI STRAPI
  const fetchMenus = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${STRAPI_URL}/api/menus?populate=*`);
      const result = await res.json();

      if (result.data) {
        const mappedData: MenuItem[] = result.data.map((item: any) => {
          const imgUrl = item.foto?.url
            ? `${STRAPI_URL}${item.foto.url}`
            : 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=150&q=80';

          return {
            id: item.id,
            documentId: item.documentId,
            namaMenu: item.nama_menu || 'Tanpa Nama',
            kategori: item.kategori || 'Makanan',
            harga: `Rp ${(item.Harga || item.harga || 0).toLocaleString('id-ID')}`,
            stok: item.Stok || item.stok || 0,
            status: item.statusmenu || item.status || 'Tersedia',
            fotoUrl: imgUrl,
          };
        });

        setMenus(mappedData);
      }
    } catch (error) {
      console.error('Gagal mengambil data Strapi:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // Handle Pilih File Gambar
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // SIMPAN MENU BARU DENGAN UPLOAD GAMBAR KE STRAPI
  const handleSimpanMenu = async () => {
    if (!formNama || !formHarga || !formStok) {
      alert('Mohon isi semua data yang diperlukan!');
      return;
    }

    try {
      setIsSubmitting(true);
      let uploadedImageId = null;

      if (selectedFile) {
        const formData = new FormData();
        formData.append('files', selectedFile);

        const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          uploadedImageId = uploadData[0].id;
        }
      }

      const payload = {
        data: {
          nama_menu: formNama,
          kategori: formKategori,
          Harga: Number(formHarga),
          Stok: Number(formStok),
          statusmenu: formStatus,
          ...(uploadedImageId && { foto: uploadedImageId }),
        },
      };

      const res = await fetch(`${STRAPI_URL}/api/menus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormNama('');
        setFormHarga('');
        setFormStok('');
        setSelectedFile(null);
        setPreviewUrl(null);
        fetchMenus();
      }
    } catch (error) {
      console.error('Gagal menyimpan menu:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // HAPUS MENU
  const handleDeleteClick = (menu: MenuItem) => {
    setSelectedMenu({ id: menu.id, nama: menu.namaMenu, docId: menu.documentId });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedMenu) return;

    try {
      const targetId = selectedMenu.docId || selectedMenu.id;
      const res = await fetch(`${STRAPI_URL}/api/menus/${targetId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setIsDeleteModalOpen(false);
        fetchMenus();
      }
    } catch (error) {
      console.error('Gagal menghapus menu:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#EBEBEB] p-4 sm:p-8 font-sans">
      <div className="max-w-full mx-auto">
        {/* Breadcrumb kecil di luar card */}
        <p className="text-slate-400 text-sm font-medium mb-3">Kelola Menu</p>

        {/* Card Utama Berwarna Putih */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
          
          {/* Header Dalam Card: Tombol Back + Judul & Tombol Tambah Menu */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Link
                href="/dasboard-admin"
                className="text-slate-800 hover:text-orange-500 transition-colors p-1"
                title="Kembali ke Dashboard Admin"
              >
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Kelola Menu
              </h1>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#FF8A00] hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all active:scale-95 shadow-sm shrink-0 flex items-center gap-1.5"
            >
              <Plus size={18} />
              <span>Tambah Menu</span>
            </button>
          </div>

          {/* Tabel Konten Menu */}
          <div className="border border-slate-200 rounded-2xl overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-900 font-bold text-sm sm:text-base">
                  <th className="py-4 px-6 text-center w-28">Foto</th>
                  <th className="py-4 px-6">Nama Menu</th>
                  <th className="py-4 px-6">Kategori</th>
                  <th className="py-4 px-6">Harga</th>
                  <th className="py-4 px-6 text-center">Stok</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-center w-28">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm sm:text-base font-semibold text-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-400 font-normal">
                      Memuat data menu...
                    </td>
                  </tr>
                ) : menus.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-400 font-normal">
                      Belum ada menu. Silakan klik tombol Tambah Menu.
                    </td>
                  </tr>
                ) : (
                  menus.map((menu) => (
                    <tr key={menu.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-6 text-center">
                        <img
                          src={menu.fotoUrl}
                          alt={menu.namaMenu}
                          className="w-16 h-12 object-cover rounded-lg mx-auto"
                        />
                      </td>
                      <td className="py-3 px-6 font-bold text-slate-900 whitespace-nowrap">
                        {menu.namaMenu}
                      </td>
                      <td className="py-3 px-6 text-slate-700 whitespace-nowrap">
                        {menu.kategori}
                      </td>
                      <td className="py-3 px-6 whitespace-nowrap">
                        {menu.harga}
                      </td>
                      <td className="py-3 px-6 text-center whitespace-nowrap">
                        {menu.stok}
                      </td>
                      <td className="py-3 px-6 text-center whitespace-nowrap">
                        <span
                          className={`px-4 py-1 text-xs font-semibold rounded-full border inline-block ${
                            menu.status === 'Tersedia'
                              ? 'text-emerald-600 bg-emerald-50 border-emerald-300'
                              : 'text-red-500 bg-red-50 border-red-300'
                          }`}
                        >
                          {menu.status}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-3 text-slate-700">
                          <button className="hover:text-orange-500 transition-colors p-1">
                            <SquarePen size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(menu)}
                            className="hover:text-red-600 transition-colors p-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* MODAL TAMBAH MENU */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Tambah Menu</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Foto Menu</label>
                <div className="flex items-center gap-4">
                  {previewUrl && (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                  
                  <label className="flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-orange-500 transition-colors bg-slate-50">
                    <Upload size={20} className="text-slate-400 mb-1" />
                    <span className="text-xs font-semibold text-slate-500 text-center">Klik untuk unggah foto</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Nama Menu</label>
                <input 
                  type="text" 
                  value={formNama}
                  onChange={(e) => setFormNama(e.target.value)}
                  placeholder="Masukan Nama Menu" 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Kategori</label>
                  <select 
                    value={formKategori}
                    onChange={(e) => setFormKategori(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm font-medium"
                  >
                    <option value="Makanan">Makanan</option>
                    <option value="Minuman">Minuman</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Harga</label>
                  <input 
                    type="number" 
                    value={formHarga}
                    onChange={(e) => setFormHarga(e.target.value)}
                    placeholder="Masukan Harga" 
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Stok</label>
                  <input 
                    type="number" 
                    value={formStok}
                    onChange={(e) => setFormStok(e.target.value)}
                    placeholder="Jumlah Stok" 
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Status</label>
                  <select 
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm font-medium"
                  >
                    <option value="Tersedia">Tersedia</option>
                    <option value="Habis">Habis</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 pt-2 flex justify-end gap-3 border-t border-slate-100">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 text-sm"
              >
                Batal
              </button>
              <button 
                onClick={handleSimpanMenu}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#FF8A00] text-white rounded-xl font-bold hover:bg-orange-600 disabled:opacity-50 text-sm"
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL HAPUS */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
                <Trash2 size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Hapus Menu?</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Apakah Anda yakin ingin menghapus menu <span className="font-bold text-slate-800">"{selectedMenu?.nama}"</span>?
              </p>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-5 py-2.5 border border-slate-200 bg-white rounded-xl font-bold text-slate-700 hover:bg-slate-50 text-sm"
              >
                Batal
              </button>
              <button 
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}