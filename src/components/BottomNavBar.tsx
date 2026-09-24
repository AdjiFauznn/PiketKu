import React from 'react';
import { Home, Calendar, Users, Megaphone } from 'lucide-react';
import { ScreenId, UserRole } from '../types';

interface BottomNavBarProps {
  currentScreen: ScreenId;
  userRole: UserRole;
  onNavigate: (screen: ScreenId) => void;
  unreadCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  userRole,
  onNavigate,
  unreadCount = 0,
}) => {
  const isHomeActive =
    currentScreen === 'home' ||
    currentScreen === 'dashboard-sekretaris' ||
    currentScreen === 'wali-kelas-dashboard';

  const isPiketActive =
    currentScreen === 'jadwal-piket' || currentScreen === 'kelola-jadwal-piket';

  const isAbsensiActive =
    currentScreen === 'absensi-siswa' || currentScreen === 'kelola-absensi';

  const isPengumumanActive =
    currentScreen === 'pengumuman-kelas' ||
    currentScreen === 'buat-pengumuman' ||
    currentScreen === 'notifikasi';

  const handleHomeClick = () => {
    if (userRole === 'sekretaris') {
      onNavigate('dashboard-sekretaris');
    } else if (userRole === 'wali_kelas') {
      onNavigate('wali-kelas-dashboard');
    } else {
      onNavigate('home');
    }
  };

  const handlePiketClick = () => {
    if (userRole === 'sekretaris') {
      onNavigate('kelola-jadwal-piket');
    } else {
      onNavigate('jadwal-piket');
    }
  };

  const handleAbsensiClick = () => {
    if (userRole === 'sekretaris' || userRole === 'wali_kelas') {
      onNavigate('kelola-absensi');
    } else {
      onNavigate('absensi-siswa');
    }
  };

  const handlePengumumanClick = () => {
    onNavigate('pengumuman-kelas');
  };

  return (
    <div className="w-full bg-white border-t border-slate-100 px-4 py-2 flex items-center justify-around select-none">
      {/* Tab: Beranda */}
      <button
        onClick={handleHomeClick}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
          isHomeActive
            ? 'text-indigo-600 font-semibold'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Home className={`w-5 h-5 ${isHomeActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[11px] mt-1">Beranda</span>
        {isHomeActive && (
          <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-0.5" />
        )}
      </button>

      {/* Tab: Piket */}
      <button
        onClick={handlePiketClick}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
          isPiketActive
            ? 'text-indigo-600 font-semibold'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Calendar className={`w-5 h-5 ${isPiketActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[11px] mt-1">Piket</span>
        {isPiketActive && (
          <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-0.5" />
        )}
      </button>

      {/* Tab: Absensi */}
      <button
        onClick={handleAbsensiClick}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
          isAbsensiActive
            ? 'text-indigo-600 font-semibold'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Users className={`w-5 h-5 ${isAbsensiActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[11px] mt-1">Absensi</span>
        {isAbsensiActive && (
          <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-0.5" />
        )}
      </button>

      {/* Tab: Pengumuman */}
      <button
        onClick={handlePengumumanClick}
        className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
          isPengumumanActive
            ? 'text-indigo-600 font-semibold'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <div className="relative">
          <Megaphone
            className={`w-5 h-5 ${isPengumumanActive ? 'stroke-[2.5]' : 'stroke-2'}`}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white" />
          )}
        </div>
        <span className="text-[11px] mt-1">Pengumuman</span>
        {isPengumumanActive && (
          <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-0.5" />
        )}
      </button>
    </div>
  );
};
