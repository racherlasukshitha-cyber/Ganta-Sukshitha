import { Award, Compass, Sparkles, Star, User } from 'lucide-react';
import React, { useState } from 'react';
import { NumerologyResult } from '../../types';
import { calculateNumerology } from '../../utils/astrologyEngine';

export const NumerologySection: React.FC = () => {
  const [name, setName] = useState('Ananya Sharma');
  const [dob, setDob] = useState('1996-11-23');

  const [result, setResult] = useState<NumerologyResult>(() =>
    calculateNumerology('Ananya Sharma', '1996-11-23')
  );

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !dob) return;
    setResult(calculateNumerology(name, dob));
  };

  return (
    <section id="numerology-section" className="py-14 bg-slate-950 text-slate-100 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chaldean & Vedic Numerology</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-2">
            Vedic Numerology & Life Path Report
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Discover your core numbers governing your personality, soul inclination, and planetary vibration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-5 bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl">
            <h3 className="font-cinzel text-base font-bold text-amber-200 mb-4 pb-3 border-b border-slate-800 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-400" />
              <span>Input Name & Date of Birth</span>
            </h3>

            <form onSubmit={handleCalculate} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                id="calculate-numerology-btn"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Calculate Numerology Blueprint</span>
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-amber-200">{result.name}</h3>
                <p className="text-xs text-slate-400">DOB: {result.dob}</p>
              </div>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30 font-semibold">
                Ruling Planet: {result.rulingPlanet}
              </span>
            </div>

            {/* 3 Core Numbers */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">Life Path</span>
                <span className="font-cinzel text-3xl font-bold text-white block">{result.lifePathNumber}</span>
                <span className="text-[10px] text-slate-400">Core Destiny</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">Destiny No.</span>
                <span className="font-cinzel text-3xl font-bold text-white block">{result.destinyNumber}</span>
                <span className="text-[10px] text-slate-400">Outer Expression</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">Soul Urge</span>
                <span className="font-cinzel text-3xl font-bold text-white block">{result.soulUrgeNumber}</span>
                <span className="text-[10px] text-slate-400">Heart's Longing</span>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-2 text-xs">
              <span className="font-semibold text-amber-300">Numerological Archetype & Characteristics</span>
              <p className="text-slate-300 leading-relaxed">
                {result.characteristics}
              </p>
            </div>

            {/* Favorable Vibrations */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Lucky Numbers</span>
                <span className="font-bold text-amber-300">{result.luckyNumbers.join(', ')}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Lucky Color</span>
                <span className="font-bold text-amber-300">{result.luckyColor}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Harmonious Gemstone</span>
                <span className="font-bold text-amber-300">{result.luckyGemstone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
