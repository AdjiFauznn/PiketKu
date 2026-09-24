import React, { useState } from 'react';
import { CheckCircle2, Circle, Camera, Check, Sparkles, Calendar, Users, Clock, AlertCircle } from 'lucide-react';
import { DutyTask } from '../../types';
import { ScreenHeader } from '../ScreenHeader';

interface JadwalPiketScreenProps {
  tasks: DutyTask[];
  onToggleTask: (taskId: string) => void;
  onBack: () => void;
}

const DAYS_SCHEDULE = [
  { day: 'Senin', group: 'Kelompok Melati', count: 5, active: true },
  { day: 'Selasa', group: 'Kelompok Mawar', count: 5, active: false },
  { day: 'Rabu', group: 'Kelompok Anggrek', count: 4, active: false },
  { day: 'Kamis', group: 'Kelompok Tulip', count: 5, active: false },
  { day: 'Jumat', group: 'Kelompok Teratai', count: 5, active: false },
] as const;

export const JadwalPiketScreen: React.FC<JadwalPiketScreenProps> = ({
  tasks,
  onToggleTask,
  onBack,
}) => {
  const [activeDay, setActiveDay] = useState<'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat'>('Senin');
  const [taskToVerify, setTaskToVerify] = useState<DutyTask | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const completedCount = tasks.filter((t) => t.status === 'selesai').length;
  const totalCount = tasks.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  // SVG Circular progress math
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const handleTaskClick = (task: DutyTask) => {
    if (task.status === 'pending') {
      setTaskToVerify(task);
    } else {
      onToggleTask(task.id);
      showToast(`Status tugas ${task.studentName} diubah ke Pending`);
    }
  };

  const confirmTaskDone = () => {
    if (taskToVerify) {
      onToggleTask(taskToVerify.id);
      showToast(`Tugas ${taskToVerify.taskName} berhasil diselesaikan! ✨`);
      setTaskToVerify(null);
    }
  };

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Jadwal & Tugas Kebersihan Piket Kelas
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Rotasi Regu Kebersihan Harian Kelas XI RPL 1 • SMKN 24 Jakarta
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto bg-slate-100 p-1 rounded-2xl border border-slate-200">
          {DAYS_SCHEDULE.map((item) => (
            <button
              key={item.day}
              onClick={() => setActiveDay(item.day as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeDay === item.day
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.day} {item.day === 'Senin' && '• Hari Ini'}
            </button>
          ))}
        </div>
      </div>

      {/* Toast Notification */}
      {successToast && (
        <div className="bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-md flex items-center justify-between animate-fade-in">
          <span>{successToast}</span>
          <Check className="w-4 h-4" />
        </div>
      )}

      {/* Desktop 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Today's Roster & Circular Progress Card */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card: Kelompok Hari Ini */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
                  Hari {activeDay}
                </span>
                <h2 className="text-lg font-extrabold text-slate-900 mt-1">
                  {activeDay === 'Senin'
                    ? 'Kelompok Melati'
                    : activeDay === 'Selasa'
                    ? 'Kelompok Mawar'
                    : activeDay === 'Rabu'
                    ? 'Kelompok Anggrek'
                    : activeDay === 'Kamis'
                    ? 'Kelompok Tulip'
                    : 'Kelompok Teratai'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">
                  {activeDay === 'Rabu' ? '4 Siswa Bertugas' : '5 Siswa Bertugas'}
                </p>
              </div>

              <span className="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
                {activeDay === 'Senin' ? `${completedCount}/${totalCount} Selesai` : 'Belum Berjalan'}
              </span>
            </div>

            {/* Radial Progress Ring */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center space-x-4">
              <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 76 76">
                  <circle
                    cx="38"
                    cy="38"
                    r={radius}
                    className="stroke-slate-200"
                    strokeWidth="7"
                    fill="transparent"
                  />
                  <circle
                    cx="38"
                    cy="38"
                    r={radius}
                    className="stroke-indigo-600 transition-all duration-700"
                    strokeWidth="7"
                    strokeDasharray={circumference}
                    strokeDashoffset={activeDay === 'Senin' ? strokeDashoffset : circumference}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-black text-slate-900 tabular-nums">
                    {activeDay === 'Senin' ? `${percentage}%` : '0%'}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-800">
                  {activeDay === 'Senin'
                    ? `${completedCount} dari ${totalCount} tugas selesai`
                    : 'Penugasan Belum Berjalan'}
                </p>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {activeDay === 'Senin'
                    ? 'Terus jaga kebersihan kelas agar proses KBM nyaman dan tertib.'
                    : 'Jadwal penugasan piket otomatis diaktifkan sesuai hari kalender.'}
                </p>
              </div>
            </div>

            {/* Petugas Members Pills */}
            <div>
              <p className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
                Anggota Regu Piket:
              </p>
              <div className="flex flex-wrap gap-2">
                {(activeDay === 'Senin'
                  ? ['Abdie Putra', 'Adzie Tompel', 'Galih Gendut', 'Rafka Sudra', 'Indah Permata']
                  : activeDay === 'Selasa'
                  ? ['Budi Santoso', 'Cici Amelia', 'Dinda Putri', 'Eko Prasetyo', 'Fajar Sidik']
                  : activeDay === 'Rabu'
                  ? ['Gilang Ramadhan', 'Hana Pertiwi', 'Iqbal Hakim', 'Joko Susanto']
                  : activeDay === 'Kamis'
                  ? ['Karina Aulia', 'Lutfi Hakim', 'Maya Lestari', 'Naufal Rizky', 'Olivia Safitri']
                  : ['Prasetyo Wibowo', 'Qori Anugrah', 'Rian Hidayat', 'Salsa Bila', 'Taufik Hidayat']
                ).map((name, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Information Box */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-blue-800 leading-relaxed">
              <p className="font-bold mb-1">Tata Tertib Piket Kelas:</p>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-blue-700/90 font-medium">
                <li>Piket pagi diselesaikan sebelum bel masuk pukul 07:00 WIB.</li>
                <li>Piket pulang sekolah memastikan papan tulis bersih & jendela terkunci.</li>
                <li>Denda kas kelas diberlakukan bagi siswa yang mangkir dari tugas piket.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Detailed Tasks Checklist & Action Bar */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Daftar Tugas & Penanggung Jawab
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  Klik pada baris tugas untuk mengubah status menjadi Selesai atau Pending
                </p>
              </div>
              <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                Hari {activeDay}
              </span>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => {
                const isDone = task.status === 'selesai';

                return (
                  <div
                    key={task.id}
                    onClick={() => handleTaskClick(task)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                      isDone
                        ? 'bg-emerald-50/30 border-emerald-200 hover:border-emerald-300'
                        : 'bg-slate-50/70 border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isDone
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white border-2 border-slate-300 text-slate-400 group-hover:border-amber-400'
                        }`}
                      >
                        {isDone ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : (
                          <Circle className="w-4 h-4 stroke-[2]" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <h4
                            className={`text-sm font-bold transition-all ${
                              isDone ? 'text-slate-500 line-through' : 'text-slate-900'
                            }`}
                          >
                            {task.taskName}
                          </h4>
                          {task.completedAt && (
                            <span className="text-[10px] text-slate-400 font-medium">
                              ({task.completedAt})
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 font-medium">
                          Petugas: <strong className="text-slate-800 font-semibold">{task.studentName}</strong>
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {isDone ? 'Selesai' : 'Pending'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Mark Task Completed */}
      {taskToVerify && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-fade-in space-y-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Verifikasi Kebersihan Piket
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                Tandai Selesai: {taskToVerify.studentName}
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Tugas yang dikerjakan: <strong className="text-slate-800">{taskToVerify.taskName}</strong>
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center space-x-3">
              <Camera className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>
                Foto hasil piket dapat diunggah atau langsung konfirmasi bahwa tugas telah dilaksanakan dengan bersih dan rapi.
              </span>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setTaskToVerify(null)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmTaskDone}
                className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-sm flex items-center justify-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Konfirmasi Selesai</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
