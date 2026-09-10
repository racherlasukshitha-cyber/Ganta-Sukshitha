import { ArrowRight, Compass, Heart, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react';
import { CustomerTab, useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setCustomerTab, setMode, setAdminLoginModalOpen, isAdminLoggedIn, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('Subscribed! You will receive weekly Panchang & planetary transit updates.', 'success');
    setNewsletterEmail('');
  };

  const navTo = (tab: CustomerTab) => {
    setMode('customer');
    setCustomerTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-amber-500/20 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main 4-column footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & Invocation */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-0.5 shadow-md">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-amber-300 font-cinzel font-bold text-lg">
                  ॐ
                </div>
              </div>
              <div>
                <span className="font-cinzel text-xl font-bold tracking-wider text-amber-200">
                  AstroPoornima
                </span>
                <p className="text-xs text-slate-400">Vedic Astrology Sanctuary • Hyderabad</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Illuminating life pathways through authentic Parashari & Jaimini Vedic astrology. Guided by revered astrologer Mata Sri Poornima from our Jubilee Hills sanctuary in Hyderabad.
            </p>

            <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200/90 font-serif italic">
              "ॐ असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्मा अमृतं गमय॥"
              <span className="block text-[11px] text-slate-400 not-italic mt-1">
                From falsehood lead us to truth, from darkness lead us to light.
              </span>
            </div>
          </div>

          {/* Column 2: Vedic Features */}
          <div>
            <h3 className="font-cinzel text-sm font-semibold text-amber-300 uppercase tracking-wider mb-4">
              Consultations & Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navTo('services')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kundli Reading (Online — ₹1,000)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navTo('services')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kundli Reading (Offline — ₹3,000)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navTo('services')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span>Match Making Milan (₹2,000)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navTo('kundli')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Free Janam Kundli Patrika Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => navTo('matchmaking')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Ashtakoot Kundli Milan (36 Guna)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navTo('contact')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Hyderabad Sanctuary Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Sanctuary Address */}
          <div>
            <h3 className="font-cinzel text-sm font-semibold text-amber-300 uppercase tracking-wider mb-4">
              Hyderabad Sanctuary
            </h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed">
                  Jubilee Hills, Road No. 5, Metro Pillar No. 1571, Hyderabad
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  id="footer-call-link"
                  href="tel:9160791531"
                  className="text-amber-300 hover:text-white font-mono font-medium transition-colors"
                >
                  9160791531 (Click to Call)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  id="footer-email-link"
                  href="mailto:gantapoornima555@gmail.com"
                  className="text-slate-300 hover:text-amber-300 transition-colors break-all"
                >
                  gantapoornima555@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Govt. Registered Vedic Sanctuary • Hyderabad</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Weekly Forecast & Admin Portal */}
          <div>
            <h3 className="font-cinzel text-sm font-semibold text-amber-300 uppercase tracking-wider mb-4">
              Weekly Vedic Forecast
            </h3>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Receive auspicious Muhurat alerts, Amavasya/Purnima schedules, and planetary transit advisories.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex items-center">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-l-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-r-lg font-semibold text-xs flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  if (isAdminLoggedIn) {
                    setMode('admin');
                  } else {
                    setAdminLoginModalOpen(true);
                  }
                }}
                className="text-xs text-slate-500 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>🔐 Astrologer Admin Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AstroPoornima Hub. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Vedic Consultation</span>
            <span>•</span>
            <span>Refund Policy</span>
            <span>•</span>
            <span>Astrological Guidance Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
