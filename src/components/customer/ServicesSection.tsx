import {
  Building2,
  Calendar,
  Check,
  Clock,
  Compass,
  HeartHandshake,
  Info,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Video,
} from 'lucide-react';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Service } from '../../types';

export const ServicesSection: React.FC = () => {
  const { services, setBookingModalService } = useApp();

  // Find the exact requested services
  const kundliOnline = services.find(s => s.id === 'srv-kundli-online') || {
    id: 'srv-kundli-online',
    title: 'Kundli Reading (Online)',
    hindiTitle: 'जन्म कुण्डली परामर्श (ऑनलाइन)',
    category: 'kundli' as const,
    price: 1000,
    durationMinutes: 45,
    shortDescription: 'Comprehensive virtual birth chart analysis via high-definition video call or phone from the comfort of your home.',
    fullDescription: 'In-depth 1-on-1 virtual consultation with Mata Sri Poornima covering 12 Bhavas, planetary yogas, Dasha timeline, and personalized remedies.',
    features: [
      '1-on-1 direct session with Mata Sri Poornima',
      'Detailed 12 Bhavas & planetary yogas audit',
      'Vimshottari Mahadasha timeline & remedies',
      'Convenient consultation via Video Call / Phone',
      'Digital Janam Kundli summary & remedies guide'
    ],
    iconName: 'Compass',
    active: true,
    popular: true,
  };

  const kundliOffline = services.find(s => s.id === 'srv-kundli-offline') || {
    id: 'srv-kundli-offline',
    title: 'Kundli Reading (Offline)',
    hindiTitle: 'जन्म कुण्डली परामर्श (ऑफ़लाइन / व्यक्तिगत)',
    category: 'kundli' as const,
    price: 3000,
    durationMinutes: 60,
    shortDescription: 'In-person one-on-one personal consultation at our Jubilee Hills, Hyderabad sanctuary.',
    fullDescription: 'Private face-to-face consultation at our Hyderabad sanctuary (Jubilee Hills, Road No. 5). Thorough examination of physical charts with blessed remedial guidance.',
    features: [
      'Face-to-face consultation at Jubilee Hills, Hyderabad',
      'Deep personal chart & planetary transit examination',
      'Customized gemstone, mantra & hawan prescriptions',
      'Traditional blessings & energized remedial guidance',
      '60-minute unhurried, comprehensive discussion'
    ],
    iconName: 'Building2',
    active: true,
    popular: true,
  };

  const matchMaking = services.find(s => s.id === 'srv-matchmaking') || {
    id: 'srv-matchmaking',
    title: 'Match Making',
    hindiTitle: 'विवाह गुण मिलान (36 गुण व मांगलिक विचार)',
    category: 'marriage' as const,
    price: 2000,
    durationMinutes: 60,
    shortDescription: 'Exhaustive 36 Guna Ashtakoot Milan, Manglik Dosha evaluation, and mutual compatibility forecast.',
    fullDescription: 'Detailed comparative analysis of both prospective bride and groom horoscopes by Mata Sri Poornima.',
    features: [
      'Ashtakoot 36 Guna Milan breakdown & scoring',
      'Manglik dosha presence & cancellation check',
      'Longevity & progeny (Santana) indicators',
      'Family harmony & financial growth synergy',
      'Auspicious Vivah Muhurat recommendations'
    ],
    iconName: 'HeartHandshake',
    active: true,
    popular: true,
  };

  const pricingPackages: {
    service: Service;
    categoryTag: string;
    modeTag: string;
    modeIcon: React.ReactNode;
    highlightBorder: boolean;
    badge?: string;
  }[] = [
    {
      service: kundliOnline,
      categoryTag: 'Kundli Reading',
      modeTag: 'Online Consultation',
      modeIcon: <Video className="w-3.5 h-3.5 text-sky-400" />,
      highlightBorder: false,
      badge: 'Popular for Global Clients',
    },
    {
      service: kundliOffline,
      categoryTag: 'Kundli Reading',
      modeTag: 'Offline (In-Person)',
      modeIcon: <MapPin className="w-3.5 h-3.5 text-amber-400" />,
      highlightBorder: true,
      badge: 'Jubilee Hills Sanctuary',
    },
    {
      service: matchMaking,
      categoryTag: 'Match Making',
      modeTag: 'Kundli Milan (36 Guna)',
      modeIcon: <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />,
      highlightBorder: false,
      badge: 'Matrimonial Compatibility',
    },
  ];

  return (
    <section id="services-section" className="py-16 bg-slate-950 text-slate-100 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Consultation Fee & Packages</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-wide">
            Services & Transparent Pricing
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            All consultations are conducted with complete confidentiality by Mata Sri Poornima. Transparent fee structure in real editable text — no hidden costs.
          </p>
        </div>

        {/* 3 Core Requested Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
          {pricingPackages.map((pkg) => {
            const srv = pkg.service;
            return (
              <div
                key={srv.id}
                id={`pricing-card-${srv.id}`}
                className={`relative rounded-2xl bg-slate-900 flex flex-col justify-between p-6 sm:p-7 border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                  pkg.highlightBorder
                    ? 'border-2 border-amber-500 shadow-xl shadow-amber-500/15 ring-1 ring-amber-500/30'
                    : 'border border-slate-800 hover:border-amber-500/40 shadow-lg'
                }`}
              >
                {/* Top Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 text-[11px] font-bold tracking-wide uppercase shadow-md whitespace-nowrap">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  {/* Category & Mode Header */}
                  <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                    <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                      {pkg.categoryTag}
                    </span>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950 text-[11px] text-slate-300 border border-slate-800">
                      {pkg.modeIcon}
                      <span>{pkg.modeTag}</span>
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-1">
                    {srv.title}
                  </h3>
                  {srv.hindiTitle && (
                    <p className="text-xs text-amber-300/80 font-serif mb-3">
                      {srv.hindiTitle}
                    </p>
                  )}

                  {/* Real HTML Price Display (Indexed & Editable Text) */}
                  <div className="py-4 my-3 border-y border-slate-800/80">
                    <span className="text-[11px] text-slate-400 block font-medium">Consultation Fee</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-cinzel text-3xl sm:text-4xl font-bold text-amber-300">
                        ₹{srv.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400">/ session</span>
                      {srv.originalPrice && (
                        <span className="line-through text-xs text-slate-500 ml-1">
                          ₹{srv.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Duration: {srv.durationMinutes} Minutes</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-5">
                    {srv.shortDescription}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Included in this session:
                    </span>
                    {srv.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Button */}
                <div className="pt-4 border-t border-slate-800/80">
                  <button
                    type="button"
                    id={`book-service-${srv.id}`}
                    onClick={() => setBookingModalService(srv)}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book {srv.title} — ₹{srv.price.toLocaleString('en-IN')}</span>
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-2">
                    Instant confirmation via WhatsApp & Email
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Semantic HTML Pricing Table for SEO & Quick Comparison */}
        <div className="rounded-2xl bg-slate-900 border border-amber-500/30 overflow-hidden shadow-xl">
          <div className="p-4 sm:p-6 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-amber-200">
                Quick Consultation Fee Summary
              </h3>
              <p className="text-xs text-slate-400">
                Transparent Vedic consultation charges for online and offline sessions in Hyderabad.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Genuine Parashari Analysis</span>
            </div>
          </div>

          {/* Pure HTML Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950/80 text-amber-300/90 font-cinzel text-xs uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">Service</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">Mode / Venue</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">Duration</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">Price (INR)</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-850 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-semibold text-white">
                    Kundli Reading
                    <span className="block text-xs font-normal text-slate-400">Detailed birth chart, Dasha & remedial guidance</span>
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-950/60 text-sky-300 border border-sky-500/30 text-xs">
                      <Video className="w-3.5 h-3.5" />
                      Online (Video / Phone)
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6">45 Mins</td>
                  <td className="py-4 px-4 sm:px-6">
                    <span className="font-cinzel text-base sm:text-lg font-bold text-amber-300">₹1,000</span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right">
                    <button
                      type="button"
                      onClick={() => setBookingModalService(kundliOnline)}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-colors cursor-pointer"
                    >
                      Book Online
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-850 transition-colors bg-slate-900/40">
                  <td className="py-4 px-4 sm:px-6 font-semibold text-white">
                    Kundli Reading
                    <span className="block text-xs font-normal text-slate-400">In-person session at Jubilee Hills Sanctuary</span>
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-950/60 text-amber-300 border border-amber-500/30 text-xs">
                      <MapPin className="w-3.5 h-3.5" />
                      Offline (Hyderabad)
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6">60 Mins</td>
                  <td className="py-4 px-4 sm:px-6">
                    <span className="font-cinzel text-base sm:text-lg font-bold text-amber-300">₹3,000</span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right">
                    <button
                      type="button"
                      onClick={() => setBookingModalService(kundliOffline)}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-colors cursor-pointer"
                    >
                      Book Offline
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-850 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-semibold text-white">
                    Match Making
                    <span className="block text-xs font-normal text-slate-400">Ashtakoot 36 Guna Milan & Manglik dosha analysis</span>
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-950/60 text-rose-300 border border-rose-500/30 text-xs">
                      <HeartHandshake className="w-3.5 h-3.5" />
                      Online / In-Person
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6">60 Mins</td>
                  <td className="py-4 px-4 sm:px-6">
                    <span className="font-cinzel text-base sm:text-lg font-bold text-amber-300">₹2,000</span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right">
                    <button
                      type="button"
                      onClick={() => setBookingModalService(matchMaking)}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-colors cursor-pointer"
                    >
                      Book Milan
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Need help choosing a consultation? Contact our Hyderabad helpline at +91 9160791531</span>
            </div>
            <a
              href="tel:9160791531"
              className="text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
