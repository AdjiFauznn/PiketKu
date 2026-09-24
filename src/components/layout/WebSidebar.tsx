import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Megaphone,
  Bell,
  CheckSquare,
  ShieldCheck,
  FileCheck,
  PlusCircle,
  Sliders,
  Sparkles,
  School,
  LogOut,
  ChevronRight,
  ClipboardList,
} from 'lucide-react';
import { ScreenId, UserRole, UserProfile } from '../../types';

interface WebSidebarProps {
  currentScreen: ScreenId;
  userRole: UserRole;
  user: UserProfile;
  unreadNotifsCount: number;
  onNavigate: (screen: ScreenId) => void;
  onSelectRole: (role: UserRole) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const WebSidebar: React.FC<WebSidebarProps> = ({
  currentScreen,
  userRole,
  user,
  unreadNotifsCount,
  onNavigate,
  onSelectRole,
  isOpenMobile,
  onCloseMobile,
}) => {
  const isOfficer = userRole === 'sekretaris' || userRole === 'wali_kelas';

  const handleNavClick = (screen: ScreenId) => {
    onNavigate(screen);
    onCloseMobile();
  };

  const navItemClass = (isActive: boolean) =>
    `w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
      isActive
        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20 font-bold'
        : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
    }`;

  const iconClass = (isActive: boolean) =>
    `w-4 h-4 transition-transform group-hover:scale-110 ${
      isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'
    }`;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 w-64 p-4 overflow-y-auto">
      {/* School & Class Badge */}
      <div className="p-3 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl mb-6 shadow-sm">
        <div className="flex items-center space-x-2 text-indigo-300 text-[11px] font-bold uppercase tracking-wider mb-1">
          <School className="w-3.5 h-3.5" />
          <span>SMKN 24 Jakarta</span>
        </div>
        <h3 className="text-base font-extrabold text-white">Kelas XI RPL 1</h3>
        <p className="text-[11px] text-indigo-200 mt-0.5">
          T.A. 2025/2026 • Semester Genap
        </p>
      </div>

      {/* Main Navigation */}
      <div className="space-y-6 flex-1">
        {/* Group: MENU UTAMA */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Menu Utama
          </p>
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick(userRole === 'sekretaris' ? 'dashboard-sekretaris' : userRole === 'wali_kelas' ? 'wali-kelas-dashboard' : 'home')}
              className={navItemClass(
                currentScreen === 'home' ||
                  currentScreen === 'dashboard-sekretaris' ||
                  currentScreen === 'wali-kelas-dashboard'
              )}
            >
              <div className="flex items-center space-x-3">
                <LayoutDashboard
                  className={iconClass(
                    currentScreen === 'home' ||
                      currentScreen === 'dashboard-sekretaris' ||
                      currentScreen === 'wali-kelas-dashboard'
                  )}
                />
                <span>Dashboard</span>
              </div>
              <span className="text-[10px] opacity-70">
                {userRole === 'siswa' ? 'Siswa' : userRole === 'sekretaris' ? 'Sekretaris' : 'Wali'}
              </span>
            </button>

            <button
              onClick={() => handleNavClick('jadwal-piket')}
              className={navItemClass(currentScreen === 'jadwal-piket')}
            >
              <div className="flex items-center space-x-3">
                <Calendar className={iconClass(currentScreen === 'jadwal-piket')} />
                <span>Jadwal & Tugas Piket</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </button>

            <button
              onClick={() => handleNavClick('absensi-siswa')}
              className={navItemClass(currentScreen === 'absensi-siswa')}
            >
              <div className="flex items-center space-x-3">
                <Users className={iconClass(currentScreen === 'absensi-siswa')} />
                <span>Presensi Siswa</span>
              </div>
            </button>

            <button
              onClick={() => handleNavClick('pengumuman-kelas')}
              className={navItemClass(currentScreen === 'pengumuman-kelas')}
            >
              <div className="flex items-center space-x-3">
                <Megaphone className={iconClass(currentScreen === 'pengumuman-kelas')} />
                <span>Pengumuman</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700">
                3
              </span>
            </button>

            <button
              onClick={() => handleNavClick('notifikasi')}
              className={navItemClass(currentScreen === 'notifikasi')}
            >
              <div className="flex items-center space-x-3">
                <Bell className={iconClass(currentScreen === 'notifikasi')} />
                <span>Notifikasi</span>
              </div>
              {unreadNotifsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                  {unreadNotifsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Group: ALAT PENGURUS & WALI KELAS */}
        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Pengurus & Guru
            </p>
            {!isOfficer && (
              <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                Beralih Akun
              </span>
            )}
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                if (userRole === 'siswa') onSelectRole('sekretaris');
                handleNavClick('kelola-jadwal-piket');
              }}
              className={navItemClass(currentScreen === 'kelola-jadwal-piket')}
            >
              <div className="flex items-center space-x-3">
                <Sliders className={iconClass(currentScreen === 'kelola-jadwal-piket')} />
                <span>Kelola Jadwal Piket</span>
              </div>
            </button>

            <button
              onClick={() => {
                if (userRole === 'siswa') onSelectRole('sekretaris');
                handleNavClick('kelola-absensi');
              }}
              className={navItemClass(currentScreen === 'kelola-absensi')}
            >
              <div className="flex items-center space-x-3">
                <CheckSquare className={iconClass(currentScreen === 'kelola-absensi')} />
                <span>Kelola Absensi Harian</span>
              </div>
            </button>

            <button
              onClick={() => {
                if (userRole === 'siswa') onSelectRole('sekretaris');
                handleNavClick('buat-pengumuman');
              }}
              className={navItemClass(currentScreen === 'buat-pengumuman')}
            >
              <div className="flex items-center space-x-3">
                <PlusCircle className={iconClass(currentScreen === 'buat-pengumuman')} />
                <span>Buat Pengumuman</span>
              </div>
            </button>

            <button
              onClick={() => {
                if (userRole !== 'wali_kelas') onSelectRole('wali_kelas');
                handleNavClick('wali-kelas-dashboard');
              }}
              className={navItemClass(currentScreen === 'wali-kelas-dashboard')}
            >
              <div className="flex items-center space-x-3">
                <ShieldCheck className={iconClass(currentScreen === 'wali-kelas-dashboard')} />
                <span>Validasi Wali Kelas</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600">Sah</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer / User Role Info */}
      <div className="pt-4 mt-4 border-t border-slate-100">
        <div className="p-3 bg-slate-50 rounded-xl flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
            {user.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
            <p className="text-[10px] text-slate-500 truncate capitalize font-medium">
              {userRole.replace('_', ' ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block shrink-0 sticky top-16 h-[calc(100vh-4rem)]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 w-72 h-full bg-white shadow-xl animate-fade-in flex flex-col">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
