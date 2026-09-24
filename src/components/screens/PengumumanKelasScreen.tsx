import React, { useState } from 'react';
import { Volume2, Plus, X, Share2, Calendar, UserCheck, Search, Megaphone, Tag, Check, Filter } from 'lucide-react';
import { AnnouncementItem, UserRole, ScreenId } from '../../types';

interface PengumumanKelasScreenProps {
  announcements: AnnouncementItem[];
  userRole: UserRole;
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
}

export const PengumumanKelasScreen: React.FC<PengumumanKelasScreenProps> = ({
  announcements,
  userRole,
  onNavigate,
  onBack,
}) => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementItem | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const canCreate = userRole === 'sekretaris' || userRole === 'wali_kelas';

  const categories = ['Semua', 'Kegiatan Kelas', 'Piket & Kebersihan', 'Akademik'];

  const filteredAnnouncements = announcements.filter((ann) => {
    const matchesCategory =
      activeCategory === 'Semua' || ann.category === activeCategory;
    const matchesSearch =
      ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.authorRole.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShare = (ann: AnnouncementItem) => {
    navigator.clipboard?.writeText?.(
      `*${ann.title}*\n${ann.date} • Oleh: ${ann.authorRole}\n\n${ann.content}\n\n_PiketKu - SMKN 24 Jakarta_`
    );
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Papan Pengumuman & Informasi Kelas
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Kanal resmi informasi kegiatan, akademik, dan piket Kelas XI RPL 1
          </p>
        </div>

        {canCreate && (
          <button
            onClick={() => onNavigate('buat-pengumuman')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm shadow-indigo-600/20 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Pengumuman Baru</span>
          </button>
        )}
      </div>

      {copiedToast && (
        <div className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-md text-center animate-fade-in flex items-center justify-center space-x-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Teks pengumuman berhasil disalin siap dibagikan ke WhatsApp!</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pengumuman..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Announcement Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAnnouncements.map((ann) => (
          <div
            key={ann.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Header Info */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {ann.category || 'Umum'}
                </span>
                <span className="text-[11px] text-slate-400 font-medium flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{ann.date}</span>
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {ann.title}
              </h3>

              {/* Excerpt */}
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                {ann.content}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-[11px] text-slate-600 font-medium">
                <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>{ann.authorRole}</span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAnnouncement(ann)}
                className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors"
              >
                Baca Lengkap
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl animate-fade-in space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
                {selectedAnnouncement.category || 'Informasi Resmi'}
              </span>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-slate-900 leading-snug">
                {selectedAnnouncement.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Diterbitkan pada {selectedAnnouncement.date} • Oleh {selectedAnnouncement.authorRole}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line border border-slate-100 max-h-80 overflow-y-auto font-medium">
              {selectedAnnouncement.content}
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => handleShare(selectedAnnouncement)}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center space-x-2"
              >
                <Share2 className="w-4 h-4 text-emerald-600" />
                <span>Bagikan ke WhatsApp Kelas</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedAnnouncement(null)}
                className="py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
