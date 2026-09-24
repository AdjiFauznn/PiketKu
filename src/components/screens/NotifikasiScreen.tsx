import React from 'react';
import { Volume2, Calendar, Users, CheckSquare, Bell, CheckCheck, ArrowRight } from 'lucide-react';
import { NotificationItem, ScreenId } from '../../types';

interface NotifikasiScreenProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onNotificationClick: (notif: NotificationItem) => void;
  onBack: () => void;
}

export const NotifikasiScreen: React.FC<NotifikasiScreenProps> = ({
  notifications,
  onMarkAllRead,
  onNotificationClick,
  onBack,
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return <Volume2 className="w-5 h-5 text-indigo-600" />;
      case 'duty':
        return <Calendar className="w-5 h-5 text-indigo-600" />;
      case 'attendance':
        return <Users className="w-5 h-5 text-emerald-600" />;
      case 'task':
      default:
        return <CheckSquare className="w-5 h-5 text-indigo-600" />;
    }
  };

  const getIconBg = (type: string) => {
    if (type === 'attendance') return 'bg-emerald-50 text-emerald-600';
    return 'bg-indigo-50 text-indigo-600';
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Pusat Notifikasi & Aktivitas Kelas
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Riwayat pembaruan tugas piket, presensi, dan pengumuman wali kelas
          </p>
        </div>

        <button
          onClick={onMarkAllRead}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-indigo-600 text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Tandai Semua Dibaca</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-2 sm:p-4 shadow-xs divide-y divide-slate-100">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => onNotificationClick(notif)}
            className={`p-4 rounded-2xl cursor-pointer transition-all flex items-start space-x-4 ${
              notif.isRead
                ? 'hover:bg-slate-50'
                : 'bg-indigo-50/40 hover:bg-indigo-50/70'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${getIconBg(
                notif.type
              )}`}
            >
              {getIcon(notif.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 truncate">
                  {notif.title}
                </h3>
                <span className="text-[11px] text-slate-400 font-medium shrink-0 ml-2">
                  {notif.timeAgo}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {notif.message}
              </p>
            </div>

            {!notif.isRead && (
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 mt-2 shrink-0 ring-2 ring-white" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
