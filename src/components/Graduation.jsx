import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Users, Star, X, Image as ImageIcon, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const stats = [
  { id: 1, value: "250+", label: "Graduates", icon: <Users size={20} className="text-primary" /> },
  { id: 2, value: "40+", label: "Industry Guests", icon: <Star size={20} className="text-primary" /> },
  { id: 3, value: "25+", label: "Awards Presented", icon: <Award size={20} className="text-primary" /> }
];

const highlights = [
  "Graduation Ceremony",
  "Certificate Distribution",
  "Stage Moments & Speeches",
  "Group Class Photos",
  "Live Performances",
  "Closing Ceremony Celebration"
];

const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    title: "Graduation Ceremony",
    description: "Caps fly high as our graduates celebrate their hard work and success."
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
    title: "Certificate Distribution",
    description: "Students receive their official Ignite Talents acting diplomas."
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?q=80&w=800&auto=format&fit=crop",
    title: "Stage Moments & Speeches",
    description: "Inspiring speeches from industry guests and our founder Ms. Thaara Umesh."
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
    title: "Group Class Photos",
    description: "Graduates of the recent batches posing together on stage."
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop",
    title: "Live Performances",
    description: "Students showcasing their acting skills in live monologue performances."
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
    title: "Closing Ceremony",
    description: "Vibrant and celebratory moments marking the end of the event."
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    title: "Stage Drama",
    description: "Theater and screen presence demonstration by upcoming artists."
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop",
    title: "Celebration & Lighting",
    description: "Premium visual design and stage lighting for the graduation ceremony."
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1492534513006-37715f336a39?q=80&w=800&auto=format&fit=crop",
    title: "Industry Networking",
    description: "Graduates connecting with directors, photographers, and casting agents."
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    title: "Awards Ceremony",
    description: "Honoring outstanding performers in acting, modeling, and presence."
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    title: "Graduation Moments",
    description: "Smiles and joy all around as the new batches step out prepared for the industry."
  },
  {
    id: 12,
    url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
    title: "Founder's Address",
    description: "A warm and encouraging speech by Thaara Umesh to her graduating students."
  }
];

const Graduation = () => {
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <section className="py-20 px-4 sm:px-6 bg-secondary/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-[-10%] w-[450px] h-[450px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-rose-200/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Title */}
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-primary text-xs font-bold tracking-widest mb-3 uppercase">CELEBRATING SUCCESS</p>
          <h2 className="text-3xl md:text-5xl font-black text-dark inline-block relative uppercase tracking-wider">
            IGNITE GRADUATION DAY EVENT
            <span className="absolute -bottom-3 left-0 w-full h-1 bg-primary/20 rounded-full"></span>
            <span className="absolute -bottom-3 left-1/4 w-1/2 h-1 bg-primary rounded-full"></span>
          </h2>
          <p className="max-w-2xl mx-auto text-dark/60 text-sm sm:text-base font-light leading-relaxed mt-6">
            A grand milestone celebrating the journey of our talented acting and modeling graduates as they receive recognition and step into the professional spotlight.
          </p>
        </div>

        {/* Highlights and Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-stretch">

          {/* Left Column: Stats & Highlights cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6" data-aos="fade-right">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map(stat => (
                <div key={stat.id} className="bg-white border border-black/5 rounded-2xl p-4 sm:p-5 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-3">
                    {stat.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-primary mb-1">{stat.value}</h3>
                  <p className="text-[10px] sm:text-xs text-dark/50 font-bold uppercase tracking-wider leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Highlights List Card */}
            <div className="bg-white border border-black/5 rounded-3xl p-6 sm:p-8 flex-grow text-left flex flex-col justify-center relative overflow-hidden shadow-sm">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>

              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={16} className="text-primary" />
                <h4 className="font-serif text-dark font-black text-lg sm:text-xl uppercase tracking-wider">Event Highlights</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3 group hover:translate-x-1.5 transition-transform duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                    <span className="text-dark/80 text-xs sm:text-sm font-semibold">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Mini Promo / Hero Image */}
          <div className="lg:col-span-7" data-aos="fade-left">
            <div className="relative w-full h-full min-h-[300px] rounded-3xl overflow-hidden shadow-lg border border-black/5 bg-black">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop"
                alt="Graduation Showcase"
                className="w-full h-full object-cover opacity-80 hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <h3 className="text-white font-serif text-xl sm:text-2xl font-black mb-2 uppercase tracking-wide">Igniting Careers</h3>
                <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed max-w-lg">
                  Every batch represents a commitment to high production standards, shaping skilled talents who understand camera presence, technique, and on-set etiquette.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Gallery Heading */}
        <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-8" data-aos="fade-up">
          <div className="flex items-center gap-2">
            <ImageIcon size={18} className="text-primary" />
            <h3 className="text-dark font-serif font-black text-xl uppercase tracking-wider">Graduation Gallery</h3>
          </div>
          <span className="text-[10px] text-dark/40 font-bold uppercase tracking-widest hidden sm:inline-block">12 Moments in Spotlight</span>
        </div>

        {/* Masonry / Responsive Grid Photo Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg border border-black/5 bg-secondary/50"
              onClick={() => setActivePhoto(image)}
            >
              <img
                src={image.url}
                alt={image.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                <h4 className="text-white font-serif font-bold text-sm mb-1 uppercase tracking-wide translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {image.title}
                </h4>
                <p className="text-white/70 text-[10px] font-light leading-snug line-clamp-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {image.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-16 text-center" data-aos="fade-up">
          <button
            onClick={() => {
              if (galleryImages.length > 0) {
                setActivePhoto(galleryImages[0]);
              }
            }}
            className="px-8 py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/20 bg-primary text-white font-bold text-xs tracking-widest uppercase"
          >
            VIEW EVENT GALLERY
          </button>
        </div>

      </div>

      {/* Lightbox Popup Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-sm"
          >
            {/* Close trigger area */}
            <div className="absolute inset-0" onClick={() => setActivePhoto(null)}></div>

            {/* Lightbox Frame */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative max-w-4xl w-full bg-zinc-950 rounded-3xl overflow-hidden border border-white/10 z-10 shadow-2xl flex flex-col md:flex-row items-stretch"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white bg-black/75 p-2 rounded-full z-20 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <X size={20} />
              </button>

              {/* Photo Side */}
              <div className="relative flex-grow flex items-center justify-center bg-black min-h-[300px] max-h-[70vh] md:max-h-[80vh] overflow-hidden">
                {/* Left Overlay Arrow */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const idx = galleryImages.findIndex(i => i.id === activePhoto.id);
                    const prevIdx = idx === 0 ? galleryImages.length - 1 : idx - 1;
                    setActivePhoto(galleryImages[prevIdx]);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-primary/95 text-white p-2.5 rounded-full border border-white/10 hover:scale-105 active:scale-95 transition-all duration-300 z-20 shadow-md group"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>

                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain max-h-[70vh]"
                />

                {/* Right Overlay Arrow */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const idx = galleryImages.findIndex(i => i.id === activePhoto.id);
                    const nextIdx = idx === galleryImages.length - 1 ? 0 : idx + 1;
                    setActivePhoto(galleryImages[nextIdx]);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-primary/95 text-white p-2.5 rounded-full border border-white/10 hover:scale-105 active:scale-95 transition-all duration-300 z-20 shadow-md group"
                  aria-label="Next image"
                >
                  <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Text / Highlights Info Side */}
              <div className="p-6 md:p-8 md:w-[320px] shrink-0 text-left bg-gradient-to-br from-[#9b0b16] to-[#70070e] border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-center text-white relative overflow-hidden">
                {/* Spotlight Background decoration */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none"></div>

                <div className="flex items-center gap-1.5 mb-3 text-yellow-300 font-bold text-[9px] tracking-widest uppercase">
                  <Sparkles size={12} />
                  <span>Graduation Moment</span>
                </div>
                <h2 className="text-white font-serif font-black text-xl mb-3 uppercase tracking-wide">{activePhoto.title}</h2>
                <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed mb-6">{activePhoto.description}</p>
                <div className="mt-auto pt-4 border-t border-white/10 flex gap-2 z-10">
                  <button
                    onClick={() => {
                      const idx = galleryImages.findIndex(i => i.id === activePhoto.id);
                      const prevIdx = idx === 0 ? galleryImages.length - 1 : idx - 1;
                      setActivePhoto(galleryImages[prevIdx]);
                    }}
                    className="flex-grow py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold tracking-widest text-center uppercase transition-colors"
                  >
                    <span className="flex items-center justify-center gap-1">
                      <ChevronLeft size={13} />
                      PREV
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      const idx = galleryImages.findIndex(i => i.id === activePhoto.id);
                      const nextIdx = idx === galleryImages.length - 1 ? 0 : idx + 1;
                      setActivePhoto(galleryImages[nextIdx]);
                    }}
                    className="flex-grow py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-dark font-black text-[10px] tracking-widest text-center uppercase transition-colors shadow-md shadow-black/10"
                  >
                    <span className="flex items-center justify-center gap-1">
                      NEXT
                      <ChevronRight size={13} />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Graduation;
