import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import SEOHead from "@/components/SEOHead";
import galleryBanner from "@/assets/gallery-banner.png";

interface GalleryItem {
  id: number;
  styleName: string;
  description: string;
  price: string;
  image: string;
}

const galleryItems: GalleryItem[] = [];

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

  const openLightbox = (item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    setLightboxIndex(-1);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (galleryItems.length === 0) return;
    const newIndex =
      direction === "next"
        ? (lightboxIndex + 1) % galleryItems.length
        : (lightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    setLightboxIndex(newIndex);
    setSelectedItem(galleryItems[newIndex]);
  };

  return (
    <>
      <SEOHead
        title="Gallery | Tezzaz Hair & Beauty Studio Nairobi"
        description="Browse our gallery of stunning hair designs, braids, locs, and nail art by Tezzaz Hair Nairobi."
      />
      <Navbar />

      {/* Thin Banner */}
      <div className="relative w-full h-[180px] sm:h-[220px] overflow-hidden">
        <img
          src={galleryBanner}
          alt="Tezzaz Hair Gallery"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center">
            <p className="font-body text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[hsl(var(--gold))] mb-2">Our Work</p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-bold">Gallery</h1>
            <p className="font-body text-xs sm:text-sm text-white/60 mt-2 max-w-md mx-auto">
              Browse our latest hairdressing designs and transformations
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Masonry Grid */}
      <section className="bg-[#FAFAFA] py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          {galleryItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-gray-300">✦</span>
              </div>
              <h3 className="font-display text-xl font-bold text-black mb-2">Gallery Coming Soon</h3>
              <p className="font-body text-sm text-gray-400 max-w-md mx-auto">
                Our stunning hair designs will be showcased here shortly. Stay tuned for amazing transformations!
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {galleryItems.map((item, index) => (
                <div
                  key={item.id}
                  className="break-inside-avoid group cursor-pointer overflow-hidden rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
                  onClick={() => openLightbox(item, index)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.styleName}
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-display">
                        ✦
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-sm font-bold text-black mb-1 truncate">{item.styleName}</h3>
                    {item.description && (
                      <p className="font-body text-xs text-gray-500 line-clamp-2 mb-2">{item.description}</p>
                    )}
                    {item.price && (
                      <p className="font-display text-sm font-bold text-[hsl(var(--gold-dark))]">{item.price}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox / Zoom Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
          >
            <X className="w-7 h-7" />
          </button>

          {galleryItems.length > 1 && (
            <>
              <button
                onClick={() => navigateLightbox("prev")}
                className="absolute left-4 text-white/70 hover:text-white transition-colors z-10"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={() => navigateLightbox("next")}
                className="absolute right-4 text-white/70 hover:text-white transition-colors z-10"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <div className="max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-lg">
            <img
              src={selectedItem.image}
              alt={selectedItem.styleName}
              className="w-full max-h-[70vh] object-contain bg-black"
            />
            <div className="bg-white p-5">
              <h3 className="font-display text-lg font-bold text-black mb-1">{selectedItem.styleName}</h3>
              {selectedItem.description && (
                <p className="font-body text-sm text-gray-500 mb-2">{selectedItem.description}</p>
              )}
              {selectedItem.price && (
                <p className="font-display text-lg font-bold text-[hsl(var(--gold-dark))]">{selectedItem.price}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <FooterSection />
    </>
  );
};

export default Gallery;
