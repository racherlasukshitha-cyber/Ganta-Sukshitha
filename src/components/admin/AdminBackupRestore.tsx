import { AlertTriangle, CheckCircle, Database, Download, FileJson, HardDrive, RefreshCw, ShieldAlert, Upload } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AdminBackupRestore: React.FC = () => {
  const {
    services,
    appointments,
    users,
    transactions,
    reviews,
    blogPosts,
    savedKundlis,
    restoreBackup,
    resetToDefaults,
    showToast,
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);

  // Generate and download full JSON snapshot
  const handleCreateBackup = () => {
    const backupData = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      appName: 'AstroVeda Vedic Astrology Sansthan',
      data: {
        services,
        appointments,
        users,
        transactions,
        reviews,
        blogPosts,
        savedKundlis,
      },
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(backupData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute(
      'download',
      `AstroVeda_Sanctuary_Backup_${new Date().toISOString().split('T')[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('Complete sanctuary backup archive downloaded!', 'success');
  };

  // Handle uploaded JSON file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsRestoring(true);
    const reader = new FileReader();

    reader.onload = event => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        if (!parsed.data) {
          throw new Error('Invalid backup file structure: missing data payload.');
        }

        const success = restoreBackup(parsed.data);
        if (success) {
          showToast('Sanctuary database restored successfully from JSON file!', 'success');
        } else {
          showToast('Failed to apply backup payload.', 'error');
        }
      } catch (err: any) {
        showToast(`Corrupted or invalid JSON backup file: ${err.message}`, 'error');
      } finally {
        setIsRestoring(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };

    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (
      confirm(
        'Are you sure you wish to reset all data to the sacred seed defaults? This will erase custom appointments created in this browser session.'
      )
    ) {
      resetToDefaults();
      showToast('Sanctuary restored to sacred default seed data.', 'info');
    }
  };

  return (
    <div id="admin-backup-view" className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-amber-400" />
          <span>Sanctuary Data Backup & Disaster Recovery</span>
        </h2>
        <p className="text-xs text-slate-400">
          Phase 6: Download encrypted snapshots of all bookings, revenue transactions, and birth charts
        </p>
      </div>

      {/* Snapshot Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 block text-[10px]">Appointments</span>
          <span className="font-cinzel text-xl font-bold text-amber-300">{appointments.length}</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 block text-[10px]">Ledger Transactions</span>
          <span className="font-cinzel text-xl font-bold text-slate-100">{transactions.length}</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 block text-[10px]">Saved Kundli Charts</span>
          <span className="font-cinzel text-xl font-bold text-amber-400">{savedKundlis.length}</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 block text-[10px]">Client Profiles</span>
          <span className="font-cinzel text-xl font-bold text-indigo-300">{users.length}</span>
        </div>
      </div>

      {/* Two Operations: Export and Import */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Create Backup */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-white">
              Export Full Sanctuary Snapshot
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Downloads an authentic JSON payload containing all active services, scheduled sessions, transaction references, seeker coordinates, and saved Vedic horoscopes.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreateBackup}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <FileJson className="w-4 h-4" />
            <span>Download Backup (.JSON)</span>
          </button>
        </div>

        {/* Restore Backup */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30">
              <Upload className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-white">
              Restore Sanctuary From Snapshot
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload a previously generated AstroVeda JSON backup file to instantly synchronize and restore all appointments, clients, and custom service configurations.
            </p>
          </div>

          <div>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              disabled={isRestoring}
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>{isRestoring ? 'Restoring Payload...' : 'Upload & Restore File (.JSON)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone: Reset to seed defaults */}
      <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs">
            <AlertTriangle className="w-4 h-4" />
            <span>Reset Sanctuary to Pristine Seed Defaults</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Removes local modifications and resets appointments, services, and transactions to initial certified state.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetDefaults}
          className="px-4 py-2 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-xs font-semibold shrink-0 cursor-pointer"
        >
          Reset to Factory Defaults
        </button>
      </div>
    </div>
  );
};
