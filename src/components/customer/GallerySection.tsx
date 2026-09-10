import { Image as ImageIcon, Sparkles, X } from 'lucide-react';
import React, { useState } from 'react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g0',
      title: 'Mata Sri Poornima in Consultation',
      category: 'Sanctuary',
      imageUrl: '/poornima_astrologer.jpg',
      description: 'Mata Sri Poornima presiding over Vedic Janam Kundli and Vivah Milan consultations at Jubilee Hills, Hyderabad.',
    },
    {
      id: 'g1',
      title: 'Hyderabad Jubilee Hills Sanctuary',
      category: 'Sanctuary',
      imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=80',
      description: 'Our serene consultation chamber at Jubilee Hills, Road No. 5, Metro Pillar No. 1571, Hyderabad.',
    },
    {
      id: 'g2',
      title: 'Sacred Rudra Maha Hawan',
      category: 'Pujas',
      imageUrl: 'https://images.unsplash.com/photo-1609358905596-f3317765103a?w=800&auto=format&fit=crop&q=80',
      description: 'Navagraha shanti hawan conducted for pacifying planetary afflictions and inviting prosperity.',
    },
    {
      id: 'g3',
      title: 'Natural Ceylon Yellow Sapphire (Pukhraj)',
      category: 'Gemstones',
      imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
      description: 'Certified unheated Jupiter gemstone energized with sacred Brihaspati Beej Mantra.',
    },
    {
      id: 'g4',
      title: 'Consecrated Gold-Plated Sri Yantra',
      category: 'Yantras',
      imageUrl: 'https://images.unsplash.com/photo-1620619767323-b95a89183081?w=800&auto=format&fit=crop&q=80',
      description: 'Meru Prushtha Sri Yantra engineered with sacred Vedic geometric proportions for spiritual abundance.',
    },
    {
      id: 'g5',
      title: 'Vedic Puja & Aarti at Dusk',
      category: 'Sanctuary',
      imageUrl: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=800&auto=format&fit=crop&q=80',
      description: 'The auspicious evening aarti and prayer ceremony for patron wellbeing and peace.',
    },
    {
      id: 'g6',
      title: 'Ancient Palm Leaf & Bhojpatra Yantras',
      category: 'Yantras',
      imageUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?w=800&auto=format&fit=crop&q=80',
      description: 'Handwritten astrological talismans inscribed during auspicious Pushya Nakshatra.',
    },
  ];

  const categories = ['all', 'Sanctuary', 'Pujas', 'Gemstones', 'Yantras'];

  const filteredItems = galleryItems.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section id="gallery-section" className="py-14 bg-slate-900 text-slate-100 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Sacred Visuals</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-2">
            Sanctuary & Remedial Gallery
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A glimpse into our Jubilee Hills sanctum, authentic Vedic consultations, and certified sacred remedial assets.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeCategory === c
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {c === 'all' ? 'All Glimpses' : c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-amber-500/40 cursor-pointer shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                <span className="text-[10px] text-amber-400 uppercase font-semibold tracking-wider">
                  {item.category}
                </span>
                <h3 className="font-cinzel text-base font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative max-w-3xl w-full bg-slate-900 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-900"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[60vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>
            <div className="p-5 bg-slate-950">
              <span className="text-xs text-amber-400 uppercase font-semibold">
                {selectedImage.category}
              </span>
              <h3 className="font-cinzel text-lg font-bold text-white mt-0.5">
                {selectedImage.title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
