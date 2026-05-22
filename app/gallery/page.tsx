"use client";

import { useState, useEffect } from 'react';
import { Sparkles, Image as ImageIcon, Heart, ZoomIn } from 'lucide-react';
import api from '../../lib/api';

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await api.get('/gallery');
        setGalleryItems(data);
      } catch (error) {
        console.error('Failed to fetch gallery items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="bg-[#FAF9F6] min-h-screen font-sans pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title block */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-[#B87A3D]" />
            <span className="text-[10px] font-bold text-[#B87A3D] uppercase tracking-[0.2em]">Our Moments</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#0B132B] font-medium italic mb-4">Lumina Gallery</h1>
          <p className="text-slate-500 font-light text-sm">
            Step inside our beautifully lit, private social gatherings. Fostering warm atmospheres, safe connections, and genuine new chapters.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {['all', 'dinners', 'mixers', 'workshops'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 border ${
                filter === cat
                  ? 'bg-[#0B132B] text-white border-[#0B132B] shadow-md'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B132B]"></div>
            </div>
          ) : filteredItems.map((item) => (
            <div key={item._id || item.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 relative border border-slate-100">
              <div className="relative overflow-hidden h-72">
                <img
                  src={item.image || item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <span className="text-[9px] font-bold text-[#B87A3D] uppercase tracking-wider block mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif italic text-lg font-semibold text-[#0B132B] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm max-w-md mx-auto">
            <ImageIcon className="h-10 w-10 text-slate-300 mx-auto mb-4" />
            <h3 className="font-bold text-slate-700 mb-1">No Moments Found</h3>
            <p className="text-xs text-slate-400">We are uploading new fairy-lit memories soon.</p>
          </div>
        )}

      </div>
    </div>
  );
}
