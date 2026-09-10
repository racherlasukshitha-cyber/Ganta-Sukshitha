import { Compass, Flame, Heart, Moon, ShieldCheck, Sparkles, Star, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import { getHoroscopeBySign } from '../../utils/astrologyEngine';

export const HoroscopeSection: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState('Aries');
  const [timeframe, setTimeframe] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');

  const signs = [
    { en: 'Aries', hi: 'मेष (Mesh)', symbol: '♈', element: 'Fire' },
    { en: 'Taurus', hi: 'वृषभ (Vrishabha)', symbol: '♉', element: 'Earth' },
    { en: 'Gemini', hi: 'मिथुन (Mithuna)', symbol: '♊', element: 'Air' },
    { en: 'Cancer', hi: 'कर्क (Karka)', symbol: '♋', element: 'Water' },
    { en: 'Leo', hi: 'सिंह (Simha)', symbol: '♌', element: 'Fire' },
    { en: 'Virgo', hi: 'कन्या (Kanya)', symbol: '♍', element: 'Earth' },
    { en: 'Libra', hi: 'तुला (Tula)', symbol: '♎', element: 'Air' },
    { en: 'Scorpio', hi: 'वृश्चिक (Vrischika)', symbol: '♏', element: 'Water' },
    { en: 'Sagittarius', hi: 'धनु (Dhanu)', symbol: '♐', element: 'Fire' },
    { en: 'Capricorn', hi: 'मकर (Makara)', symbol: '♑', element: 'Earth' },
    { en: 'Aquarius', hi: 'कुम्भ (Kumbha)', symbol: '♒', element: 'Air' },
    { en: 'Pisces', hi: 'मीन (Meena)', symbol: '♓', element: 'Water' },
  ];

  const horoscope = getHoroscopeBySign(selectedSign, timeframe);

  return (
    <section id="horoscope-section" className="py-14 bg-slate-950 text-slate-100 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Moon className="w-3.5 h-3.5" />
            <span>Planetary Rashiphal</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-2">
            Vedic Horoscope & Rashiphal
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Grounded in Moon sign (Chandra Rashi) transits across the 12 Bhavas.
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
            {(['Daily', 'Weekly', 'Monthly'] as const).map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  timeframe === tf
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tf} Rashiphal
              </button>
            ))}
          </div>
        </div>

        {/* 12 Signs Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 mb-10">
          {signs.map(s => (
            <button
              key={s.en}
              onClick={() => setSelectedSign(s.en)}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                selectedSign === s.en
                  ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/10 scale-105'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className="text-xl">{s.symbol}</span>
              <span className="text-[11px] font-bold truncate">{s.en}</span>
            </button>
          ))}
        </div>

        {/* Active Horoscope Card */}
        <div className="max-w-4xl mx-auto bg-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-2xl text-amber-300">
                {signs.find(s => s.en === horoscope.sign)?.symbol}
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold text-amber-200">
                  {horoscope.sign} ({horoscope.hindiSign})
                </h3>
                <p className="text-xs text-slate-400">
                  {timeframe} Planetary Forecast • Element: {horoscope.element}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Lucky Color</span>
                <span className="font-bold text-amber-300">{horoscope.luckyColor}</span>
              </div>
              <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Lucky Number</span>
                <span className="font-bold text-amber-300">{horoscope.luckyNumber}</span>
              </div>
            </div>
          </div>

          {/* Overview text */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Astrological Transit Overview
            </span>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {horoscope.prediction}
            </p>
          </div>

          {/* 4 Dimension Score Meters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {/* Career */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-blue-400 font-medium">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Career</span>
                </span>
                <span className="font-bold text-slate-200">{horoscope.careerScore}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${horoscope.careerScore}%` }}></div>
              </div>
            </div>

            {/* Love */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-rose-400 font-medium">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Love</span>
                </span>
                <span className="font-bold text-slate-200">{horoscope.loveScore}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: `${horoscope.loveScore}%` }}></div>
              </div>
            </div>

            {/* Finance */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-amber-400 font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Wealth</span>
                </span>
                <span className="font-bold text-slate-200">{horoscope.financeScore}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${horoscope.financeScore}%` }}></div>
              </div>
            </div>

            {/* Health */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Health</span>
                </span>
                <span className="font-bold text-slate-200">{horoscope.healthScore}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${horoscope.healthScore}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
