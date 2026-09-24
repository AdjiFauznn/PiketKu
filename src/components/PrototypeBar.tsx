import React from 'react';
import {
  Smartphone,
  Monitor,
  RotateCcw,
  User,
  ShieldCheck,
  ClipboardList,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { ScreenId, UserRole } from '../types';

interface PrototypeBarProps {
  currentScreen: ScreenId;
  userRole: UserRole;
  isDeviceFrame: boolean;
  onToggleFrame: () => void;
  onSelectScreen: (screen: ScreenId) => void;
  onSelectRole: (role: UserRole) => void;
  onResetData: () => void;
}

const SCREENS_LIST: { id: ScreenId; label: string; group: string }[] = [
  { id: 'login', label: '1. piketku-login (Halaman Masuk)', group: 'Auth' },
  { id: 'home', label: '2. piketku-home (Beranda Siswa)', group: 'Siswa' },
  { id: 'jadwal-piket', label: '3. piketku-jadwal-piket (Tugas Harian)', group: 'Siswa' },
  { id: 'absensi-siswa', label: '4. piketku-absensi-siswa (Presensi Saya)', group: 'Siswa' },
  { id: 'pengumuman-kelas', label: '5. piketku-pengumuman-kelas (Daftar)', group: 'Siswa' },
  { id: 'notifikasi', label: '6. piketku-notifikasi (Aktivitas Kelas)', group: 'Umum' },
  { id: 'dashboard-sekretaris', label: '7. dashboard-sekretaris (Pengurus)', group: 'Sekretaris' },
  { id: 'kelola-jadwal-piket', label: '8. kelola-jadwal-piket (Atur Hari)', group: 'Sekretaris' },
  { id: 'kelola-absensi', label: '9. kelola-absensi (Rekap Kelas)', group: 'Sekretaris' },
  { id: 'buat-pengumuman', label: '10. buat-pengumuman (Form Rilis)', group: 'Sekretaris' },
  { id: 'wali-kelas-dashboard', label: '11. Pengesahan Wali Kelas (Pak Wal)', group: 'Wali Kelas' },
];

export const PrototypeBar: React.FC<PrototypeBarProps> = ({
  currentScreen,
  userRole,
  isDeviceFrame,
  onToggleFrame,
  onSelectScreen,
  onSelectRole,
  onResetData,
}) => {
  return (
    <header className="w-full bg-slate-900 border-b border-slate-800 text-white px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs z-50 select-none shadow-md">
      {/* Brand & App Info */}
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center font-bold text-white text-xs">
          ✦
        </div>
        <span className="font-bold text-white tracking-tight">PiketKu</span>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          SMKN 24 Jakarta
        </span>
      </div>

      {/* Screen Navigator Dropdown */}
      <div className="flex items-center space-x-1.5">
        <Layers className="w-3.5 h-3.5 text-indigo-400" />
        <select
          value={currentScreen}
          onChange={(e) => onSelectScreen(e.target.value as ScreenId)}
          className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          {SCREENS_LIST.map((screen) => (
            <option key={screen.id} value={screen.id}>
              {screen.label}
            </option>
          ))}
        </select>
      </div>

      {/* Controls: Role Selector + Device Frame Toggle + Reset */}
      <div className="flex items-center space-x-2">
        {/* Quick Role Switcher */}
        <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
          <button
            onClick={() => onSelectRole('siswa')}
            title="Masuk sebagai Siswa"
            className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
              userRole === 'siswa'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Siswa
          </button>
          <button
            onClick={() => onSelectRole('sekretaris')}
            title="Masuk sebagai Sekretaris Kelas"
            className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
              userRole === 'sekretaris'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sekretaris
          </button>
          <button
            onClick={() => onSelectRole('wali_kelas')}
            title="Masuk sebagai Wali Kelas"
            className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
              userRole === 'wali_kelas'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Wali Kelas
          </button>
        </div>

        {/* Device Frame Switcher */}
        <button
          onClick={onToggleFrame}
          title={isDeviceFrame ? 'Beralih ke Layar Penuh' : 'Beralih ke Frame Mockup HP'}
          className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 transition-colors flex items-center space-x-1"
        >
          {isDeviceFrame ? (
            <>
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[10px]">Layar Penuh</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden md:inline text-[10px]">Frame HP</span>
            </>
          )}
        </button>

        {/* Reset Data Button */}
        <button
          onClick={onResetData}
          title="Reset Data Semula Sesuai Mockup"
          className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
