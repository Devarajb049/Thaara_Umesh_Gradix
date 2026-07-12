import React from 'react';
import { Award, Star, Users, BookOpen, GraduationCap } from 'lucide-react';

const ActingSchoolContent = () => {
  const cards = [
    {
      text: "From her observations during the shoots, lack of understanding of the concepts and struggling to emote to the role by the models, many takes were being taken for a single shot and the shoots had to be extended and this resulted in escalated cost of Production.",
      name: "The Production Challenge",
      role: "Why Ignite Talent was founded",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      bgColor: "bg-orange-50/80 border border-orange-100",
      align: "left"
    },
    {
      text: "So she felt the need for Professionally trained models and actors. The result, IGNITE TALENT was born. With over 3 decades in the industry and with the experience of over 1000 Auditions, there's no better person than Thaara who fitted the bill to take over the mantle and start a School.",
      name: "Thaara Umesh",
      role: "Casting Director & Founder",
      image: "/images/team/thaara_umesh.avif",
      bgColor: "bg-teal-50/80 border border-teal-100",
      align: "right"
    },
    {
      text: "4 Batches of students have already passed out of the School from May 2022 to January, 2023. With her vast network of expert talents in the industry, she has roped in leading Photographers, Cinematographers, Directors, Ad Film makers and many other experts in various fields as Guest Teachers and is creating trained talent.",
      name: "Graduates & Experts",
      role: "Industry Placements",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
      bgColor: "bg-blue-50/80 border border-blue-100",
      align: "left"
    }
  ];

  return (
    <section className="py-20 px-6 bg-secondary/30 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-200/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: UI Testimonial Cards */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {cards.map((card, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className={`flex flex-col md:flex-row bg-white rounded-3xl p-6 md:p-8 border border-black/5 shadow-[0_15px_45px_rgba(0,0,0,0.03)] gap-6 md:gap-8 items-center relative overflow-visible ${
                  card.align === 'right' ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Image Container with Dotted Offset Background */}
                <div className="relative w-36 h-36 md:w-44 md:h-44 flex-shrink-0 z-10">
                  {/* Dotted Grid Background */}
                  <div className={`absolute w-16 h-16 pointer-events-none opacity-40 z-0 bg-[radial-gradient(#881b16_1.5px,transparent_1.5px)] [background-size:6px_6px] ${
                    card.align === 'right' ? '-bottom-3 -left-3' : '-top-3 -right-3'
                  }`}></div>

                  <div className={`w-full h-full rounded-2xl overflow-hidden ${card.bgColor} p-1 flex items-end justify-center shadow-inner relative z-10`}>
                    <img 
                      src={card.image} 
                      alt={card.name} 
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/400x400/ebe3d8/1a1a1a?text=Model";
                      }}
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col flex-grow text-left">
                  <p className="text-dark/85 text-sm md:text-base leading-relaxed mb-6 font-light italic">
                    "{card.text}"
                  </p>
                  <div>
                    <h4 className="text-dark font-serif font-bold text-base md:text-lg mb-0.5">{card.name}</h4>
                    <p className="text-primary text-[11px] font-bold tracking-widest uppercase">{card.role}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Highlighted Summary Statement Card */}
            <div 
              data-aos="fade-up"
              className="bg-primary text-white rounded-3xl p-8 border border-white/10 shadow-xl shadow-primary/10 relative overflow-hidden text-left"
            >
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/5 blur-2xl rounded-full"></div>
              <p className="font-serif text-lg md:text-xl leading-relaxed relative z-10 font-light">
                "In short, Thaara is a leading Casting Director and a Veteran Model Coordinator in the National horizon, across the spectrum of products and segments of industries, a Professional Shooting House Proprietor, provider of Trained Models and Actors from her School - Ignite Talents. A truly Integrated Service Provider for the Advertising & Entertainment Industry."
              </p>
            </div>
          </div>

          {/* Right Column: Sticky Page Header & Features List */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div data-aos="fade-down" className="text-left">
              {/* Logo block */}
              <div className="inline-block p-4 rounded-3xl bg-white border border-black/5 shadow-md mb-8">
                <img 
                  src="/images/logos/ignite.png" 
                  alt="Ignite Talent Logo" 
                  className="h-16 md:h-20 object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/Thaara_Umesh_Logo.png";
                  }}
                />
              </div>

              {/* Headings */}
              <p className="text-primary text-xs font-bold tracking-widest mb-3 uppercase">Model / Acting School</p>
              <h2 className="text-4xl md:text-5xl font-serif text-dark font-bold uppercase mb-4 leading-tight tracking-wide">
                IGNITE TALENT
              </h2>
              <p className="text-dark/60 text-base md:text-lg leading-relaxed font-light mb-10">
                Bridging the gap in production by shaping professionally trained models and actors equipped with the knowledge, technique, and range to succeed.
              </p>

              {/* Feature List */}
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-start group hover:translate-x-1.5 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="text-dark font-serif font-bold text-base mb-1">3+ Decades in the Industry</h4>
                    <p className="text-dark/60 text-xs md:text-sm leading-relaxed">Direct mentorship from casting director Thaara Umesh.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group hover:translate-x-1.5 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Star size={20} />
                  </div>
                  <div>
                    <h4 className="text-dark font-serif font-bold text-base mb-1">1000+ Auditions Conducted</h4>
                    <p className="text-dark/60 text-xs md:text-sm leading-relaxed">Experience-driven training to crack casting calls easily.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group hover:translate-x-1.5 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="text-dark font-serif font-bold text-base mb-1">Guest Expert Lectures</h4>
                    <p className="text-dark/60 text-xs md:text-sm leading-relaxed">Lectures by top ad-filmmakers, cinematographers & photographers.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group hover:translate-x-1.5 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 className="text-dark font-serif font-bold text-base mb-1">Proven Success Rate</h4>
                    <p className="text-dark/60 text-xs md:text-sm leading-relaxed">4 successful batches of talent passed out and working in media.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ActingSchoolContent;
