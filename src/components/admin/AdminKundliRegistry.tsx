import { Bookmark, Calendar, Clock, Compass, Download, Eye, MapPin, Search, Trash2, User } from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KundliData } from '../../types';
import { downloadKundliPDF, downloadRemediesPDF } from '../../utils/pdfGenerator';
import { NorthIndianChart } from '../customer/NorthIndianChart';

export const AdminKundliRegistry: React.FC = () => {
  const { savedKundlis, deleteSavedKundli, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [selectedKundli, setSelectedKundli] = useState<KundliData | null>(null);

  const filtered = savedKundlis.filter(k => {
    const q = search.toLowerCase();
    return !q || k.name.toLowerCase().includes(q) || k.pob.toLowerCase().includes(q) || k.dob.includes(q);
  });

  return (
    <div id="admin-kundli-registry-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <span>Kundli Birth Chart Vault & Archive</span>
          </h2>
          <p className="text-xs text-slate-400">
            Phase 4: Stored Parashari horoscopes, planetary degrees, and prescribed remedies
          </p>
        </div>

        <div className="text-xs text-amber-300 bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-500/20">
          Stored Charts: <strong>{savedKundlis.length}</strong>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by native name, city, or birthdate..."
          className="w-full px-3.5 py-2 pl-9 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
      </div>

      {/* Kundli Cards Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-400 space-y-2">
          <Compass className="w-8 h-8 text-amber-500/40 mx-auto" />
          <p>No Janam Kundli charts found in the archive.</p>
          <p className="text-slate-500 text-[11px]">Generate a new Kundli from the Kundli tab to store it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(k => (
            <div
              key={k.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-xs border border-amber-500/30">
                      {k.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-cinzel text-sm font-bold text-white">{k.name}</h4>
                      <span className="text-[10px] text-slate-400">{k.gender}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Lagna: {k.ascendant.sign}
                  </span>
                </div>

                {/* Details */}
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>DOB: {k.dob} at {k.tob}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span className="truncate">{k.pob}</span>
                  </div>
                  <div className="flex items-center gap-1.5 pt-1 text-slate-400 text-[11px]">
                    <span>Moon: <strong className="text-amber-300">{k.moonSign.sign}</strong></span>
                    <span>•</span>
                    <span>Dasha: <strong className="text-amber-300">{k.vimshottariDasha.currentMahaDasha}</strong></span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedKundli(k)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 flex items-center gap-1 font-medium transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Chart</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      downloadKundliPDF(k);
                      showToast(`Kundli PDF downloaded for ${k.name}`, 'success');
                    }}
                    className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                    title="Download Kundli PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete Kundli chart for ${k.name}?`)) {
                        deleteSavedKundli(k.id);
                        showToast(`Removed ${k.name} from vault`, 'info');
                      }
                    }}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chart Inspection Modal */}
      {selectedKundli && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-cinzel text-base font-bold text-amber-200">
                  {selectedKundli.name}'s Janam Patrika
                </h3>
                <span className="text-xs text-slate-400">
                  {selectedKundli.dob} • {selectedKundli.tob} • {selectedKundli.pob}
                </span>
              </div>
              <button
                onClick={() => setSelectedKundli(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Render North Indian Chart */}
            <NorthIndianChart kundli={selectedKundli} />

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-[10px] text-amber-400 block">Prescribed Gemstone</span>
                <span className="font-bold text-slate-100">{selectedKundli.remedies.gemstone.name}</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-[10px] text-amber-400 block">Chanting Mantra</span>
                <span className="font-bold text-slate-100 truncate block">{selectedKundli.remedies.mantra.mantraText}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  downloadKundliPDF(selectedKundli);
                  showToast('Kundli PDF generated!', 'success');
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
