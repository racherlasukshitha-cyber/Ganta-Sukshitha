import { ChevronDown, HelpCircle, Search, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { INITIAL_FAQS } from '../../data/initialData';

export const FAQSection: React.FC = () => {
  const categories = ['all', 'Kundli & Astrology', 'Consultations', 'Gemstones & Remedies', 'Policies'];

  const faqs = INITIAL_FAQS.map((f, idx) => ({
    id: `faq-${idx + 1}`,
    question: f.q,
    answer: f.a,
    category:
      idx === 0
        ? 'Kundli & Astrology'
        : idx === 1
        ? 'Consultations'
        : idx === 2
        ? 'Gemstones & Remedies'
        : idx === 3
        ? 'Gemstones & Remedies'
        : 'Policies',
  }));
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFaqs = faqs.filter(f => {
    const matchesSearch = f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'all' || f.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <section id="faq-section" className="py-14 bg-slate-950 text-slate-100 border-b border-amber-500/20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Answers & Clarifications</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Everything you need to know about our sacred Vedic methodology, appointment protocols, and remedies.
          </p>
        </div>

        {/* Search and Category Filter */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search your question (e.g. birth time, gemstones, google meet)..."
              className="w-full px-4 py-3 pl-11 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 shadow-md"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  activeCategory === c
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {c === 'all' ? 'All Questions' : c}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No questions matched your search query. Please contact us directly.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 hover:bg-slate-800/40 transition-colors"
                  >
                    <span className="font-cinzel text-sm font-semibold text-slate-100">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
