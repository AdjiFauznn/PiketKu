import React from 'react';
import {
  Calendar,
  Users,
  Megaphone,
  ChevronRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  Sliders,
  CheckSquare,
  PlusCircle,
  FileSpreadsheet,
  ArrowRight,
} from 'lucide-react';
import { ScreenId, UserProfile, DutyTask, StudentAttendance, AnnouncementItem } from '../../types';

interface DashboardSekretarisScreenProps {
  user: UserProfile;
  dutyTasks: DutyTask[];
  attendanceList: StudentAttendance[];
  announcements: AnnouncementItem[];
  onNavigate: (screen: ScreenId) => void;
}

export const DashboardSekretarisScreen: React.FC<DashboardSekretarisScreenProps> = ({
  user,
  dutyTasks,
  attendanceList,
  announcements,
  onNavigate,
}) => {
  const hadirCount = attendanceList.filter((a) => a.status === 'hadir').length;
  const totalStudents = attendanceList.length;
  const completedTasks = dutyTasks.filter((t) => t.status === 'selesai').length;
  const totalTasks = dutyTasks.length;
  const dutyPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white font-black text-lg flex items-center justify-center shadow-md shadow-indigo-500/20">
            {user.avatar || 'SK'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Panel Sekretaris • {user.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
                Sekretaris Kelas
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Kelola absensi harian, rotasi jadwal piket, dan informasi kelas XI RPL 1
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate('kelola-absensi')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm shadow-emerald-600/20 flex items-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Isi Absensi Harian</span>
          </button>
          <button
            onClick={() => onNavigate('buat-pengumuman')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm shadow-indigo-600/20 flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Buat Pengumuman</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Siswa
            </span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {totalStudents} Siswa
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-1">
            Kelas XI RPL 1 Terdaftar
          </p>
        </div>

        <div
          onClick={() => onNavigate('kelola-absensi')}
          className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs cursor-pointer hover:border-emerald-300 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Kehadiran Hari Ini
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {hadirCount} <span className="text-sm font-semibold text-slate-400">/ {totalStudents}</span>
          </div>
          <p className="text-[11px] font-semibold text-emerald-600 mt-1">
            {Math.round((hadirCount / totalStudents) * 100)}% siswa tercatat hadir
          </p>
        </div>

        <div
          onClick={() => onNavigate('kelola-jadwal-piket')}
          className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs cursor-pointer hover:border-amber-300 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Piket Kelas
            </span>
            <Calendar className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {dutyPercentage}%
          </div>
          <p className="text-[11px] font-semibold text-amber-600 mt-1">
            {completedTasks} dari {totalTasks} tugas selesai
          </p>
        </div>

        <div
          onClick={() => onNavigate('pengumuman-kelas')}
          className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs cursor-pointer hover:border-rose-300 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Pengumuman Aktif
            </span>
            <Megaphone className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {announcements.length} Berita
          </div>
          <p className="text-[11px] font-semibold text-rose-600 mt-1">
            Informasi publikasi kelas
          </p>
        </div>
      </div>

      {/* Main Tools & Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 3 Big Feature Cards */}
        <div className="lg:col-span-8 space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Alat Pengelolaan & Administrasi Kelas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tool 1 */}
            <div
              onClick={() => onNavigate('kelola-jadwal-piket')}
              className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-indigo-300 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group space-y-4"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Kelola Jadwal Piket
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed font-medium">
                  Atur pembagian regu piket Senin sampai Jumat, tukar giliran, dan pantau penyelesaian tugas harian.
                </p>
              </div>
              <div className="text-xs font-bold text-indigo-600 flex items-center space-x-1">
                <span>Buka Pengaturan</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Tool 2 */}
            <div
              onClick={() => onNavigate('kelola-absensi')}
              className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group space-y-4"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <CheckSquare className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Kelola Absensi Siswa
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed font-medium">
                  Input kehadiran 36 siswa setiap pagi, tandai izin dan sakit, serta ekspor file rekap bulanan ke Excel/CSV.
                </p>
              </div>
              <div className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                <span>Input Presensi</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Tool 3 */}
            <div
              onClick={() => onNavigate('buat-pengumuman')}
              className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-amber-300 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group space-y-4"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Megaphone className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Buat Pengumuman Baru
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed font-medium">
                  Tulis maklumat resmi kelas, rincian iuran kas, atau edaran kegiatan sekolah langsung ke feed siswa.
                </p>
              </div>
              <div className="text-xs font-bold text-amber-600 flex items-center space-x-1">
                <span>Tulis Pengumuman</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Info Box: Catatan & SOP Sekretaris */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            SOP Sekretaris Kelas
          </h2>

          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-4">
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Panduan Tugas Rutin</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed font-medium">
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <span>Input data kehadiran kelas paling lambat pukul 07:30 WIB setiap hari sekolah.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <span>Periksa laporan piket kebersihan kelas sebelum bel masuk dan saat kepulangan.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <span>Kirimkan laporan harian kepada Wali Kelas (Drs. Hendro Wibowo, M.Pd.) untuk disahkan.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
