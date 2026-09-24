import React, { useState } from 'react';
import { Check, CheckCircle2, Search, Filter, CheckCheck, Download, FileSpreadsheet, Save, Users, AlertCircle } from 'lucide-react';
import { StudentAttendance, AttendanceStatus } from '../../types';
import { ScreenHeader } from '../ScreenHeader';

interface KelolaAbsensiScreenProps {
  attendanceList: StudentAttendance[];
  onUpdateAttendance: (studentId: string, status: AttendanceStatus) => void;
  onMarkAllHadir: () => void;
  onSave: () => void;
  onBack: () => void;
}

export const KelolaAbsensiScreen: React.FC<KelolaAbsensiScreenProps> = ({
  attendanceList,
  onUpdateAttendance,
  onMarkAllHadir,
  onSave,
  onBack,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const hadirCount = attendanceList.filter((a) => a.status === 'hadir').length;
  const izinCount = attendanceList.filter((a) => a.status === 'izin').length;
  const sakitCount = attendanceList.filter((a) => a.status === 'sakit').length;
  const alpaCount = attendanceList.filter((a) => a.status === 'alpa').length;
  const totalCount = attendanceList.length;

  const filteredStudents = attendanceList.filter((student) => {
    const matchesFilter =
      filterStatus === 'all' || student.status === filterStatus;
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.nisn.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const handleStatusChange = (id: string, status: AttendanceStatus) => {
    onUpdateAttendance(id, status);
  };

  const handleSaveClick = () => {
    onSave();
    setToastMessage('Data presensi harian berhasil disimpan dan dikirim ke Wali Kelas! ✅');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleMarkAll = () => {
    onMarkAllHadir();
    setToastMessage('Seluruh 36 siswa berhasil ditandai Hadir');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleExportCSV = () => {
    const csvContent = [
      'No,NISN,Nama Siswa,Kelas,Status,Tanggal',
      ...attendanceList.map(
        (s, idx) =>
          `${idx + 1},${s.nisn},"${s.name}",XI RPL 1,${s.status.toUpperCase()},2026-01-26`
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Rekap_Absensi_XIRPL1_26Jan2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('File Rekap CSV berhasil diunduh! 📄');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Kelola Presensi & Absensi Harian Kelas
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Rekap kehadiran siswa Kelas XI RPL 1 • Senin, 26 Januari 2026
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Rekap CSV</span>
          </button>
          <button
            onClick={handleSaveClick}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm shadow-indigo-600/20 flex items-center space-x-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Absensi</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-md flex items-center justify-between animate-fade-in">
          <span>{toastMessage}</span>
          <Check className="w-4 h-4 text-emerald-400" />
        </div>
      )}

      {/* Stat Counter Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30 shadow-xs">
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
            Siswa Hadir
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1 tabular-nums">
            {hadirCount} <span className="text-xs font-semibold text-slate-400">/ {totalCount}</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
            {Math.round((hadirCount / totalCount) * 100)}% Kehadiran Kelas
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 shadow-xs">
          <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
            Siswa Izin
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1 tabular-nums">
            {izinCount}
          </div>
          <p className="text-[11px] text-indigo-600 font-medium mt-0.5">
            Surat Izin Orang Tua
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-amber-100 bg-gradient-to-br from-white to-amber-50/30 shadow-xs">
          <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
            Siswa Sakit
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1 tabular-nums">
            {sakitCount}
          </div>
          <p className="text-[11px] text-amber-600 font-medium mt-0.5">
            Surat Dokter / Keterangan
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-rose-100 bg-gradient-to-br from-white to-rose-50/30 shadow-xs">
          <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">
            Alpa (Tanpa Ket.)
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1 tabular-nums">
            {alpaCount}
          </div>
          <p className="text-[11px] text-rose-600 font-medium mt-0.5">
            Perlu Tindak Lanjut Wali Kelas
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama siswa atau NISN..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Filter Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filterStatus === 'all'
                  ? 'bg-white text-indigo-600 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({totalCount})
            </button>
            <button
              onClick={() => setFilterStatus('hadir')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterStatus === 'hadir'
                  ? 'bg-white text-emerald-600 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hadir ({hadirCount})
            </button>
            <button
              onClick={() => setFilterStatus('izin')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterStatus === 'izin'
                  ? 'bg-white text-indigo-600 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Izin ({izinCount})
            </button>
            <button
              onClick={() => setFilterStatus('sakit')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterStatus === 'sakit'
                  ? 'bg-white text-amber-600 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sakit ({sakitCount})
            </button>
            <button
              onClick={() => setFilterStatus('alpa')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterStatus === 'alpa'
                  ? 'bg-white text-rose-600 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Alpa ({alpaCount})
            </button>
          </div>

          {/* Quick Mark All Button */}
          <button
            onClick={handleMarkAll}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition-all flex items-center space-x-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Tandai Semua Hadir</span>
          </button>
        </div>
      </div>

      {/* Desktop Attendance Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">No</th>
                <th className="py-3.5 px-4">Nama Siswa</th>
                <th className="py-3.5 px-4">NISN</th>
                <th className="py-3.5 px-4 text-center">Status Saat Ini</th>
                <th className="py-3.5 px-4 text-center">Pilihan Kehadiran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student, idx) => (
                <tr
                  key={student.id}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  <td className="py-3 px-4 text-center text-slate-400 font-medium">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {student.name}
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-medium font-mono text-[11px]">
                    {student.nisn}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                        student.status === 'hadir'
                          ? 'bg-emerald-100 text-emerald-700'
                          : student.status === 'izin'
                          ? 'bg-indigo-100 text-indigo-700'
                          : student.status === 'sakit'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center space-x-1.5">
                      <button
                        type="button"
                        onClick={() => handleStatusChange(student.id, 'hadir')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                          student.status === 'hadir'
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        Hadir
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(student.id, 'izin')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                          student.status === 'izin'
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        Izin
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(student.id, 'sakit')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                          student.status === 'sakit'
                            ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        Sakit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(student.id, 'alpa')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                          student.status === 'alpa'
                            ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        Alpa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
