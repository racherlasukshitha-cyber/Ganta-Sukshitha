import { AlertTriangle, Calendar, CheckCircle2, Heart, Sparkles, User } from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AshtakootGunaResult } from '../../types';
import { calculateMatchmaking } from '../../utils/astrologyEngine';

export const MatchmakingSection: React.FC = () => {
  const { setBookingModalService, services } = useApp();

  const [boyName, setBoyName] = useState('Rohan Verma');
  const [boyDob, setBoyDob] = useState('1994-04-12');
  const [girlName, setGirlName] = useState('Priyanka Sharma');
  const [girlDob, setGirlDob] = useState('1996-08-25');

  const [result, setResult] = useState<AshtakootGunaResult>(() =>
    calculateMatchmaking('Rohan Verma', 'Priyanka Sharma', '1994-04-12', '1996-08-25')
  );

  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateMatchmaking(boyName, girlName, boyDob, girlDob);
    setResult(res);
  };

  const getVerdictBadge = (verdict: AshtakootGunaResult['verdict']) => {
    switch (verdict) {
      case 'Excellent Match':
        return 'bg-emerald-950 text-emerald-300 border-emerald-500/50';
      case 'Good Match':
        return 'bg-blue-950 text-blue-300 border-blue-500/50';
      case 'Average Match':
        return 'bg-amber-950 text-amber-300 border-amber-500/50';
      default:
        return 'bg-rose-950 text-rose-300 border-rose-500/50';
    }
  };

  const kootas = [
    result.varna,
    result.vashya,
    result.tara,
    result.yoni,
    result.grahaMaitri,
    result.gana,
    result.bhakoot,
    result.nadi,
  ];

  return (
    <section id="matchmaking-section" className="py-14 bg-slate-950 text-slate-100 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Heart className="w-3.5 h-3.5" />
            <span>Kundli Milan • 36 Guna Ashtakoot</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-2">
            Vedic Marriage Compatibility & Kundli Milan
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Accurate classical 36-point evaluation analyzing mental, physical, temperamental, and genetic harmony.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Input Form for Boy & Girl */}
          <div className="lg:col-span-5 bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl">
            <h3 className="font-cinzel text-base font-bold text-amber-200 mb-4 pb-3 border-b border-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Enter Prospective Couple Details</span>
            </h3>

            <form onSubmit={handleMatch} className="space-y-4 text-xs">
              {/* Boy's Particulars */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <span className="text-[11px] uppercase font-bold text-blue-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>Boy's Birth Details (वर विवरण)</span>
                </span>
                <div>
                  <label className="block text-slate-300 mb-1">Boy's Full Name</label>
                  <input
                    type="text"
                    required
                    value={boyName}
                    onChange={e => setBoyName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Boy's Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={boyDob}
                    onChange={e => setBoyDob(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Girl's Particulars */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <span className="text-[11px] uppercase font-bold text-rose-400 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Girl's Birth Details (कन्या विवरण)</span>
                </span>
                <div>
                  <label className="block text-slate-300 mb-1">Girl's Full Name</label>
                  <input
                    type="text"
                    required
                    value={girlName}
                    onChange={e => setGirlName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Girl's Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={girlDob}
                    onChange={e => setGirlDob(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="calculate-milan-btn"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 hover:opacity-95 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-slate-950" />
                <span>Calculate 36 Guna Ashtakoot Score</span>
              </button>
            </form>
          </div>

          {/* Right: Ashtakoot Scorecard */}
          <div className="lg:col-span-7 bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl space-y-5">
            {/* Scorecard Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-amber-200">
                  {result.boyName} & {result.girlName}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Ashtakoot Guna Milan Assessment</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Guna Milan Score</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-cinzel text-2xl font-bold text-amber-400">{result.totalScore}</span>
                    <span className="text-xs text-slate-400">/ 36</span>
                  </div>
                </div>

                <div className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${getVerdictBadge(result.verdict)}`}>
                  {result.verdict}
                </div>
              </div>
            </div>

            {/* Manglik Comparison */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">{result.boyName}</span>
                  <span className="font-bold text-slate-200">
                    {result.isManglikBoy ? 'Manglik (मांगलिक)' : 'Non-Manglik'}
                  </span>
                </div>
                {result.isManglikBoy ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">{result.girlName}</span>
                  <span className="font-bold text-slate-200">
                    {result.isManglikGirl ? 'Manglik (मांगलिक)' : 'Non-Manglik'}
                  </span>
                </div>
                {result.isManglikGirl ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>
            </div>

            {/* Ashtakoot 8-Factor Matrix */}
            <div className="space-y-2 text-xs">
              <h4 className="font-semibold text-slate-300 text-xs">Ashtakoot Breakdown (8 Kootas)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {kootas.map((k, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-slate-200 block text-[11px]">{k.name}</span>
                      <span className="text-[10px] text-slate-400 line-clamp-1">{k.description}</span>
                    </div>
                    <div className="font-mono font-bold text-xs text-amber-300 shrink-0 ml-2">
                      {k.score} / {k.maxScore}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Acharya Guidance & Consultation CTA */}
            <div className="p-4 rounded-xl bg-amber-950/25 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Astrological Recommendation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {result.recommendations}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    const matchService = services.find(s => s.category === 'marriage') || services[1];
                    setBookingModalService(matchService);
                  }}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book In-Depth Marriage Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
