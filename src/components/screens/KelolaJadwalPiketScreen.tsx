import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Copy, Check, X, Users } from 'lucide-react';
import { DutyGroupSchedule } from '../../types';
import { ScreenHeader } from '../ScreenHeader';

interface KelolaJadwalPiketScreenProps {
  groups: DutyGroupSchedule[];
  onAddGroup: (newGroup: DutyGroupSchedule) => void;
  onUpdateGroup: (updatedGroup: DutyGroupSchedule) => void;
  onDeleteGroup: (groupId: string) => void;
  onBack: () => void;
}

export const KelolaJadwalPiketScreen: React.FC<KelolaJadwalPiketScreenProps> = ({
  groups,
  onAddGroup,
  onUpdateGroup,
  onDeleteGroup,
  onBack,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);

  // Form state
  const [formDay, setFormDay] = useState('Hari Senin');
  const [formGroupName, setFormGroupName] = useState('');
  const [formMembers, setFormMembers] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyTemplate = () => {
    const text = groups
      .map((g) => `${g.dayName} (${g.groupName}):\n${g.members.join(', ')}`)
      .join('\n\n');
    navigator.clipboard?.writeText?.(text);
    showToast('Template jadwal piket berhasil disalin! 📋');
  };

  const openAddModal = () => {
    setEditingGroupId(null);
    setFormDay('Hari Jumat');
    setFormGroupName('Kelompok Teratai');
    setFormMembers('Hafiz, Ilham, Jihan, Kayla, Luthfi');
    setShowModal(true);
  };

  const openEditModal = (group: DutyGroupSchedule) => {
    setEditingGroupId(group.id);
    setFormDay(group.dayName);
    setFormGroupName(group.groupName);
    setFormMembers(group.members.join(', '));
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formGroupName.trim() || !formMembers.trim()) {
      showToast('Harap lengkapi nama kelompok dan anggota');
      return;
    }

    const memberList = formMembers
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);

    if (editingGroupId) {
      onUpdateGroup({
        id: editingGroupId,
        dayName: formDay,
        groupName: formGroupName,
        memberCount: memberList.length,
        members: memberList,
      });
      showToast('Jadwal piket berhasil diperbarui! ✨');
    } else {
      const newGroup: DutyGroupSchedule = {
        id: `grp-${Date.now()}`,
        dayName: formDay,
        groupName: formGroupName,
        memberCount: memberList.length,
        members: memberList,
      };
      onAddGroup(newGroup);
      showToast('Jadwal piket baru berhasil ditambahkan! ✨');
    }

    setShowModal(false);
  };

  const handleDelete = (group: DutyGroupSchedule) => {
    if (confirm(`Hapus jadwal piket untuk ${group.dayName} (${group.groupName})?`)) {
      onDeleteGroup(group.id);
      showToast(`Jadwal ${group.dayName} dihapus`);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50/50 overflow-y-auto relative">
      {/* Header */}
      <ScreenHeader
        title="Kelola Jadwal Piket"
        subtitle="Atur penugasan harian kebersihan kelas"
        onBack={onBack}
      />

      <div className="flex-1 px-5 pt-4 pb-24 space-y-4">
        {/* Toast */}
        {toastMessage && (
          <div className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md flex items-center justify-between animate-fade-in">
            <span>{toastMessage}</span>
            <Check className="w-4 h-4 text-emerald-400" />
          </div>
        )}

        {/* Section Header: DAFTAR JADWAL AKTIF + Salin Template */}
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-slate-500 tracking-wider uppercase">
            Daftar Jadwal Aktif
          </h2>
          <button
            onClick={handleCopyTemplate}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center space-x-1"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Salin Template</span>
          </button>
        </div>

        {/* Schedule Cards List */}
        <div className="space-y-3">
          {groups.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs space-y-2 hover:border-slate-200 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {item.dayName}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {item.groupName} • {item.memberCount} Anggota
                  </p>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => openEditModal(item)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 uppercase tracking-wide transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 uppercase tracking-wide transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              </div>

              {/* Members text matching mockup */}
              <p className="text-xs text-slate-500 line-clamp-2 pt-1 font-medium leading-relaxed">
                {item.members.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Action: + Tambah Jadwal */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent pt-6">
        <button
          onClick={openAddModal}
          className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Jadwal</span>
        </button>
      </div>

      {/* Modal Add / Edit Schedule */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-xl animate-fade-in space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                {editingGroupId ? 'Edit Jadwal Piket' : 'Tambah Jadwal Piket'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Hari
                </label>
                <select
                  value={formDay}
                  onChange={(e) => setFormDay(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="Hari Senin">Hari Senin</option>
                  <option value="Hari Selasa">Hari Selasa</option>
                  <option value="Hari Rabu">Hari Rabu</option>
                  <option value="Hari Kamis">Hari Kamis</option>
                  <option value="Hari Jumat">Hari Jumat</option>
                  <option value="Hari Sabtu">Hari Sabtu (Kegiatan Tambahan)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Nama Kelompok
                </label>
                <input
                  type="text"
                  value={formGroupName}
                  onChange={(e) => setFormGroupName(e.target.value)}
                  placeholder="Contoh: Kelompok Melati"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Nama Siswa Anggota (pisahkan dengan koma)
                </label>
                <textarea
                  value={formMembers}
                  onChange={(e) => setFormMembers(e.target.value)}
                  rows={3}
                  placeholder="Abdie Putra, Adzie Tompel, Galih Gendut, Rafka Sudra, Indah Permata"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-700 shadow-sm"
                >
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
