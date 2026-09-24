export type UserRole = 'siswa' | 'sekretaris' | 'wali_kelas';

export type ScreenId =
  | 'login'
  | 'home'
  | 'jadwal-piket'
  | 'absensi-siswa'
  | 'pengumuman-kelas'
  | 'notifikasi'
  | 'dashboard-sekretaris'
  | 'kelola-jadwal-piket'
  | 'kelola-absensi'
  | 'buat-pengumuman'
  | 'wali-kelas-dashboard';

export interface UserProfile {
  id: string;
  name: string;
  nisn: string;
  role: UserRole;
  roleTitle: string;
  class: string;
  school: string;
  avatar: string;
}

export type AttendanceStatus = 'hadir' | 'izin' | 'sakit' | 'alpa';

export interface StudentAttendance {
  id: string;
  name: string;
  nisn: string;
  status: AttendanceStatus;
  notes?: string;
}

export type TaskStatus = 'selesai' | 'pending';

export interface DutyTask {
  id: string;
  studentName: string;
  taskName: string;
  status: TaskStatus;
  day: string;
  completedAt?: string;
  photoUrl?: string;
}

export interface DutyGroupSchedule {
  id: string;
  dayName: string;
  groupName: string;
  memberCount: number;
  members: string[];
}

export interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  authorRole: string;
  authorName: string;
  date: string;
  category: 'Kegiatan Kelas' | 'Piket & Kebersihan' | 'Akademik' | 'OSIS SMKN 24' | 'Umum';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  isRead: boolean;
  type: 'announcement' | 'duty' | 'attendance' | 'task';
  targetScreen?: ScreenId;
}
