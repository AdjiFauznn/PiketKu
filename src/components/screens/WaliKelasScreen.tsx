import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  Calendar,
  Award,
  FileCheck,
  Send,
  Check,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Star,
  ClipboardList,
} from 'lucide-react';
import { ScreenId, UserProfile, DutyTask, StudentAttendance } from '../../types';

interface WaliKelasScreenProps {
  user: UserProfile;
  dutyTasks: DutyTask[];
  attendanceList: StudentAttendance[];
  onNavigate: (screen: ScreenId) => void;
}

export const WaliKelasScreen: React.FC<WaliKelasScreenProps> = ({
  user,
  dutyTasks,
  attendanceList,
  onNavigate,
}) => {
  const [isVerified, setIsVerified] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cleanlinessScore, setCleanlinessScore] = useState(5);

  const hadirCount = attendanceList.filter((a) => a.status === 'hadir').length;
  const totalStudents = attendanceList.length;
  const completedTasks = dutyTasks.filter((t) => t.status === 'selesai').length;

  const handleVerify = () => {
    setIsVerified(true);
    setToastMessage('Presensi hari ini berhasil disahkan dengan tanda tangan digital Wali Kelas! ✍️');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-md flex items-center justify-between animate-fade-in">
          <span>{toastMessage}</span>
          <Check className="w-4 h-4 text-emerald-400" />
        </div>
      )}

      {/* Top Banner Profile for Wali Kelas */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-900 text-white font-black text-lg flex items-center justify-center shadow-md shadow-indigo-900/20">
            {user.avatar || 'HW'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {user.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Wali Kelas XI RPL 1</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              NIP: {user.nisn} • {user.school}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate('buat-pengumuman')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm shadow-indigo-600/20 flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Instruksi Resmi</span>
          </button>
        </div>
      </div>

      {/* Desktop 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Verification & Cleanliness Assessment */}
        <div className="lg:col-span-7 space-y-6">
          {/* Verification Status Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between text-xs text-indigo-200">
              <span className="font-bold uppercase tracking-wider">
                Pengesahan Presensi Harian Digital
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-full font-semibold text-white">
                Senin, 26 Jan 2026
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {isVerified ? 'Telah Disahkan & Terverifikasi' : 'Menunggu Pengesahan Wali Kelas'}
              </h2>
              <p className="text-xs sm:text-sm text-indigo-200 mt-2 leading-relaxed">
                {isVerified
                  ? 'Tanda tangan digital tercatat otomatis pada pukul 07:25 WIB oleh Drs. Hendro Wibowo, M.Pd. Rekap absensi telah terkunci dan tersinkronisasi ke kurikulum sekolah.'
                  : 'Sekretaris kelas telah menyelesaikan input kehadiran 36 siswa. Silakan periksa rincian data dan sahkan dokumen ini.'}
              </p>
            </div>

            <div className="pt-3 border-t border-white/15 flex flex-wrap items-center gap-3">
              {!isVerified ? (
                <button
                  onClick={handleVerify}
                  className="py-2.5 px-5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs shadow-md flex items-center space-x-2 transition-all"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Sahkan & Tanda Tangani Digital</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2 text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/40 px-3.5 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Status: Sah & Ditandatangani</span>
                </div>
              )}

              <button
                onClick={() => onNavigate('kelola-absensi')}
                className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all border border-white/10"
              >
                Buka Data Presensi Siswa
              </button>
            </div>
          </div>

          {/* Cleanliness Rating Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Penilaian Kerapian & Kebersihan Ruang Kelas
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Evaluasi kinerja regu piket hari ini (Kelompok Melati)
                </p>
              </div>

              <div className="flex items-center space-x-1.5 bg-amber-50 px-3 py-1.5 rounded-2xl border border-amber-100">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setCleanlinessScore(star);
                      setToastMessage(`Skor kebersihan kelas diberikan: ${star} Bintang ⭐`);
                      setTimeout(() => setToastMessage(null), 2500);
                    }}
                    className={`text-2xl transition-transform hover:scale-125 active:scale-95 ${
                      star <= cleanlinessScore ? 'text-amber-400' : 'text-slate-200'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 leading-relaxed font-medium">
              Catatan Wali Kelas: Kelas dalam kondisi bersih, papan tulis bersih, lantai tersapu dengan rapi. Nilai kebersihan saat ini: <strong className="text-amber-600">{cleanlinessScore} dari 5 Bintang</strong>.
            </p>
          </div>
        </div>

        {/* Right Column (5 cols): Quick Stats & Class Shortcuts */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => onNavigate('kelola-absensi')}
              className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs cursor-pointer hover:border-emerald-300 hover:shadow-sm transition-all"
            >
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Kehadiran
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1 tabular-nums">
                {Math.round((hadirCount / totalStudents) * 100)}%
              </div>
              <p className="text-[11px] text-emerald-600 font-bold mt-0.5">
                {hadirCount} / {totalStudents} Siswa Hadir
              </p>
            </div>

            <div
              onClick={() => onNavigate('jadwal-piket')}
              className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs cursor-pointer hover:border-indigo-300 hover:shadow-sm transition-all"
            >
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Tugas Piket
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1 tabular-nums">
                {completedTasks} / {dutyTasks.length}
              </div>
              <p className="text-[11px] text-indigo-600 font-bold mt-0.5">
                Tugas Kebersihan Tuntas
              </p>
            </div>
          </div>

          {/* Quick Actions List */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Menu Cepat Wali Kelas
            </h3>

            <button
              onClick={() => onNavigate('kelola-absensi')}
              className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-between transition-all text-left group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    Periksa Rekap Siswa Izin & Sakit
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">4 siswa tidak hadir hari ini</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onNavigate('kelola-jadwal-piket')}
              className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-between transition-all text-left group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    Monitoring Jadwal Piket Mingguan
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Rotasi regu kebersihan kelas</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onNavigate('buat-pengumuman')}
              className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-between transition-all text-left group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    Publikasi Surat Edaran Wali Kelas
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Terkirim langsung ke beranda siswa</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
