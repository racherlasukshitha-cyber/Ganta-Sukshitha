import { ArrowRight, BookOpen, Calendar, Clock, Facebook, Linkedin, Share2, Sparkles, Tag, Twitter, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BlogPost } from '../../types';

export const BlogSection: React.FC = () => {
  const { blogPosts, showToast } = useApp();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', 'Planetary Transit', 'Gemstone Remedies', 'Vedic Wisdom', 'Vivah Muhurat'];

  const filteredPosts = blogPosts.filter(p => {
    if (filterCategory === 'all') return true;
    return p.category.toLowerCase().includes(filterCategory.toLowerCase());
  });

  const handleShare = (platform: string, post: BlogPost) => {
    const url = window.location.href;
    const text = `Check out this Vedic Astrology insight: "${post.title}"`;
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else {
      navigator.clipboard.writeText(url);
      showToast('Article link copied to clipboard!', 'info');
    }
  };

  return (
    <section id="blog-section" className="py-14 bg-slate-950 text-slate-100 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Jyotish Grantha & Research</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-2">
            Vedic Astrology & Planetary Insights
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Scholarly articles on Gochar transits, Dasha periods, and sattvic remedial sciences.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilterCategory(c)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                filterCategory === c
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {c === 'all' ? 'All Publications' : c}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm text-amber-300 text-[10px] font-semibold uppercase px-2.5 py-1 rounded-md border border-amber-500/30">
                    {post.category}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {post.publishedDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-base font-bold text-white hover:text-amber-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                  <User className="w-3 h-3 text-amber-400" />
                  {post.author}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 text-xs cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="relative h-60 overflow-hidden">
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-950/80 text-white hover:bg-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 bg-amber-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-md">
                {selectedPost.category}
              </div>
            </div>

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs sm:text-sm">
              <div className="flex items-center gap-4 text-xs text-slate-400 pb-2 border-b border-slate-800">
                <span>By {selectedPost.author}</span>
                <span>•</span>
                <span>{selectedPost.publishedDate}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>

              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200">
                {selectedPost.title}
              </h2>

              <p className="text-slate-300 leading-relaxed font-serif italic bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                "{selectedPost.excerpt}"
              </p>

              <div className="text-slate-300 leading-relaxed whitespace-pre-line pt-2">
                {selectedPost.content}
              </div>

              {/* Tags & Social sharing */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tags: {selectedPost.tags.join(', ')}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-[11px]">Share:</span>
                  <button
                    onClick={() => handleShare('twitter', selectedPost)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
                    title="Twitter"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleShare('facebook', selectedPost)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
                    title="Facebook"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin', selectedPost)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleShare('copy', selectedPost)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
                    title="Copy Link"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
