import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import { Instagram, Facebook } from "lucide-react";

const teamMembers = [
  { img: team1, name: "Amara Njeri", role: "Senior Hair Stylist", img_pos: "object-top" },
  { img: team2, name: "Faith Akinyi", role: "Nail Technician", img_pos: "object-top" },
  { img: team3, name: "Grace Wambui", role: "Beauty & Makeup Artist", img_pos: "object-top" },
  { img: team4, name: "Sandra Kamau", role: "Skin Care Therapist", img_pos: "object-top" },
];

const TeamSection = () => {
  return (
    <section id="team" className="bg-charcoal section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-display italic text-gold text-xl mb-2">Team Members</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream font-bold mb-3">
            Our Experienced <span className="text-gold">Specialists</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto" />
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="group relative overflow-hidden">
              {/* Photo */}
              <div className="overflow-hidden h-72 md:h-80">
                <img
                  src={member.img}
                  alt={member.name}
                  className={`w-full h-full object-cover ${member.img_pos} group-hover:scale-105 transition-transform duration-500`}
                />
              </div>

              {/* Gold bottom bar */}
              <div className="bg-gold px-4 py-3 text-center">
                <h4 className="font-display text-cream font-bold text-base">{member.name}</h4>
                <p className="font-body text-cream/80 text-xs uppercase tracking-wider mt-0.5">{member.role}</p>
              </div>

              {/* Social hover overlay */}
              <div className="absolute inset-0 bg-charcoal/70 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-4">
                  <a href="#" className="border border-cream p-2 hover:bg-gold hover:border-gold transition-all">
                    <Facebook className="w-4 h-4 text-cream" />
                  </a>
                  <a href="#" className="border border-cream p-2 hover:bg-gold hover:border-gold transition-all">
                    <Instagram className="w-4 h-4 text-cream" />
                  </a>
                </div>
                <p className="font-body text-cream text-xs tracking-widest uppercase">View Profile</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
