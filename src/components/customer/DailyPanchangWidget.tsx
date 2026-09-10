import { AlertCircle, Calendar, Clock, Moon, Sparkles, Sun } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { getDailyPanchang } from '../../utils/astrologyEngine';

export const DailyPanchangWidget: React.FC = () => {
  const [selectedDateStr, setSelectedDateStr] = useState(() => new Date().toISOString().split('T')[0]);

  const panchang = useMemo(() => {
    const d = new Date(selectedDateStr);
    return getDailyPanchang(isNaN(d.getTime()) ? new Date() : d);
  }, [selectedDateStr]);

  return (
    <div
      id="daily-panchang-widget"
      className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-sm"
    >
      {/* Title bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-500/20">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-cinzel text-base font-bold text-amber-200">
              Aaj Ka Vedic Panchang (दैनिक पंचांग)
            </h3>
            <p className="text-xs text-slate-400">
              {panchang.dayOfWeek}, {panchang.dateFormatted} • Kashi Ephemeris
            </p>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-400" />
          <input
            type="date"
            value={selectedDateStr}
            onChange={e => setSelectedDateStr(e.target.value)}
            className="px-2.5 py-1 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Grid of 4 core pillars */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
        {/* Tithi */}
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold block mb-1">
            Tithi (तिथि)
          </span>
          <span className="text-xs font-bold text-slate-100 block">{panchang.tithi}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">{panchang.paksha}</span>
        </div>

        {/* Nakshatra */}
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold block mb-1">
            Nakshatra (नक्षत्र)
          </span>
          <span className="text-xs font-bold text-slate-100 block">{panchang.nakshatra}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Vedic Lunar Mansion</span>
        </div>

        {/* Yoga */}
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold block mb-1">
            Yoga (योग)
          </span>
          <span className="text-xs font-bold text-slate-100 block">{panchang.yoga}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Karana: {panchang.karana}</span>
        </div>

        {/* Solar & Lunar Timings */}
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold block mb-1">
            Sun & Moon
          </span>
          <div className="flex items-center gap-3 text-xs text-slate-200">
            <span className="flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              {panchang.sunRise}
            </span>
            <span className="flex items-center gap-1">
              <Moon className="w-3.5 h-3.5 text-indigo-300" />
              {panchang.sunSet}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">Sunrise & Sunset</span>
        </div>
      </div>

      {/* Muhurat Bar */}
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
        {/* Auspicious Abhijit */}
        <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-200">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <span className="font-semibold block">Abhijit Muhurat (शुभ अभिजित मुहूर्त):</span>
            <span className="text-[11px] text-slate-300">{panchang.abhijitMuhurat}</span>
          </div>
        </div>

        {/* Inauspicious Rahu Kaal */}
        <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/30 flex items-center gap-2.5 text-rose-200">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <div>
            <span className="font-semibold block">Rahu Kaal (अशुभ राहु काल):</span>
            <span className="text-[11px] text-slate-300">{panchang.rahuKaal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
