import React, { useState, useEffect } from 'react';
import {
  ScreenId,
  UserRole,
  UserProfile,
  DutyTask,
  DutyGroupSchedule,
  StudentAttendance,
  AnnouncementItem,
  NotificationItem,
  AttendanceStatus,
} from './types';
import {
  INITIAL_USERS,
  INITIAL_DUTY_TASKS,
  INITIAL_DUTY_GROUPS,
  INITIAL_STUDENTS_ATTENDANCE,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';
import { StatusBar } from './components/StatusBar';
import { BottomNavBar } from './components/BottomNavBar';
import { PrototypeBar } from './components/PrototypeBar';
import { WebHeader } from './components/layout/WebHeader';
import { WebSidebar } from './components/layout/WebSidebar';
import { LoginScreen } from './components/screens/LoginScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { JadwalPiketScreen } from './components/screens/JadwalPiketScreen';
import { AbsensiSiswaScreen } from './components/screens/AbsensiSiswaScreen';
import { PengumumanKelasScreen } from './components/screens/PengumumanKelasScreen';
import { NotifikasiScreen } from './components/screens/NotifikasiScreen';
import { DashboardSekretarisScreen } from './components/screens/DashboardSekretarisScreen';
import { KelolaJadwalPiketScreen } from './components/screens/KelolaJadwalPiketScreen';
import { KelolaAbsensiScreen } from './components/screens/KelolaAbsensiScreen';
import { BuatPengumumanScreen } from './components/screens/BuatPengumumanScreen';
import { WaliKelasScreen } from './components/screens/WaliKelasScreen';

export default function App() {
  // Screen & Navigation
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [userRole, setUserRole] = useState<UserRole>('siswa');
  // Default to false so it is a full, real website!
  const [isDeviceFrame, setIsDeviceFrame] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Application Data States (persisted to localStorage)
  const [dutyTasks, setDutyTasks] = useState<DutyTask[]>(() => {
    const saved = localStorage.getItem('piketku_duty_tasks');
    return saved ? JSON.parse(saved) : INITIAL_DUTY_TASKS;
  });

  const [dutyGroups, setDutyGroups] = useState<DutyGroupSchedule[]>(() => {
    const saved = localStorage.getItem('piketku_duty_groups');
    return saved ? JSON.parse(saved) : INITIAL_DUTY_GROUPS;
  });

  const [attendanceList, setAttendanceList] = useState<StudentAttendance[]>(() => {
    const saved = localStorage.getItem('piketku_attendance');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS_ATTENDANCE;
  });

  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(() => {
    const saved = localStorage.getItem('piketku_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('piketku_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Current logged in user object
  const currentUser: UserProfile = INITIAL_USERS[userRole] || INITIAL_USERS.siswa;

  // Persist state updates
  useEffect(() => {
    localStorage.setItem('piketku_duty_tasks', JSON.stringify(dutyTasks));
  }, [dutyTasks]);

  useEffect(() => {
    localStorage.setItem('piketku_duty_groups', JSON.stringify(dutyGroups));
  }, [dutyGroups]);

  useEffect(() => {
    localStorage.setItem('piketku_attendance', JSON.stringify(attendanceList));
  }, [attendanceList]);

  useEffect(() => {
    localStorage.setItem('piketku_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('piketku_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Unread notifications count
  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  // Handlers
  const handleLogin = (role: UserRole, _username: string) => {
    setUserRole(role);
    if (role === 'sekretaris') {
      setCurrentScreen('dashboard-sekretaris');
    } else if (role === 'wali_kelas') {
      setCurrentScreen('wali-kelas-dashboard');
    } else {
      setCurrentScreen('home');
    }
  };

  const handleRoleSwitch = (role: UserRole) => {
    setUserRole(role);
    if (role === 'sekretaris') {
      setCurrentScreen('dashboard-sekretaris');
    } else if (role === 'wali_kelas') {
      setCurrentScreen('wali-kelas-dashboard');
    } else {
      setCurrentScreen('home');
    }
  };

  const handleToggleTask = (taskId: string) => {
    setDutyTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextStatus = t.status === 'selesai' ? 'pending' : 'selesai';
          const nextCompletedAt = nextStatus === 'selesai' ? '07:12' : undefined;

          // Push a notification if task was marked done
          if (nextStatus === 'selesai') {
            const newNotif: NotificationItem = {
              id: 'notif-' + Date.now(),
              title: `Tugas Selesai: ${t.taskName}`,
              message: `${t.studentName} telah menyelesaikan tugas piket: ${t.taskName}.`,
              timeAgo: 'Baru saja',
              type: 'task',
              isRead: false,
            };
            setNotifications((prevN) => [newNotif, ...prevN]);
          }

          return { ...t, status: nextStatus, completedAt: nextCompletedAt };
        }
        return t;
      })
    );
  };

  const handleUpdateAttendance = (studentId: string, status: AttendanceStatus) => {
    setAttendanceList((prev) =>
      prev.map((item) => (item.id === studentId ? { ...item, status } : item))
    );
  };

  const handleMarkAllHadir = () => {
    setAttendanceList((prev) => prev.map((item) => ({ ...item, status: 'hadir' })));
  };

  const handleSaveAttendance = () => {
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      title: 'Rekap Absensi Harian Disimpan',
      message: 'Sekretaris kelas telah menyimpan dan mengirimkan rekap absensi hari ini ke Wali Kelas.',
      timeAgo: 'Baru saja',
      type: 'attendance',
      isRead: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleAddScheduleGroup = (newGroup: Omit<DutyGroupSchedule, 'id'>) => {
    const id = 'group-' + Date.now();
    setDutyGroups((prev) => [...prev, { ...newGroup, id }]);
  };

  const handleUpdateScheduleGroup = (updatedGroup: DutyGroupSchedule) => {
    setDutyGroups((prev) =>
      prev.map((g) => (g.id === updatedGroup.id ? updatedGroup : g))
    );
  };

  const handleDeleteScheduleGroup = (groupId: string) => {
    setDutyGroups((prev) => prev.filter((g) => g.id !== groupId));
  };

  const handlePublishAnnouncement = (ann: Omit<AnnouncementItem, 'id'>) => {
    const newAnn: AnnouncementItem = {
      ...ann,
      id: 'ann-' + Date.now(),
    };
    setAnnouncements((prev) => [newAnn, ...prev]);

    // Push notification to all
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      title: `Pengumuman Baru: ${ann.title}`,
      message: ann.content.slice(0, 80) + '...',
      timeAgo: 'Baru saja',
      type: 'announcement',
      isRead: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    setCurrentScreen('pengumuman-kelas');
  };

  const handleMarkAllNotifsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (notif: NotificationItem) => {
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
    );

    // Route based on notification type
    if (notif.type === 'duty' || notif.type === 'task') {
      setCurrentScreen('jadwal-piket');
    } else if (notif.type === 'attendance') {
      if (userRole === 'sekretaris') {
        setCurrentScreen('kelola-absensi');
      } else {
        setCurrentScreen('absensi-siswa');
      }
    } else if (notif.type === 'announcement') {
      setCurrentScreen('pengumuman-kelas');
    }
  };

  const handleResetData = () => {
    localStorage.removeItem('piketku_duty_tasks');
    localStorage.removeItem('piketku_duty_groups');
    localStorage.removeItem('piketku_attendance');
    localStorage.removeItem('piketku_announcements');
    localStorage.removeItem('piketku_notifications');

    setDutyTasks(INITIAL_DUTY_TASKS);
    setDutyGroups(INITIAL_DUTY_GROUPS);
    setAttendanceList(INITIAL_STUDENTS_ATTENDANCE);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCurrentScreen('home');
  };

  const getHomeScreenForRole = (): ScreenId => {
    if (userRole === 'sekretaris') return 'dashboard-sekretaris';
    if (userRole === 'wali_kelas') return 'wali-kelas-dashboard';
    return 'home';
  };

  // Render the core active screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;

      case 'home':
        return (
          <HomeScreen
            user={currentUser}
            dutyTasks={dutyTasks}
            unreadNotifsCount={unreadNotifsCount}
            onNavigate={setCurrentScreen}
            onToggleTask={handleToggleTask}
          />
        );

      case 'jadwal-piket':
        return (
          <JadwalPiketScreen
            tasks={dutyTasks}
            onToggleTask={handleToggleTask}
            onBack={() => setCurrentScreen(getHomeScreenForRole())}
          />
        );

      case 'absensi-siswa':
        return (
          <AbsensiSiswaScreen
            user={currentUser}
            onBack={() => setCurrentScreen(getHomeScreenForRole())}
          />
        );

      case 'pengumuman-kelas':
        return (
          <PengumumanKelasScreen
            announcements={announcements}
            userRole={userRole}
            onNavigate={setCurrentScreen}
            onBack={() => setCurrentScreen(getHomeScreenForRole())}
          />
        );

      case 'notifikasi':
        return (
          <NotifikasiScreen
            notifications={notifications}
            onMarkAllRead={handleMarkAllNotifsRead}
            onNotificationClick={handleNotificationClick}
            onBack={() => setCurrentScreen(getHomeScreenForRole())}
          />
        );

      case 'dashboard-sekretaris':
        return (
          <DashboardSekretarisScreen
            user={INITIAL_USERS.sekretaris}
            dutyTasks={dutyTasks}
            attendanceList={attendanceList}
            announcements={announcements}
            onNavigate={setCurrentScreen}
          />
        );

      case 'kelola-jadwal-piket':
        return (
          <KelolaJadwalPiketScreen
            groups={dutyGroups}
            onAddGroup={handleAddScheduleGroup}
            onUpdateGroup={handleUpdateScheduleGroup}
            onDeleteGroup={handleDeleteScheduleGroup}
            onBack={() => setCurrentScreen(getHomeScreenForRole())}
          />
        );

      case 'kelola-absensi':
        return (
          <KelolaAbsensiScreen
            attendanceList={attendanceList}
            onUpdateAttendance={handleUpdateAttendance}
            onMarkAllHadir={handleMarkAllHadir}
            onSave={handleSaveAttendance}
            onBack={() => setCurrentScreen(getHomeScreenForRole())}
          />
        );

      case 'buat-pengumuman':
        return (
          <BuatPengumumanScreen
            user={currentUser}
            onSubmit={handlePublishAnnouncement}
            onBack={() => setCurrentScreen(getHomeScreenForRole())}
          />
        );

      case 'wali-kelas-dashboard':
        return (
          <WaliKelasScreen
            user={INITIAL_USERS.wali_kelas}
            dutyTasks={dutyTasks}
            attendanceList={attendanceList}
            onNavigate={setCurrentScreen}
          />
        );

      default:
        return (
          <HomeScreen
            user={currentUser}
            dutyTasks={dutyTasks}
            unreadNotifsCount={unreadNotifsCount}
            onNavigate={setCurrentScreen}
            onToggleTask={handleToggleTask}
          />
        );
    }
  };

  // If on login screen, render full screen directly
  if (currentScreen === 'login') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900">
        <LoginScreen onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900">
      {/* Top Prototype & Testing Bar */}
      <PrototypeBar
        currentScreen={currentScreen}
        userRole={userRole}
        isDeviceFrame={isDeviceFrame}
        onToggleFrame={() => setIsDeviceFrame(!isDeviceFrame)}
        onSelectScreen={setCurrentScreen}
        onSelectRole={handleRoleSwitch}
        onResetData={handleResetData}
      />

      {isDeviceFrame ? (
        /* Mobile Device Frame Mockup Simulator (when user specifically wants to test mobile bezel) */
        <main className="flex-1 flex items-center justify-center p-4 md:p-6 bg-slate-900 overflow-hidden">
          <div className="relative w-full max-w-[400px] h-[844px] max-h-[92vh] bg-white rounded-[44px] shadow-2xl ring-12 ring-slate-800/90 ring-offset-4 ring-offset-slate-950 flex flex-col overflow-hidden transition-all">
            <StatusBar time="07:30" theme="light" />

            <div className="flex-1 flex flex-col min-h-0 relative overflow-y-auto bg-slate-50/40">
              {renderScreen()}
            </div>

            <BottomNavBar
              currentScreen={currentScreen}
              userRole={userRole}
              onNavigate={setCurrentScreen}
              unreadCount={unreadNotifsCount}
            />

            <div className="w-full bg-white pb-1 flex justify-center">
              <div className="w-32 h-1 bg-slate-300 rounded-full my-1" />
            </div>
          </div>
        </main>
      ) : (
        /* Full Desktop & Tablet Responsive Website Layout */
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Main Website Header */}
          <WebHeader
            user={currentUser}
            userRole={userRole}
            currentScreen={currentScreen}
            notifications={notifications}
            isDeviceFrame={isDeviceFrame}
            onToggleFrame={() => setIsDeviceFrame(true)}
            onSelectRole={handleRoleSwitch}
            onNavigate={setCurrentScreen}
            onMarkAllNotifsRead={handleMarkAllNotifsRead}
            onNotificationClick={handleNotificationClick}
            onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            isMobileMenuOpen={isMobileMenuOpen}
          />

          {/* Web Body with Sidebar + Main Viewport */}
          <div className="flex-1 flex max-w-7xl w-full mx-auto">
            {/* Sidebar Navigation */}
            <WebSidebar
              currentScreen={currentScreen}
              userRole={userRole}
              user={currentUser}
              unreadNotifsCount={unreadNotifsCount}
              onNavigate={setCurrentScreen}
              onSelectRole={handleRoleSwitch}
              isOpenMobile={isMobileMenuOpen}
              onCloseMobile={() => setIsMobileMenuOpen(false)}
            />

            {/* Main Page Viewport */}
            <main className="flex-1 min-w-0 bg-slate-50/60 overflow-y-auto min-h-[calc(100vh-4rem)]">
              {renderScreen()}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
