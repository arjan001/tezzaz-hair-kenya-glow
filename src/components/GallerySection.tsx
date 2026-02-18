import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import aboutSalon from "@/assets/about-salon.jpg";
import serviceNatural from "@/assets/service-natural.jpg";

const galleryImages = [
  { src: gallery1, alt: "Locs hairstyle Nairobi Kenya", span: "col-span-1 row-span-2" },
  { src: gallery2, alt: "Twist out natural hair Kenya", span: "col-span-1 row-span-1" },
  { src: gallery3, alt: "Sleek blowout Nairobi salon", span: "col-span-1 row-span-1" },
  { src: gallery4, alt: "Colourful highlights Kenya salon", span: "col-span-1 row-span-1" },
  { src: aboutSalon, alt: "Box braids Nairobi", span: "col-span-1 row-span-1" },
  { src: serviceNatural, alt: "Natural afro styling Kenya", span: "col-span-1 row-span-1" },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="bg-charcoal section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-display italic text-gold text-xl mb-3">Our Work</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream font-bold mb-4">
            Hair <span className="text-gold">Gallery</span>
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mb-4" />
          <p className="font-body text-cream/60 max-w-xl mx-auto">
            Every style tells a story. Browse through our portfolio of beautiful African hair transformations.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[250px]">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className={`overflow-hidden group cursor-pointer ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="border-2 border-gold text-gold font-body text-sm tracking-widest uppercase px-10 py-4 hover:bg-gold hover:text-cream transition-all duration-300">
            View Full Gallery
          </button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
