import aboutImage from "@/assets/about-salon.jpg";
import { CheckCircle } from "lucide-react";

const highlights = [
  "Certified African Hair Specialists",
  "Premium Organic Products",
  "Relaxing Luxury Experience",
  "Serving Nairobi since 2016",
];

const AboutSection = () => {
  return (
    <section id="about" className="bg-charcoal section-padding">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className="relative">
          <img
            src={aboutImage}
            alt="About Tezzaz Hair Salon - Nairobi Kenya"
            className="w-full h-[550px] object-cover object-top"
          />
          {/* Gold border accent */}
          <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold -z-0 pointer-events-none" />
          {/* Experience badge */}
          <div className="absolute -top-6 -left-6 bg-gold px-6 py-4 text-center">
            <p className="font-display text-cream text-3xl font-bold">8+</p>
            <p className="font-body text-cream text-xs uppercase tracking-widest">Years of<br />Excellence</p>
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="font-display italic text-gold text-xl mb-3">About Us</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream font-bold mb-6 leading-tight">
            Where African Beauty<br />
            <span className="text-gold">Meets Artistry</span>
          </h2>
          <p className="font-body text-cream/70 text-lg mb-6 leading-relaxed">
            At Tezzaz Hair, we celebrate the richness and diversity of African hair. Located in the heart of Nairobi, our expert stylists are dedicated to bringing out the natural beauty in every woman who walks through our doors.
          </p>
          <p className="font-body text-cream/70 mb-8 leading-relaxed">
            From natural styles to protective hairstyles, we use premium products tailored for African hair textures. We believe every woman deserves to feel confident, beautiful, and celebrated.
          </p>

          <ul className="space-y-3 mb-10">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="font-body text-cream/80">{item}</span>
              </li>
            ))}
          </ul>

          <button className="bg-gold text-cream font-body text-sm tracking-widest uppercase px-10 py-4 hover:bg-gold-dark transition-colors duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
