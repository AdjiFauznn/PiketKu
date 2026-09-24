import React, { useState } from 'react';
import { Bell, Check, Sparkles } from 'lucide-react';
import { AnnouncementItem, UserProfile } from '../../types';
import { ScreenHeader } from '../ScreenHeader';

interface BuatPengumumanScreenProps {
  user: UserProfile;
  onSubmit: (announcement: AnnouncementItem, sendNotif: boolean) => void;
  onBack: () => void;
}

export const BuatPengumumanScreen: React.FC<BuatPengumumanScreenProps> = ({
  user,
  onSubmit,
  onBack,
}) => {
  const [title, setTitle] = useState('Rapat UTS Semester Genap');
  const [content, setContent] = useState(
    'Diharapkan semua pengurus kelas hadir di ruang kelas setelah pulang sekolah untuk koordinasi UTS bersama...'
  );
  const [date, setDate] = useState('26 Jan 2026');
  const [category, setCategory] = useState<AnnouncementItem['category']>('Kegiatan Kelas');
  const [sendNotification, setSendNotification] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setErrorMsg('Judul dan isi pengumuman wajib diisi');
      return;
    }

    const newAnnouncement: AnnouncementItem = {
      id: `ann-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      authorRole: user.role === 'wali_kelas' ? 'Pak Wal (Wali Kelas)' : 'Sekretaris Kelas',
      authorName: user.name,
      date: date || '26 Jan 2026',
      category: category,
    };

    onSubmit(newAnnouncement, sendNotification);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50/50 overflow-y-auto relative">
      {/* Header */}
      <ScreenHeader
        title="Buat Pengumuman Baru"
        subtitle="Publikasikan informasi kegiatan kelas"
        onBack={onBack}
      />

      <form onSubmit={handlePublish} className="flex-1 px-5 pt-4 pb-24 space-y-4">
        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
            {errorMsg}
          </div>
        )}

        {/* Input: Judul Pengumuman */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Judul Pengumuman
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul pengumuman..."
            className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all font-medium"
          />
        </div>

        {/* Textarea: Isi Pengumuman */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Isi Pengumuman
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            placeholder="Tuliskan isi pengumuman dengan jelas..."
            className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all font-medium leading-relaxed"
          />
        </div>

        {/* Row: Tanggal & Kategori */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tanggal
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="26 Jan 2026"
              className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3 py-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all font-medium"
            >
              <option value="Kegiatan Kelas">Kegiatan Kelas</option>
              <option value="Piket & Kebersihan">Piket & Kebersihan</option>
              <option value="Akademik">Akademik</option>
              <option value="OSIS SMKN 24">OSIS SMKN 24</option>
              <option value="Umum">Umum</option>
            </select>
          </div>
        </div>

        {/* Toggle: Kirim sebagai notifikasi */}
        <div className="p-4 rounded-2xl bg-white border border-slate-100 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-900">
              Kirim sebagai notifikasi
            </span>
          </div>

          <button
            type="button"
            onClick={() => setSendNotification(!sendNotification)}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 focus:outline-none ${
              sendNotification ? 'bg-indigo-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                sendNotification ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Notice Info Box matching mockup */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-[11px] text-indigo-800 leading-relaxed font-normal">
          <p>
            <strong className="font-semibold">Keterangan:</strong> Pengumuman ini akan langsung diterbitkan ke beranda siswa dan notifikasi push otomatis dikirim ke gawai mereka.
          </p>
        </div>

        {/* Sticky Bottom Action: Publikasikan */}
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent pt-6">
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
          >
            <span>Publikasikan</span>
          </button>
        </div>
      </form>
    </div>
  );
};
