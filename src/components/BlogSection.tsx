import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    img: blog1,
    category: "Hair Care",
    date: "Feb 10, 2025",
    title: "How to Extend the Life of Your Hairstyle",
    excerpt:
      "Tips and tricks from our expert stylists on keeping your hair looking fresh between salon visits. Discover the best products and routines for African hair textures.",
  },
  {
    img: blog2,
    category: "Trends",
    date: "Jan 28, 2025",
    title: "Hottest Hairstyles and Braids Trends in 2025",
    excerpt:
      "From Senegalese twists to knotless braids — here are the most requested protective styles our clients are loving this year at Tezzaz Hair.",
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="bg-charcoal section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-display italic text-gold text-xl mb-2">Latest News</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream font-bold mb-3">
            Hair & Beauty <span className="text-gold">Blog</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div key={post.title} className="group bg-charcoal-light overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="overflow-hidden h-56">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-body text-xs bg-gold text-cream px-3 py-1 uppercase tracking-widest">{post.category}</span>
                  <span className="font-body text-cream/40 text-xs">{post.date}</span>
                </div>
                <h3 className="font-display text-xl text-cream font-bold mb-3 group-hover:text-gold transition-colors">
                  {post.title}
                </h3>
                <p className="font-body text-cream/60 text-sm leading-relaxed mb-6">{post.excerpt}</p>
                <button className="flex items-center gap-2 font-body text-xs tracking-widest uppercase text-gold hover:gap-4 transition-all duration-200 border-b border-gold pb-0.5">
                  Read More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
