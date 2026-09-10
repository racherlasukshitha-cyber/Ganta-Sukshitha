import { Award, Calendar, CheckCircle2, Compass, Globe, Shield, Sparkles, Star } from 'lucide-react';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { DailyPanchangWidget } from './DailyPanchangWidget';

export const HeroSection: React.FC = () => {
  const { setCustomerTab, setBookingModalService, services, astrologerPhoto } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950/40 text-slate-100 pt-10 pb-16 border-b border-amber-500/20">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Sacred Tag & Astrologer Highlight */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Authentic Vedic Tradition • Jubilee Hills, Hyderabad</span>
              </div>

              <div
                onClick={() => setCustomerTab('about')}
                className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/90 border border-amber-500/40 text-xs text-slate-200 cursor-pointer hover:border-amber-400 transition-colors"
              >
                <img
                  src={astrologerPhoto || '/poornima_astrologer.jpg'}
                  alt="Mata Sri Poornima"
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 rounded-full object-cover border border-amber-400"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/astrologer.jpg';
                  }}
                />
                <span className="text-[11px] font-medium text-amber-200">Mata Sri Poornima</span>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Ancient Vedic Wisdom for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300">
                  Modern Destinies
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-sans">
                Experience precision astrological revelations based on Brihat Parashara Hora Shastra. Unveil your birth chart, unlock career breakthroughs, harmonize matrimonial alliances, and pacify planetary afflictions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-book-btn"
                onClick={() => {
                  const primaryService = services[0];
                  setBookingModalService(primaryService);
                }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-amber-500/25 transition-all transform active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 1-on-1 Consultation</span>
              </button>

              <button
                id="hero-kundli-btn"
                onClick={() => setCustomerTab('kundli')}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-200 border border-amber-500/40 font-semibold text-xs sm:text-sm tracking-wide transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Generate Free Janam Kundli</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-base font-bold text-amber-300 font-cinzel">28+ Yrs</div>
                  <div className="text-[11px] text-slate-400">Vedic Lineage</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Star className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-base font-bold text-amber-300 font-cinzel">52,000+</div>
                  <div className="text-[11px] text-slate-400">Consultations</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <div className="text-base font-bold text-amber-300 font-cinzel">42+</div>
                  <div className="text-[11px] text-slate-400">Countries Served</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-base font-bold text-emerald-400 font-cinzel">100%</div>
                  <div className="text-[11px] text-slate-400">Confidential</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Daily Panchang Live Widget */}
          <div className="lg:col-span-5">
            <DailyPanchangWidget />
          </div>
        </div>
      </div>
    </section>
  );
};
