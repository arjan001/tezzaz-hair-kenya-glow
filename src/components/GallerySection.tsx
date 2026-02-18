import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import aboutSalon from "@/assets/about-salon.jpg";
import serviceNatural from "@/assets/service-natural.jpg";
import serviceMakeup from "@/assets/service-makeup.jpg";
import heroSalon from "@/assets/hero-salon.jpg";

const galleryItems = [
  { src: heroSalon, alt: "Hair salon session Nairobi", className: "col-span-2 row-span-2" },
  { src: gallery1, alt: "Locs styling Kenya", className: "col-span-1 row-span-1" },
  { src: gallery2, alt: "Natural hair twist", className: "col-span-1 row-span-1" },
  { src: gallery3, alt: "Sleek blowout", className: "col-span-1 row-span-1" },
  { src: gallery4, alt: "Colourful braids", className: "col-span-1 row-span-1" },
  { src: aboutSalon, alt: "Braided style", className: "col-span-1 row-span-1" },
  { src: serviceNatural, alt: "Natural afro", className: "col-span-1 row-span-1" },
  { src: serviceMakeup, alt: "Makeup session", className: "col-span-1 row-span-1" },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="bg-cream section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-display italic text-gold text-xl mb-2">Gallery</p>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-bold mb-3">
            Explore Our <span className="text-gold">Gallery</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto" />
        </div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-4 grid-rows-3 gap-3 h-[600px]">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`overflow-hidden group cursor-pointer relative ${item.className}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300 flex items-center justify-center">
                <span className="text-cream text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">✦</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
