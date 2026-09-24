import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Search,
  Sparkles,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  Smartphone,
  Monitor,
  LogOut,
  ChevronDown,
  CheckCheck,
  CheckCircle2,
  Volume2,
  Users,
  CheckSquare,
  Menu,
  X,
} from 'lucide-react';
import { ScreenId, UserRole, UserProfile, NotificationItem } from '../../types';

interface WebHeaderProps {
  user: UserProfile;
  userRole: UserRole;
  currentScreen: ScreenId;
  notifications: NotificationItem[];
  isDeviceFrame: boolean;
  onToggleFrame: () => void;
  onSelectRole: (role: UserRole) => void;
  onNavigate: (screen: ScreenId) => void;
  onMarkAllNotifsRead: () => void;
  onNotificationClick: (notif: NotificationItem) => void;
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
  onSearch?: (query: string) => void;
}

export const WebHeader: React.FC<WebHeaderProps> = ({
  user,
  userRole,
  currentScreen,
  notifications,
  isDeviceFrame,
  onToggleFrame,
  onSelectRole,
  onNavigate,
  onMarkAllNotifsRead,
  onNotificationClick,
  onMobileMenuToggle,
  isMobileMenuOpen,
  onSearch,
}) => {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'wali_kelas':
        return 'Wali Kelas';
      case 'sekretaris':
        return 'Sekretaris Kelas';
      default:
        return 'Siswa';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div
            onClick={() => onNavigate(userRole === 'sekretaris' ? 'dashboard-sekretaris' : userRole === 'wali_kelas' ? 'wali-kelas-dashboard' : 'home')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-base font-extrabold text-slate-900 tracking-tight">
                  PiketKu
                </span>
                <span className="hidden sm:inline px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  SMKN 24
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden md:block">
                Portal Manajemen Piket & Informasi Kelas
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search Bar (Desktop) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Cari siswa, jadwal piket, atau pengumuman..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all font-medium"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Date/Calendar Indicator */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-600 text-xs font-medium">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            <span>Senin, 26 Jan 2026</span>
            <span className="text-slate-300">•</span>
            <span className="text-indigo-600 font-semibold">XI RPL 1</span>
          </div>

          {/* Device View Toggle: Website vs Simulator HP */}
          <button
            onClick={onToggleFrame}
            title={isDeviceFrame ? 'Beralih ke Tampilan Website Desktop' : 'Pratinjau Mode HP (Simulator)'}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all border ${
              isDeviceFrame
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
          >
            {isDeviceFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Ke Website Penuh</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Pratinjau HP</span>
              </>
            )}
          </button>

          {/* Notification Center Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="relative w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              aria-label="Notifikasi"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center ring-2 ring-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown Menu */}
            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 animate-fade-in">
                <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-xs text-slate-900">Notifikasi</span>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-rose-50 text-rose-600 text-[10px] font-bold">
                        {unreadCount} baru
                      </span>
                    )}
                  </div>
                  <button
                    onClick={onMarkAllNotifsRead}
                    className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
                  >
                    <CheckCheck className="w-3 h-3" />
                    <span>Tandai dibaca</span>
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-50 px-2 py-1">
                  {notifications.slice(0, 5).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        onNotificationClick(notif);
                        setShowNotifDropdown(false);
                      }}
                      className={`p-2.5 rounded-xl cursor-pointer transition-colors flex items-start space-x-2.5 ${
                        notif.isRead ? 'hover:bg-slate-50' : 'bg-indigo-50/40 hover:bg-indigo-50/70'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Bell className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {notif.title}
                          </p>
                          <span className="text-[10px] text-slate-400 ml-1">
                            {notif.timeAgo}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                          {notif.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 pt-2 border-t border-slate-100 text-center">
                  <button
                    onClick={() => {
                      onNavigate('notifikasi');
                      setShowNotifDropdown(false);
                    }}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    Lihat Semua Notifikasi →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role Switcher */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {user.avatar || 'AP'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {user.name.split(' ')[0]}
                </p>
                <p className="text-[10px] font-medium text-indigo-600">
                  {getRoleLabel(userRole)}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 animate-fade-in">
                <div className="px-4 pb-3 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{user.name}</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    NISN / NIP: {user.nisn}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {user.class} • {user.school}
                  </span>
                </div>

                <div className="p-2 space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                    Ganti Peran Pengguna
                  </p>

                  <button
                    onClick={() => {
                      onSelectRole('siswa');
                      setShowProfileDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                      userRole === 'siswa'
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>1. Siswa (Abdie Putra)</span>
                    {userRole === 'siswa' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>

                  <button
                    onClick={() => {
                      onSelectRole('sekretaris');
                      setShowProfileDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                      userRole === 'sekretaris'
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>2. Sekretaris Kelas</span>
                    {userRole === 'sekretaris' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>

                  <button
                    onClick={() => {
                      onSelectRole('wali_kelas');
                      setShowProfileDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                      userRole === 'wali_kelas'
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>3. Wali Kelas (Drs. Hendro)</span>
                    {userRole === 'wali_kelas' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>
                </div>

                <div className="pt-2 px-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      onNavigate('login');
                      setShowProfileDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center space-x-2 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar Akun (Halaman Masuk)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
