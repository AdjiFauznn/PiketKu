import React from 'react';
import {
  Bell,
  Calendar,
  Users,
  Megaphone,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Clock,
  ArrowRight,
  CheckSquare,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { ScreenId, UserProfile, DutyTask } from '../../types';

interface HomeScreenProps {
  user: UserProfile;
  dutyTasks: DutyTask[];
  unreadNotifsCount: number;
  onNavigate: (screen: ScreenId) => void;
  onToggleTask?: (taskId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  dutyTasks,
  unreadNotifsCount,
  onNavigate,
  onToggleTask,
}) => {
  const completedTasks = dutyTasks.filter((t) => t.status === 'selesai').length;
  const totalTasks = dutyTasks.length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Banner / Welcome Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-indigo-500/20">
            {user.avatar || 'AP'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Selamat Datang, {user.name}
              </h1>
              <span className="text-xl">👋</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Kelas {user.class} • {user.school} • Semester Genap T.A 2025/2026
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 self-start md:self-auto">
          <button
            onClick={() => onNavigate('absensi-siswa')}
            className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-all flex items-center space-x-2 border border-emerald-200/60"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Presensi Saya: Hadir</span>
          </button>
          <button
            onClick={() => onNavigate('jadwal-piket')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm shadow-indigo-600/20 flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Jadwal Piket</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Stat 1 */}
        <div
          onClick={() => onNavigate('absensi-siswa')}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/70 shadow-xs hover:border-emerald-300 hover:shadow-sm cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Presensi Kelas
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            32 <span className="text-sm font-semibold text-slate-400">/ 36</span>
          </div>
          <p className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>89% Kehadiran Siswa Hari Ini</span>
          </p>
        </div>

        {/* Stat 2 */}
        <div
          onClick={() => onNavigate('jadwal-piket')}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/70 shadow-xs hover:border-indigo-300 hover:shadow-sm cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Progress Piket
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {completionPercentage}%
          </div>
          <p className="text-[11px] font-semibold text-indigo-600 mt-1">
            {completedTasks} dari {totalTasks} tugas selesai
          </p>
        </div>

        {/* Stat 3 */}
        <div
          onClick={() => onNavigate('jadwal-piket')}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/70 shadow-xs hover:border-amber-300 hover:shadow-sm cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Petugas Hari Ini
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">
            Kel. Melati
          </div>
          <p className="text-[11px] font-semibold text-amber-600 mt-1 truncate">
            Abdie, Adjie, Gendruy, Arabika
          </p>
        </div>

        {/* Stat 4 */}
        <div
          onClick={() => onNavigate('pengumuman-kelas')}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/70 shadow-xs hover:border-rose-300 hover:shadow-sm cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Pengumuman
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Megaphone className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            3 Aktif
          </div>
          <p className="text-[11px] font-semibold text-rose-600 mt-1">
            1 Pengumuman dari Wali Kelas
          </p>
        </div>
      </div>

      {/* Main Multi-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Hero Banner + Tugas Kebersihan Hari Ini */}
        <div className="lg:col-span-8 space-y-6">
          {/* Hero Banner: Petugas Piket Hari Ini */}
          <div
            onClick={() => onNavigate('jadwal-piket')}
            className="rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 p-6 sm:p-7 text-white shadow-xl shadow-indigo-500/10 cursor-pointer hover:shadow-2xl hover:scale-[1.005] transition-all group"
          >
            <div className="flex items-center justify-between text-indigo-200 text-xs font-bold tracking-wider uppercase mb-3">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Piket Aktif Hari Ini</span>
              </span>
              <span className="bg-white/15 border border-white/20 px-3 py-1 rounded-full font-semibold text-white text-xs">
                Senin, 26 Jan 2026
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              Kelompok Melati (Piket Senin)
            </h2>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              {['Abdie Putra (Koord)', 'Adzie Tompel', 'Galih Gendut', 'Rafka Sudra', 'Indah Permata'].map((name, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl bg-white/10 text-white text-xs font-medium border border-white/10"
                >
                  {name}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-3">
                <div className="w-28 bg-white/20 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <span className="text-indigo-100 font-semibold">
                  {completedTasks} dari {totalTasks} tugas selesai ({completionPercentage}%)
                </span>
              </div>

              <div className="flex items-center space-x-1.5 text-white font-bold group-hover:translate-x-1 transition-transform">
                <span>Buka Rincian Tugas & Foto</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Interactive Checklist Tugas Kebersihan */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Daftar Tugas Piket Hari Ini
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Klik checkbox untuk menandai tugas yang telah diselesaikan
                </p>
              </div>
              <button
                onClick={() => onNavigate('jadwal-piket')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {dutyTasks.map((task) => {
                const isDone = task.status === 'selesai';
                return (
                  <div
                    key={task.id}
                    onClick={() => onToggleTask && onToggleTask(task.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isDone
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-slate-50/70 border-slate-200/70 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                          isDone
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'border-2 border-slate-300 bg-white'
                        }`}
                      >
                        {isDone && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                      </div>

                      <div>
                        <h4
                          className={`text-sm font-bold transition-all ${
                            isDone ? 'text-slate-500 line-through' : 'text-slate-900'
                          }`}
                        >
                          {task.taskName}
                        </h4>
                        <p className="text-[11px] text-slate-400 font-medium">
                          Ditugaskan kepada: <strong className="text-slate-600">{task.studentName}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          isDone
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {isDone ? 'Selesai' : 'Pending'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Menu Fitur Cepat + Ringkasan + Pengumuman Ticker */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Actions Grid */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-3.5">
              Menu Cepat Fitur Kelas
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onNavigate('jadwal-piket')}
                className="p-3.5 rounded-2xl bg-indigo-50/60 hover:bg-indigo-100 text-left border border-indigo-100 transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform shadow-xs">
                  <Calendar className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                  Jadwal Piket
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">5 Hari Kerja</p>
              </button>

              <button
                onClick={() => onNavigate('absensi-siswa')}
                className="p-3.5 rounded-2xl bg-emerald-50/60 hover:bg-emerald-100 text-left border border-emerald-100 transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform shadow-xs">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600">
                  Presensi Saya
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Input Kehadiran</p>
              </button>

              <button
                onClick={() => onNavigate('pengumuman-kelas')}
                className="p-3.5 rounded-2xl bg-amber-50/60 hover:bg-amber-100 text-left border border-amber-100 transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform shadow-xs">
                  <Megaphone className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600">
                  Pengumuman
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Info & Rapat</p>
              </button>

              <button
                onClick={() => onNavigate('notifikasi')}
                className="p-3.5 rounded-2xl bg-rose-50/60 hover:bg-rose-100 text-left border border-rose-100 transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform shadow-xs">
                  <Bell className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-rose-600">
                  Notifikasi
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {unreadNotifsCount} Baru
                </p>
              </button>
            </div>
          </div>

          {/* Pengumuman Highlight Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                Pengumuman Terbaru
              </h3>
              <button
                onClick={() => onNavigate('pengumuman-kelas')}
                className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700"
              >
                Selengkapnya
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/80 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-indigo-700">Wali Kelas</span>
                <span className="text-slate-400">26 Jan 2026</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">
                Pemeriksaan Rutin Kebersihan & Kerapian Ruang Kelas
              </h4>
              <p className="text-[11px] text-slate-600 line-clamp-2">
                Diharapkan regu piket hari Senin menyelesaikan tugas sebelum bel masuk pukul 07:00 WIB.
              </p>
              <button
                onClick={() => onNavigate('pengumuman-kelas')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 pt-1 flex items-center space-x-1"
              >
                <span>Baca Surat Edaran</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* School Contact / Class Officers Info Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-md space-y-3">
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Struktur Kelas XI RPL 1</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Wali Kelas</span>
                <span className="font-semibold text-white">Drs. Hendro Wibowo, M.Pd.</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Ketua Kelas</span>
                <span className="font-semibold text-white">Farhan Maulana</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Sekretaris</span>
                <span className="font-semibold text-white">Siti Nurhaliza</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
