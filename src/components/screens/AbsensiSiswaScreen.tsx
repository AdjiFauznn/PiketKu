import React, { useState } from 'react';
import { Check, Calendar, AlertCircle, FileText, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { AttendanceStatus, UserProfile } from '../../types';
import { ScreenHeader } from '../ScreenHeader';

interface AbsensiSiswaScreenProps {
  user: UserProfile;
  onBack: () => void;
}

export const AbsensiSiswaScreen: React.FC<AbsensiSiswaScreenProps> = ({
  user,
  onBack,
}) => {
  const [myStatus, setMyStatus] = useState<AttendanceStatus>('hadir');
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showPermitModal, setShowPermitModal] = useState(false);
  const [permitReason, setPermitReason] = useState('Sakit');
  const [permitDesc, setPermitDesc] = useState('');
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const handleStatusChange = (status: AttendanceStatus) => {
    setMyStatus(status);
    if (status === 'hadir') {
      setFeedbackToast('Status kehadiran Anda hari ini tercatat: Hadir ✅');
    } else if (status === 'izin' || status === 'sakit') {
      setShowPermitModal(true);
    } else {
      setFeedbackToast('Status kehadiran Anda tercatat: Alpa ⚠️');
    }
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  const handlePermitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPermitModal(false);
    setFeedbackToast(`Surat keterangan ${permitReason} berhasil diajukan ke Wali Kelas & Sekretaris.`);
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50/50 overflow-y-auto">
      {/* Header */}
      <ScreenHeader
        title="Absensi Saya"
        subtitle="Senin, 26 Jan - XI RPL 1"
        onBack={onBack}
      />

      <div className="flex-1 px-5 pt-4 pb-8 space-y-5">
        {feedbackToast && (
          <div className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md flex items-center justify-between animate-fade-in">
            <span>{feedbackToast}</span>
            <Check className="w-4 h-4 text-emerald-400" />
          </div>
        )}

        {/* Section Header: RINGKASAN ABSENSI SAYA */}
        <div>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <h2 className="text-xs font-bold text-slate-500 tracking-wider uppercase">
              Ringkasan Absensi Saya
            </h2>
            <button
              onClick={() => setShowStatsModal(true)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              Lihat Statistik
            </button>
          </div>

          {/* Student Attendance Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">
                {user.name}
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                NISN: {user.nisn || '102930'}
              </span>
            </div>

            {/* Segmented Buttons: Hadir, Izin, Sakit, Alpa */}
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => handleStatusChange('hadir')}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
                  myStatus === 'hadir'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Hadir
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange('izin')}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
                  myStatus === 'izin'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Izin
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange('sakit')}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
                  myStatus === 'sakit'
                    ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Sakit
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange('alpa')}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
                  myStatus === 'alpa'
                    ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Alpa
              </button>
            </div>
          </div>
        </div>

        {/* Verification Card from Teacher */}
        <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 flex items-start space-x-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-emerald-900">
              Absensi Telah Diverifikasi
            </h4>
            <p className="text-[11px] text-emerald-700/90 mt-0.5">
              Wali kelas (Drs. Hendro Wibowo, M.Pd) telah memeriksa dan mengesahkan presensi kelas XI RPL 1 hari ini pukul 07.25 WIB.
            </p>
          </div>
        </div>

        {/* Riwayat Absensi Minggu Ini */}
        <div>
          <h3 className="text-xs font-bold text-slate-600 tracking-wider uppercase mb-2.5 px-1">
            Riwayat 5 Hari Terakhir
          </h3>

          <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 overflow-hidden">
            <div className="p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-800">Senin, 26 Jan 2026</span>
              </div>
              <span className="font-bold text-emerald-600">Hadir (06.40 WIB)</span>
            </div>

            <div className="p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-800">Jumat, 23 Jan 2026</span>
              </div>
              <span className="font-bold text-emerald-600">Hadir (06.45 WIB)</span>
            </div>

            <div className="p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-800">Kamis, 22 Jan 2026</span>
              </div>
              <span className="font-bold text-emerald-600">Hadir (06.35 WIB)</span>
            </div>

            <div className="p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="font-semibold text-slate-800">Rabu, 21 Jan 2026</span>
              </div>
              <span className="font-bold text-amber-600">Sakit (Flu)</span>
            </div>

            <div className="p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-800">Selasa, 20 Jan 2026</span>
              </div>
              <span className="font-bold text-emerald-600">Hadir (06.50 WIB)</span>
            </div>
          </div>
        </div>

        {/* Action Button: Ajukan Izin / Surat Dokter */}
        <button
          onClick={() => setShowPermitModal(true)}
          className="w-full py-3 px-4 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/50 text-indigo-700 font-bold text-xs flex items-center justify-center space-x-2 transition-all"
        >
          <FileText className="w-4 h-4" />
          <span>Upload Surat Izin / Keterangan Dokter</span>
        </button>
      </div>

      {/* Modal: Statistik Kehadiran */}
      {showStatsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-xl animate-fade-in space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Statistik Kehadiran Semester
              </h3>
              <button
                onClick={() => setShowStatsModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-2xl font-black text-indigo-600 tabular-nums">
                  95%
                </span>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                  Tingkat Kehadiran
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center">
                <span className="text-2xl font-black text-emerald-600 tabular-nums">
                  19
                </span>
                <p className="text-[11px] text-emerald-700/80 font-medium mt-0.5">
                  Hari Hadir
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100 text-center">
                <span className="text-2xl font-black text-amber-600 tabular-nums">
                  1
                </span>
                <p className="text-[11px] text-amber-700/80 font-medium mt-0.5">
                  Hari Sakit
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100 text-center">
                <span className="text-2xl font-black text-rose-600 tabular-nums">
                  0
                </span>
                <p className="text-[11px] text-rose-700/80 font-medium mt-0.5">
                  Hari Alpa
                </p>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              Target minimum kehadiran SMKN 24 Jakarta adalah 90% per semester.
            </p>

            <button
              type="button"
              onClick={() => setShowStatsModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Modal: Ajukan Izin / Sakit */}
      {showPermitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-xl animate-fade-in space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Formulir Surat Izin / Sakit
              </h3>
              <button
                onClick={() => setShowPermitModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePermitSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Kategori
                </label>
                <select
                  value={permitReason}
                  onChange={(e) => setPermitReason(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="Sakit">Sakit (Dengan / Tanpa Surat Dokter)</option>
                  <option value="Izin Keluarga">Izin Keluarga / Urusan Mendesak</option>
                  <option value="Tugas Sekolah / Lomba">Tugas Sekolah / Lomba / OSIS</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Keterangan Alasan
                </label>
                <textarea
                  value={permitDesc}
                  onChange={(e) => setPermitDesc(e.target.value)}
                  rows={3}
                  placeholder="Tuliskan keterangan detail sakit / izin..."
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="p-3 border-2 border-dashed border-slate-200 rounded-xl text-center bg-slate-50/50">
                <p className="text-[11px] font-semibold text-indigo-600">
                  + Lampirkan Foto Surat Dokter / Bukti Izin
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, PDF (Maks. 5MB)</p>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPermitModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-700 shadow-sm"
                >
                  Kirim Keterangan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
