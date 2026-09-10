import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  ExternalLink,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Star,
  Upload,
} from 'lucide-react';
import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';

export const AboutSection: React.FC = () => {
  const { setBookingModalService, services, astrologerPhoto, setAstrologerPhoto, showToast } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file (JPG, PNG, WEBP).', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setAstrologerPhoto(reader.result);
          showToast('Astrologer portrait updated successfully!', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="about-astrologer-section" className="py-16 bg-slate-900 text-slate-100 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Meet the Master Astrologer</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-wide">
            Mata Sri Poornima
          </h2>
          <p className="text-sm sm:text-base text-amber-200/90 font-medium">
            Renowned Vedic Astrologer & Jyotishya Shiromani • Hyderabad
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl mx-auto leading-relaxed">
            Guiding thousands across India and worldwide through authentic Parashari & Jaimini Vedic horoscope analysis, matrimonial compatibility, and sacred planetary remedies.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Portrait and Honors Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-amber-500/20 via-slate-950 to-slate-950 p-1.5 border border-amber-500/40 shadow-2xl shadow-amber-500/10 group">
              {/* Image Container with Natural Aspect Ratio & No Distortion */}
              <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-[3/4] sm:aspect-[4/5] flex items-center justify-center">
                <img
                  id="main-astrologer-photo"
                  src={astrologerPhoto || '/poornima_astrologer.jpg'}
                  alt="Mata Sri Poornima - Master Vedic Astrologer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  onError={(e) => {
                    // Fallback if custom path fails
                    (e.target as HTMLImageElement).src = '/astrologer.jpg';
                  }}
                />

                {/* Floating Top Rating Badge */}
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-slate-950/90 backdrop-blur-md border border-amber-500/40 flex items-center gap-1.5 text-xs text-amber-300 font-semibold shadow-lg">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.99 / 5.0 (2,400+ Reviews)</span>
                </div>

                {/* Optional Update Photo Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload or change astrologer photo"
                  className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-lg bg-slate-950/85 hover:bg-slate-900 backdrop-blur-md border border-amber-500/30 text-amber-200 text-[11px] font-medium flex items-center gap-1.5 shadow-md transition-all cursor-pointer opacity-80 hover:opacity-100"
                >
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span>Update Photo</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>

              {/* Astrologer Card Caption & Direct Contact Links */}
              <div className="p-4 sm:p-5 text-center space-y-3">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-amber-200">
                    Mata Sri Poornima
                  </h3>
                  <p className="text-xs text-slate-400">
                    Jyotishya Shiromani • Vedic Janam Kundli & Vivah Milan Specialist
                  </p>
                </div>

                {/* Direct Clickable Contact Badges */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-center gap-2.5 text-xs">
                  <a
                    id="about-call-btn"
                    href="tel:9160791531"
                    className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center gap-1.5 font-medium transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call: +91 9160791531</span>
                  </a>

                  <a
                    id="about-email-btn"
                    href="mailto:gantapoornima555@gmail.com"
                    className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>gantapoornima555@gmail.com</span>
                  </a>
                </div>

                {/* Sanctuary Address */}
                <div className="pt-1 text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Jubilee Hills, Road No. 5, Metro Pillar No. 1571, Hyderabad</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Bio & Credentials */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h3 className="font-cinzel text-2xl font-bold text-amber-300">
                Spiritual Lineage & Classical Expertise
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                With deep-rooted spiritual devotion and decades of sacred Vedic scholarship, <strong className="text-amber-200 font-semibold">Mata Sri Poornima</strong> is celebrated for her exceptional precision in Janam Kundli interpretation, Vivah Milan matchmaking, and practical astrological remedies.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Practicing from her esteemed sanctuary in <span className="text-white font-medium">Jubilee Hills, Hyderabad</span>, Mata ji adheres strictly to authentic Brihat Parashara Hora Shastra, Jaimini Sutras, and Muhurta Chintamani. Her consultations provide transformative clarity on career transitions, matrimonial alliances, family peace, health rhythms, and financial stability.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether consulting online or welcoming seekers in-person, each session is conducted with profound patience, empathy, and confidentiality. Zero fear-mongering—guidance focuses purely on practical, sattvic remedies, daily mantras, and spiritual empowerment.
              </p>
            </div>

            {/* Core Credentials Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-amber-200">Top Jyothishya Shiromani</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Recognized for excellence and predictive accuracy in Vedic astrological scholarship.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-amber-200">Authentic Parashari Lineage</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Preserving classical Dasha timelines, divisional charts (D9 Navamsha, D10 Dashamsha), and Nakshatra yogas.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-amber-200">Sattvic & Ethical Guidance</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    No superstition or fear-based predictions. Clear, compassionate advice aimed at positive life transformation.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-emerald-300">Certified Gemstone Guidance</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Prescriptions for 100% genuine, untreated astrological gemstones and energized sacred Yantras.
                  </p>
                </div>
              </div>
            </div>

            {/* Astrologer Quote & CTA */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/50 via-slate-800 to-indigo-950/50 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs italic text-amber-200/90 font-serif leading-relaxed">
                "The planets do not enslave the human soul; they are the cosmic clock showing the seasons of our karma."
                <span className="block text-[11px] text-slate-400 not-italic font-sans mt-1">
                  — Mata Sri Poornima, Hyderabad
                </span>
              </div>
              <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
                <button
                  type="button"
                  id="about-schedule-btn"
                  onClick={() => setBookingModalService(services[0] || null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
