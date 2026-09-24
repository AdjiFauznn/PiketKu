import React, { useState } from 'react';
import { Sparkles, User, Lock, Eye, EyeOff, ClipboardList, GraduationCap, CheckCircle2, ShieldCheck, ArrowRight, School } from 'lucide-react';
import { UserRole } from '../../types';

interface LoginScreenProps {
  onLogin: (role: UserRole, username: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('siswa');
  const [username, setUsername] = useState('102938475');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'siswa') {
      setUsername('102938475');
    } else if (role === 'sekretaris') {
      setUsername('102938475');
    } else {
      setUsername('197805122005011003');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMsg('Harap masukkan NISN / NIP / Username');
      return;
    }
    onLogin(selectedRole, username);
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      {/* Left Column: School & App Branding (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 p-12 flex-col justify-between text-white relative overflow-hidden">
        {/* Background decorative patterns */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top: School Identity */}
        <div className="relative z-10 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
            <School className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold tracking-wide">SMKN 24 JAKARTA</h3>
            <p className="text-xs text-indigo-200">Sistem Informasi & Manajemen Kelas</p>
          </div>
        </div>

        {/* Center: Main App Highlight */}
        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Portal Digital Resmi Kelas XI RPL 1</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Kelola Piket & Absensi Kelas Lebih Mudah.
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed font-normal">
            Platform terpadu untuk monitoring pembagian jadwal piket kebersihan, presensi harian siswa, dan publikasi pengumuman kelas secara real-time.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
              <h4 className="text-xs font-bold text-white">Jadwal Piket Teratur</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Rotasi harian & checklist tugas berstatus transparan</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <ShieldCheck className="w-5 h-5 text-indigo-400 mb-2" />
              <h4 className="text-xs font-bold text-white">Pengesahan Wali Kelas</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Validasi digital presensi harian & rating kebersihan</p>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="relative z-10 text-xs text-slate-400 flex items-center justify-between">
          <span>© 2026 SMKN 24 Jakarta • PiketKu Platform</span>
          <span>Versi Web 2.0</span>
        </div>
      </div>

      {/* Right Column: Login Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-200/80 space-y-6">
          {/* Header Mobile Brand & Title */}
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 mx-auto mb-3 text-white">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Masuk ke PiketKu
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Pilih peran akun dan masukkan kredensial Anda
            </p>
          </div>

          {/* Role Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
              Pilih Peran Masuk:
            </label>
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleRoleSelect('siswa')}
                className={`py-2 px-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
                  selectedRole === 'siswa'
                    ? 'bg-indigo-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Siswa</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('sekretaris')}
                className={`py-2 px-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
                  selectedRole === 'sekretaris'
                    ? 'bg-indigo-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ClipboardList className="w-3.5 h-3.5" />
                <span>Sekretaris</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('wali_kelas')}
                className={`py-2 px-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
                  selectedRole === 'wali_kelas'
                    ? 'bg-indigo-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Wali Kelas</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {selectedRole === 'wali_kelas' ? 'NIP Guru / Username' : 'NISN / Username'}
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={selectedRole === 'wali_kelas' ? '197805122005011003' : '102938475'}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Kata Sandi
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-600 font-semibold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
            >
              <span>Masuk ke Portal Kelas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo Auto Login helper */}
          <div className="pt-2 border-t border-slate-100 text-center space-y-2">
            <p className="text-[11px] text-slate-400 font-medium">
              Akun Demo Siap Uji: Klik tombol di atas untuk masuk langsung sesuai peran.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
