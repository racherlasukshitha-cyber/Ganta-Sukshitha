import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const ContactSection: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Kundli Reading Consultation');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please complete all required fields.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been sent to Mata Sri Poornima’s sanctuary office. We will reply promptly.', 'success');
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'Namaste Mata Sri Poornima ji. I would like to inquire about booking an astrological consultation.'
    );
    window.open(`https://wa.me/919160791531?text=${text}`, '_blank');
  };

  return (
    <section id="contact-section" className="py-16 bg-slate-950 text-slate-100 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>Get in Touch</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Contact & Sanctuary Address
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Connect directly with Mata Sri Poornima’s office for online consultations, offline visits in Hyderabad, and astrological guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Clickable Contact Cards & Address */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            {/* Sanctuary Physical Address */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-3 shadow-xl">
              <div className="flex items-center gap-2.5 text-amber-300 font-bold font-cinzel text-base">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Hyderabad Vedic Sanctuary</span>
              </div>
              <p className="text-slate-200 text-sm font-medium leading-relaxed">
                Jubilee Hills, Road No. 5, Metro Pillar No. 1571, Hyderabad, Telangana, India.
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Visiting Hours: 09:00 AM – 08:30 PM IST (Prior appointment recommended)</span>
              </div>
            </div>

            {/* Clickable Channels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Phone Card - Clickable tel: link */}
              <a
                id="contact-call-card"
                href="tel:9160791531"
                className="p-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 transition-all group block shadow-md"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                    <Phone className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>Direct Call</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-400" />
                </div>
                <p className="text-amber-200 font-mono text-sm font-bold tracking-wide group-hover:text-white transition-colors">
                  9160791531
                </p>
                <span className="text-[11px] text-slate-400 mt-1 block">Tap to call from phone</span>
              </a>

              {/* Email Card - Clickable mailto: link */}
              <a
                id="contact-email-card"
                href="mailto:gantapoornima555@gmail.com"
                className="p-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 transition-all group block shadow-md"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                    <Mail className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>Email Us</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-400" />
                </div>
                <p className="text-slate-200 text-xs font-medium break-all group-hover:text-amber-200 transition-colors">
                  gantapoornima555@gmail.com
                </p>
                <span className="text-[11px] text-slate-400 mt-1 block">Tap to write direct email</span>
              </a>
            </div>

            {/* Direct WhatsApp Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-center justify-between gap-4 shadow-lg">
              <div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Booking</span>
                </div>
                <p className="text-slate-300 text-[11px] mt-1">
                  Connect on WhatsApp (+91 9160791531) for immediate appointment confirmation.
                </p>
              </div>
              <button
                type="button"
                id="contact-whatsapp-btn"
                onClick={handleWhatsApp}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 shadow-lg shadow-emerald-600/25 cursor-pointer active:scale-95 transition-all"
              >
                Chat on WhatsApp
              </button>
            </div>

            {/* Registered Vedic Center */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-slate-200 block">AstroPoornima Vedic Sanctuary</span>
                <span className="text-[11px] text-slate-400">Jubilee Hills, Road No. 5, Metro Pillar No. 1571, Hyderabad</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <h3 className="font-cinzel text-xl font-bold text-amber-200 mb-1">
              Send an Inquiry or Appointment Request
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Complete the form below. All queries are handled with strict privacy and care.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-slate-950/60 rounded-xl border border-emerald-500/30 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="font-cinzel text-base font-bold text-white">
                  Inquiry Dispatched Successfully
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Namaste {name}. Your details have been received. We will contact you at <span className="text-amber-300 font-mono">{phone || email}</span> shortly.
                </p>
                <div className="pt-3">
                  <a
                    href="tel:9160791531"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-semibold px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Or call immediately: 9160791531</span>
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-200 text-xs rounded-lg font-semibold cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Radhika Agarwal"
                      className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. radhika@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Consultation Required</label>
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Kundli Reading Online (₹1,000)">Kundli Reading Online (₹1,000)</option>
                      <option value="Kundli Reading Offline (₹3,000)">Kundli Reading Offline (₹3,000) - Jubilee Hills</option>
                      <option value="Match Making Milan (₹2,000)">Match Making Milan (₹2,000)</option>
                      <option value="Other Consultation">Other Astrological Guidance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Your Message or Birth Details *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Provide your date of birth, time of birth, place of birth or your specific question..."
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  id="send-contact-form-btn"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Consultation Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
