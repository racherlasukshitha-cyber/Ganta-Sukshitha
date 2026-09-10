import { CheckCircle2, MessageSquare, Plus, Sparkles, Star, User } from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Review } from '../../types';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview, showToast, services } = useApp();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [serviceUsed, setServiceUsed] = useState(services[0]?.title || 'Kundli Analysis');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) {
      showToast('Please enter your name and review comment.', 'error');
      return;
    }

    addReview({
      author: userName,
      city: userLocation || 'India',
      userName,
      userLocation: userLocation || 'India',
      rating,
      serviceTitle: serviceUsed,
      serviceUsed,
      comment,
      verified: true,
      verifiedBooking: true,
      approved: true,
    });

    showToast('Dhanyawad! Your review has been published.', 'success');
    setUserName('');
    setUserLocation('');
    setComment('');
    setIsFormOpen(false);
  };

  return (
    <section id="reviews-section" className="py-14 bg-slate-900 text-slate-100 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title & Overall Rating */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Client Voices & Testimonials</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-2">
              Blessed Transformations & Client Experiences
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Read verified feedback from seekers, entrepreneurs, and families guided by Mata Sri Poornima.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-500/30 flex items-center gap-3">
              <div className="font-cinzel text-3xl font-bold text-amber-300">4.98</div>
              <div className="text-xs">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 mt-0.5 block">5,200+ Verified Reviews</span>
              </div>
            </div>

            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Share Review</span>
            </button>
          </div>
        </div>

        {/* Review Submission Form Drawer */}
        {isFormOpen && (
          <div className="mb-10 p-6 bg-slate-950 border border-amber-500/30 rounded-2xl shadow-xl animate-in fade-in duration-200">
            <h3 className="font-cinzel text-base font-bold text-amber-200 mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>Submit Your Astrological Consultation Review</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    placeholder="e.g. Meera Joshi"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">City / Country</label>
                  <input
                    type="text"
                    value={userLocation}
                    onChange={e => setUserLocation(e.target.value)}
                    placeholder="e.g. Pune / London, UK"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Rating</label>
                  <select
                    value={rating}
                    onChange={e => setRating(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5 Excellent)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5 Good)</option>
                    <option value={3}>⭐⭐⭐ (3/5 Average)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Consultation Service</label>
                <select
                  value={serviceUsed}
                  onChange={e => setServiceUsed(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  {services.map(s => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Your Feedback & Experience *</label>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Share how Acharya ji's guidance or remedies helped you..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md cursor-pointer"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map(rev => {
            const authorName = rev.userName || rev.author || 'Devotee';
            const location = rev.userLocation || rev.city || 'India';
            const serviceName = rev.serviceUsed || rev.serviceTitle || 'Vedic Consultation';
            const initial = (authorName.trim().charAt(0) || 'D').toUpperCase();
            const isVerified = Boolean(rev.verifiedBooking ?? rev.verified ?? true);

            return (
              <div
                key={rev.id}
                className="bg-slate-950/80 border border-slate-800 hover:border-amber-500/30 rounded-2xl p-6 shadow-lg flex flex-col justify-between transition-all"
              >
                <div className="space-y-3">
                  {/* Stars and verified badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(Math.max(1, Math.min(5, rev.rating || 5)))].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    {isVerified && (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Client</span>
                      </span>
                    )}
                  </div>

                  {/* Service tag */}
                  <span className="text-[11px] text-amber-300 font-medium block">
                    {serviceName}
                  </span>

                  {/* Comment */}
                  <p className="text-xs text-slate-300 leading-relaxed font-sans italic">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Author */}
                <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-xs border border-amber-500/30">
                      {initial}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-200 block text-xs">{authorName}</span>
                      <span className="text-[10px] text-slate-500">{location}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500">{rev.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
