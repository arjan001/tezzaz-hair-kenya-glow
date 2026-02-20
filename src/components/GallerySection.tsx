import { useMemo } from "react";
import { Loader2 } from "lucide-react";
import { useGallery } from "@/integrations/supabase/hooks/useGallery";

const galleryLayout = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
];

const GallerySection = () => {
  const { data: dbItems = [], isLoading } = useGallery();
  const galleryItems = useMemo(() => (
    dbItems.slice(0, galleryLayout.length).map((item, index) => ({
      src: item.image_url,
      alt: item.style_name,
      className: galleryLayout[index],
    }))
  ), [dbItems]);

  return (
    <section id="gallery" className="bg-black section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-[hsl(var(--gold))] mb-2">Our Work</p>
            <h2 className="font-display text-4xl md:text-5xl text-white font-bold">
              Gallery
            </h2>
          </div>
        </div>

        {/* Mosaic Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-[300px]">
            <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
          </div>
        ) : galleryItems.length === 0 ? (
          <div className="border border-white/10 rounded-lg h-[300px] flex items-center justify-center text-center px-6">
            <div>
              <p className="font-display text-xl text-white mb-2">Gallery coming soon</p>
              <p className="font-body text-sm text-white/60">Upload styles in the admin to populate this section.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 grid-rows-3 gap-2 h-[600px]">
            {galleryItems.map((item, i) => (
              <div
                key={`${item.src}-${i}`}
                className={`overflow-hidden group cursor-pointer relative ${item.className}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-display">✦</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
