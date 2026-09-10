import { CheckCircle2, Code, Copy, Download, Eye, Globe, Search, Share2, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AdminSeoMarketing: React.FC = () => {
  const { showToast } = useApp();

  const [metaTitle, setMetaTitle] = useState('AstroVeda — Ancient Vedic Astrology & Janam Kundli Portal');
  const [metaDescription, setMetaDescription] = useState('Authentic Parashari Vedic Astrology, Janam Kundli calculation, 36 Guna Ashtakoot Milan, daily panchang, and gemstone remedies by Acharya Devrat Shastri, Varanasi.');
  const [metaKeywords, setMetaKeywords] = useState('vedic astrology, janam kundli, kundli milan, panchang varanasi, horoscope rashiphal, acharya devrat shastri, certified gemstone remedies');
  const [ga4Id, setGa4Id] = useState('G-VEDIC108ASTRO');
  const [canonicalUrl, setCanonicalUrl] = useState('https://astroveda.com');

  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Generate XML Sitemap
  const generateSitemap = () => {
    const urls = [
      { loc: `${canonicalUrl}/`, priority: '1.0', changefreq: 'daily' },
      { loc: `${canonicalUrl}/kundli`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${canonicalUrl}/matchmaking`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${canonicalUrl}/horoscope`, priority: '0.9', changefreq: 'daily' },
      { loc: `${canonicalUrl}/services`, priority: '0.8', changefreq: 'weekly' },
      { loc: `${canonicalUrl}/numerology`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${canonicalUrl}/blog`, priority: '0.8', changefreq: 'weekly' },
      { loc: `${canonicalUrl}/contact`, priority: '0.6', changefreq: 'monthly' },
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast('sitemap.xml generated & downloaded successfully!', 'success');
  };

  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'AstroVeda Vedic Astrology Sansthan',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
    telephone: '+919876543210',
    email: 'acharya@astroveda.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dashashwamedh Ghat Road, Adjacent to Kashi Vishwanath Corridor',
      addressLocality: 'Varanasi',
      addressRegion: 'UP',
      postalCode: '221001',
      addressCountry: 'IN',
    },
    founder: {
      '@type': 'Person',
      name: 'Acharya Devrat Shastri',
      jobTitle: 'Gold Medalist Vedic Astrologer',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.98',
      reviewCount: '5200',
    },
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonLdSchema, null, 2));
    setCopiedSnippet(true);
    showToast('Schema.org JSON-LD copied to clipboard!', 'info');
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div id="admin-seo-view" className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-amber-400" />
          <span>SEO Optimization & Organic Growth Hub</span>
        </h2>
        <p className="text-xs text-slate-400">
          Phase 7: Search engine meta tags, Google Analytics 4 integration, and automated XML Sitemap generation
        </p>
      </div>

      {/* Meta configuration */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
        <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Site Meta Tags & SERP Configuration</span>
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Meta Title Tag (Recommended: 50-60 chars)
            </label>
            <input
              type="text"
              value={metaTitle}
              onChange={e => setMetaTitle(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
            />
            <span className="text-[10px] text-slate-400 block mt-0.5">{metaTitle.length} characters</span>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Meta Description (Recommended: 150-160 chars)
            </label>
            <textarea
              rows={2}
              value={metaDescription}
              onChange={e => setMetaDescription(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
            />
            <span className="text-[10px] text-slate-400 block mt-0.5">{metaDescription.length} characters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Google Analytics 4 Measurement ID
              </label>
              <input
                type="text"
                value={ga4Id}
                onChange={e => setGa4Id(e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Canonical Base URL
              </label>
              <input
                type="url"
                value={canonicalUrl}
                onChange={e => setCanonicalUrl(e.target.value)}
                placeholder="https://yourdomain.com"
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 font-mono focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Live Google Search Snippet Simulation */}
        <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
          <span className="text-slate-400 font-semibold block text-[11px]">
            Live Google SERP Snippet Preview:
          </span>
          <div className="p-4 rounded-xl bg-white text-slate-900 space-y-1 font-sans shadow-sm">
            <div className="text-xs text-[#202124] flex items-center gap-1.5">
              <span className="font-semibold text-[13px]">{canonicalUrl.replace('https://', '')}</span>
              <span className="text-slate-400">› vedic-astrology</span>
            </div>
            <div className="text-base text-[#1a0dab] font-medium hover:underline cursor-pointer">
              {metaTitle}
            </div>
            <div className="text-xs text-[#4d5156] leading-relaxed">
              {metaDescription}
            </div>
          </div>
        </div>
      </div>

      {/* Sitemap & Schema.org JSON-LD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Sitemap generator */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center border border-blue-500/30 mb-2">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-white">
              Dynamic XML Sitemap
            </h3>
            <p className="text-slate-400 leading-relaxed mt-1">
              Includes all high-traffic routes: Janam Kundli, 36 Guna Milan, Daily Rashiphal, Services, Blog articles, and Sansthan contact endpoints.
            </p>
          </div>

          <button
            type="button"
            onClick={generateSitemap}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Generate & Download sitemap.xml</span>
          </button>
        </div>

        {/* Structured Schema.org */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30 mb-2">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-white">
              Structured JSON-LD Schema
            </h3>
            <p className="text-slate-400 leading-relaxed mt-1">
              Vedic Astrologer LocalBusiness schema for Google Rich Results, star ratings (4.98), address in Varanasi, and review counts.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopySchema}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold flex items-center justify-center gap-2 border border-slate-700 cursor-pointer transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span>{copiedSnippet ? 'Copied JSON-LD!' : 'Copy Schema.org Snippet'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
