'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Edit, Trash2, ChevronDown } from 'lucide-react';

interface Kantin {
  id: number;
  nama: string;
  pemilik: string;
  email: string;
  status: string;
}

export default function KelolaKantin() {
  const router = useRouter(); // Router Next.js

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [dataKantin, setDataKantin] = useState<Kantin[]>([
    { id: 1, nama: 'Kantin Mas Arjo', pemilik: 'Mas Arjo', email: 'MasArjo@gmail.com', status: 'Aktif' },
    { id: 2, nama: 'Kantin Lies', pemilik: 'Bu Lies', email: 'BuLies@gmail.com', status: 'Aktif' },
    { id: 3, nama: 'Kantin Bi Nani', pemilik: 'Bi Nani', email: 'BiNani@gmail.com', status: 'Aktif' },
    { id: 4, nama: 'Kantin Teh Nci', pemilik: 'Teh Nci', email: 'TehNci@gmail.com', status: 'Aktif' },
    { id: 5, nama: 'Kantin Apih', pemilik: 'Apih', email: 'Apih@gmail.com', status: 'Aktif' },
  ]);

  const [formData, setFormData] = useState({
    namaKantin: '',
    namaPemilik: '',
    email: '',
    status: 'Aktif',
  });

  const toggleStatus = (id: number) => {
    setDataKantin((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: item.status === 'Aktif' ? 'Non-Aktif' : 'Aktif' } : item
      )
    );
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus kantin ini?')) {
      setDataKantin((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setSelectedId(null);
    setFormData({ namaKantin: '', namaPemilik: '', email: '', status: 'Aktif' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: Kantin) => {
    setIsEditMode(true);
    setSelectedId(item.id);
    setFormData({
      namaKantin: item.nama,
      namaPemilik: item.pemilik,
      email: item.email,
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.namaKantin || !formData.email) return;

    if (isEditMode && selectedId !== null) {
      setDataKantin((prev) =>
        prev.map((item) =>
          item.id === selectedId
            ? {
                ...item,
                nama: formData.namaKantin,
                pemilik: formData.namaPemilik || '-',
                email: formData.email,
                status: formData.status,
              }
            : item
        )
      );
    } else {
      const newKantin: Kantin = {
        id: Date.now(),
        nama: formData.namaKantin,
        pemilik: formData.namaPemilik || '-',
        email: formData.email,
        status: formData.status,
      };
      setDataKantin([newKantin, ...dataKantin]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-slate-100 p-8 text-slate-800">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()} // Navigasi Kembali
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-slate-100"
              title="Kembali"
            >
              <ArrowLeft className="h-5 w-5 text-slate-700" />
            </button>
            <h1 className="text-xl font-bold text-slate-900">Kelola Kantin</h1>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-1.5 rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Kantin</span>
          </button>
        </div>

        {/* Tabel Data Kantin */}
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-white font-bold text-slate-800">
                  <th className="px-6 py-4">Foto</th>
                  <th className="px-6 py-4">Nama Kantin</th>
                  <th className="px-6 py-4">Pemilik</th>
                  <th className="px-6 py-4">E-Mail</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {dataKantin.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-6 py-3">
                      <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-slate-300 text-[10px] text-slate-400">
                        Gambar
                      </div>
                    </td>
                    <td className="px-6 py-3 font-semibold text-slate-900">{item.nama}</td>
                    <td className="px-6 py-3">{item.pemilik}</td>
                    <td className="px-6 py-3 text-slate-800">{item.email}</td>

                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => toggleStatus(item.id)}
                        className={`inline-block rounded-full border px-4 py-1 text-xs font-medium transition-all active:scale-95 ${
                          item.status === 'Aktif'
                            ? 'border-emerald-400 bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                            : 'border-rose-400 bg-rose-50 text-rose-600 hover:bg-rose-100'
                        }`}
                      >
                        {item.status}
                      </button>
                    </td>

                    <td className="px-6 py-3 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="text-slate-600 transition-colors hover:text-orange-500"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-slate-600 transition-colors hover:text-red-600"
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pop Up Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">
            <h2 className="mb-6 text-xl font-bold text-slate-900">
              {isEditMode ? 'Edit Data Kantin' : 'Tambah Kantin Baru'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-900">Nama Kantin</label>
                <input
                  type="text"
                  placeholder="Masukan Nama Kantin"
                  value={formData.namaKantin}
                  onChange={(e) => setFormData({ ...formData, namaKantin: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-900">Nama Pemilik</label>
                <input
                  type="text"
                  placeholder="Masukan Nama Pemilik"
                  value={formData.namaPemilik}
                  onChange={(e) => setFormData({ ...formData, namaPemilik: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-900">E-Mail</label>
                <input
                  type="email"
                  placeholder="Masukan E-Mail"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-900">Status</label>
                <div className="relative w-36">
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium outline-none focus:border-orange-500"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Non-Aktif">Non-Aktif</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white px-8 py-2 text-sm font-bold text-slate-900 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-orange-500 px-8 py-2 text-sm font-bold text-white shadow-sm hover:bg-orange-600"
                >
                  {isEditMode ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}