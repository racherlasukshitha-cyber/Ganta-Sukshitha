import {
  Bookmark,
  BookmarkCheck,
  Calendar,
  Clock,
  Compass,
  Download,
  MapPin,
  RefreshCw,
  Sparkles,
  Trash2,
  User
} from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KundliData } from '../../types';
import { calculateKundli } from '../../utils/astrologyEngine';
import { downloadKundliPDF, downloadRemediesPDF } from '../../utils/pdfGenerator';
import { NorthIndianChart } from './NorthIndianChart';

export const KundliSection: React.FC = () => {
  const { savedKundlis, saveKundli, deleteSavedKundli, showToast } = useApp();

  const [name, setName] = useState('Arjun Singhania');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('1994-09-18');
  const [tob, setTob] = useState('06:45');
  const [pob, setPob] = useState('Varanasi, Uttar Pradesh');

  const [activeTab, setActiveTab] = useState<'chart' | 'planets' | 'remedies' | 'saved'>('chart');

  // Compute or default kundli
  const [currentKundli, setCurrentKundli] = useState<KundliData>(() =>
    calculateKundli({
      name: 'Arjun Singhania',
      gender: 'Male',
      dob: '1994-09-18',
      tob: '06:45',
      pob: 'Varanasi, Uttar Pradesh',
    })
  );

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !dob || !tob || !pob.trim()) {
      showToast('Please provide complete birth details.', 'error');
      return;
    }

    const calculated = calculateKundli({ name, gender, dob, tob, pob });
    setCurrentKundli(calculated);
    setActiveTab('chart');
    showToast(`Kundli Patrika calculated for ${name}!`, 'success');
  };

  const isSaved = savedKundlis.some(k => k.id === currentKundli.id || (k.name === currentKundli.name && k.dob === currentKundli.dob));

  const handleSaveToArchive = () => {
    saveKundli(currentKundli);
  };

  const loadFromSaved = (k: KundliData) => {
    setCurrentKundli(k);
    setName(k.name);
    setGender(k.gender);
    setDob(k.dob);
    setTob(k.tob);
    setPob(k.pob);
    setActiveTab('chart');
    showToast(`Loaded ${k.name}'s Kundli.`, 'info');
  };

  return (
    <section id="kundli-section" className="py-14 bg-slate-950 text-slate-100 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Vedic Janam Patrika Engine</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-2">
            Free Vedic Janam Kundli & Birth Chart
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Generate authentic Parashari Lagna chart, planetary degrees, Vimshottari Mahadasha, and customized gemological remedies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Birth Input Form */}
          <div className="lg:col-span-5 bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="font-cinzel text-base font-bold text-amber-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Enter Birth Particulars</span>
              </h3>
              <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                100% Free
              </span>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Arjun Singhania"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Date of Birth *</label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={e => setDob(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Birth Time (IST) *</label>
                  <div className="relative">
                    <input
                      type="time"
                      required
                      value={tob}
                      onChange={e => setTob(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                    <Clock className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Place of Birth *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={pob}
                      onChange={e => setPob(e.target.value)}
                      placeholder="City, State"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                  </div>
                </div>
              </div>

              {/* Quick Cities */}
              <div className="pt-1">
                <span className="text-[10px] text-slate-400 block mb-1">Quick Select City:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Varanasi', 'New Delhi', 'Mumbai', 'Bengaluru', 'Jaipur', 'Kolkata'].map(city => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setPob(`${city}, India`)}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-amber-200/90 border border-slate-700"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                id="calculate-kundli-btn"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Calculate Janam Kundli Patrika</span>
              </button>
            </form>

            {/* Saved Kundlis quick access */}
            {savedKundlis.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300">Saved Charts Archive</span>
                  <span className="text-[10px] text-amber-400">{savedKundlis.length} Charts</span>
                </div>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {savedKundlis.map(sk => (
                    <div
                      key={sk.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] hover:border-amber-500/30 transition-colors"
                    >
                      <button
                        onClick={() => loadFromSaved(sk)}
                        className="text-left flex-1 truncate text-amber-200 hover:underline"
                      >
                        {sk.name} ({sk.dob})
                      </button>
                      <button
                        onClick={() => deleteSavedKundli(sk.id)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Results Showcase */}
          <div className="lg:col-span-7 bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl space-y-5">
            {/* Header info bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-cinzel text-lg font-bold text-amber-200">{currentKundli.name}</h3>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                    Lagna: {currentKundli.ascendant.sign}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  DOB: {currentKundli.dob} • {currentKundli.tob} • {currentKundli.pob}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveToArchive}
                  className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                    isSaved
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                  title={isSaved ? 'Saved to Archive' : 'Save Chart'}
                >
                  {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={() => {
                    downloadKundliPDF(currentKundli);
                    showToast('Janam Kundli PDF generated!', 'success');
                  }}
                  id="download-kundli-pdf-btn"
                  className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Kundli PDF</span>
                </button>

                <button
                  onClick={() => {
                    downloadRemediesPDF(currentKundli);
                    showToast('Remedies PDF downloaded!', 'success');
                  }}
                  id="download-remedies-pdf-btn"
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Remedies PDF</span>
                </button>
              </div>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 text-xs font-medium pb-2">
              <button
                onClick={() => setActiveTab('chart')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'chart'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                North Indian Chart (लग्न चक्र)
              </button>
              <button
                onClick={() => setActiveTab('planets')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'planets'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Planetary Table (ग्रह स्थिति)
              </button>
              <button
                onClick={() => setActiveTab('remedies')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'remedies'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Vedic Remedies (रत्न व उपाय)
              </button>
            </div>

            {/* TAB 1: Chart & Core Pillars */}
            {activeTab === 'chart' && (
              <div className="space-y-6">
                <NorthIndianChart kundli={currentKundli} />

                {/* 4 Core Pillars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-amber-400 uppercase tracking-wider block">Ascendant / Lagna</span>
                    <span className="font-bold text-slate-100">{currentKundli.ascendant.sign}</span>
                    <span className="text-[10px] text-slate-400 block">{currentKundli.ascendant.degree}°</span>
                  </div>

                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-amber-400 uppercase tracking-wider block">Moon Sign (Rashi)</span>
                    <span className="font-bold text-slate-100">{currentKundli.moonSign.sign}</span>
                    <span className="text-[10px] text-slate-400 block">{currentKundli.moonSign.nakshatra}</span>
                  </div>

                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-amber-400 uppercase tracking-wider block">Sun Sign</span>
                    <span className="font-bold text-slate-100">{currentKundli.sunSign}</span>
                    <span className="text-[10px] text-slate-400 block">Surya Rashi</span>
                  </div>

                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-amber-400 uppercase tracking-wider block">Active Mahadasha</span>
                    <span className="font-bold text-amber-300">{currentKundli.vimshottariDasha.currentMahaDasha}</span>
                    <span className="text-[10px] text-slate-400 block">Till {currentKundli.vimshottariDasha.validTill}</span>
                  </div>
                </div>

                {/* Dosha Audit Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className={`p-3 rounded-xl border ${currentKundli.doshas.mangalDosha.present ? 'bg-rose-950/30 border-rose-500/30 text-rose-200' : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'}`}>
                    <span className="font-bold block">Manglik Dosha</span>
                    <span className="text-[11px] block mt-1">
                      {currentKundli.doshas.mangalDosha.present ? `Present (${currentKundli.doshas.mangalDosha.severity})` : 'No Dosha'}
                    </span>
                  </div>

                  <div className={`p-3 rounded-xl border ${currentKundli.doshas.kaalSarpDosha.present ? 'bg-amber-950/30 border-amber-500/30 text-amber-200' : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'}`}>
                    <span className="font-bold block">Kaal Sarp Yoga</span>
                    <span className="text-[11px] block mt-1">{currentKundli.doshas.kaalSarpDosha.type}</span>
                  </div>

                  <div className={`p-3 rounded-xl border ${currentKundli.doshas.sadeSati.active ? 'bg-indigo-950/30 border-indigo-500/30 text-indigo-200' : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'}`}>
                    <span className="font-bold block">Shani Sade Sati</span>
                    <span className="text-[11px] block mt-1">{currentKundli.doshas.sadeSati.active ? currentKundli.doshas.sadeSati.phase : 'Not Active'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Planetary Placements Table */}
            {activeTab === 'planets' && (
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-950/60 text-amber-300">
                      <th className="p-2.5">Planet</th>
                      <th className="p-2.5">Sign (Rashi)</th>
                      <th className="p-2.5">House</th>
                      <th className="p-2.5">Degrees</th>
                      <th className="p-2.5">Dignity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {currentKundli.planets.map(p => (
                      <tr key={p.planet} className="hover:bg-slate-800/40">
                        <td className="p-2.5 font-medium text-slate-200">
                          {p.planet} ({p.sanskritName.split(' ')[0]})
                        </td>
                        <td className="p-2.5 text-slate-300">{p.sign}</td>
                        <td className="p-2.5 text-amber-300 font-semibold">House {p.house}</td>
                        <td className="p-2.5 font-mono text-slate-400">{p.degrees}°</td>
                        <td className="p-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              p.dignity === 'Exalted'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                : p.dignity === 'Debilitated'
                                ? 'bg-rose-950 text-rose-300 border border-rose-500/30'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {p.dignity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 3: Prescribed Remedies */}
            {activeTab === 'remedies' && (
              <div className="space-y-4 text-xs">
                {/* Gemstone */}
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-sm font-bold text-amber-300">
                      Prescribed Sacred Ratna (Gemstone)
                    </span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-200 px-2 py-0.5 rounded border border-amber-500/30">
                      Ascendant Fortifier
                    </span>
                  </div>
                  <div className="text-base font-bold text-white">
                    {currentKundli.remedies.gemstone.name} ({currentKundli.remedies.gemstone.hindiName})
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-300 pt-1">
                    <div>• Finger: {currentKundli.remedies.gemstone.finger}</div>
                    <div>• Metal: {currentKundli.remedies.gemstone.metal}</div>
                  </div>
                  <p className="text-slate-400 leading-relaxed text-[11px] pt-1 border-t border-amber-500/20">
                    {currentKundli.remedies.gemstone.description}
                  </p>
                </div>

                {/* Rudraksha */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <span className="text-[11px] uppercase font-semibold text-rose-300 block">
                    Sacred Rudraksha
                  </span>
                  <div className="font-bold text-slate-100">{currentKundli.remedies.rudraksha.mukhi}</div>
                  <p className="text-slate-400 text-[11px]">{currentKundli.remedies.rudraksha.benefits}</p>
                </div>

                {/* Mantra */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <span className="text-[11px] uppercase font-semibold text-emerald-300 block">
                    Vedic Japa Mantra
                  </span>
                  <div className="font-bold text-amber-200 text-sm font-serif">
                    {currentKundli.remedies.mantra.mantraText}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Chant: {currentKundli.remedies.mantra.chantingCount} ({currentKundli.remedies.mantra.deity})
                  </div>
                </div>

                {/* Daan */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <span className="text-[11px] uppercase font-semibold text-indigo-300 block">
                    Karmic Charity (Daan)
                  </span>
                  <p className="text-slate-300">{currentKundli.remedies.daan}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
