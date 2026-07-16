import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, Quote, Sparkles } from 'lucide-react';
import { useData } from '../admin/context/DataContext';

// Hardcoded testimonialsData removed. Now loaded dynamically from MySQL.

export const TestimonialCard = ({ testimonial, onSelect }) => {
  const isLongText = testimonial.review.length > 170;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5, boxShadow: "0 20px 45px rgba(155, 11, 22, 0.3)", borderColor: "rgba(255, 255, 255, 0.25)" }}
      onClick={() => onSelect(testimonial)}
      className="relative p-6 rounded-3xl bg-gradient-to-br from-[#9b0b16] to-[#70070e] border border-white/10 flex flex-col justify-between h-full group text-white transition-all duration-300 shadow-[0_15px_35px_rgba(155,11,22,0.15)] cursor-pointer select-none"
    >
      {/* Watermark Quote Icon */}
      <div className="absolute top-4 right-6 text-white/[0.04] pointer-events-none select-none">
        <Quote size={54} />
      </div>

      <div className="flex flex-col gap-4 flex-grow">
        {/* Profile Details Header */}
        <div className="flex items-center gap-3.5 border-b border-white/10 pb-3.5">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/60 shadow-sm bg-white/10 flex-shrink-0">
            <img
              src={testimonial.profileImage}
              alt={testimonial.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/100x100/ffffff/9b0b16?text=" + testimonial.name[0];
              }}
            />
          </div>
          <div className="text-left">
            <h4 className="text-[13px] font-serif font-black tracking-wide text-white uppercase">{testimonial.name}</h4>
            <p className="text-[9px] text-white/70 font-bold tracking-wider uppercase mt-0.5">{testimonial.profession}</p>
          </div>
        </div>

        {/* Clamped review text */}
        <div className="flex-grow text-left">
          <p className="text-white/95 text-[12px] sm:text-xs leading-relaxed text-justify font-normal select-text">
            {isLongText ? (
              <>
                "{testimonial.review.slice(0, 160)}..."
                <span className="text-yellow-300 hover:text-yellow-400 font-bold ml-1 hover:underline text-[11px] transition-colors cursor-pointer">
                  Read More
                </span>
              </>
            ) : (
              `"${testimonial.review}"`
            )}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between gap-4">
        {/* Stars */}
        <div className="flex text-yellow-300 text-xs gap-0.5 select-none" aria-label="5 star rating">
          ★★★★★
        </div>

        {/* Small Ignite Logo Pill */}
        <div className="bg-white px-2.5 py-1 rounded-lg border border-white/15 flex items-center gap-1.5 max-w-[95px]">
          <img
            src={testimonial.logo}
            alt="Ignite Logo"
            loading="lazy"
            className="h-3 w-auto object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <span className="text-[#e8256a] font-black tracking-wider text-[7px] uppercase mt-0.5 select-none">IGNITE</span>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const { testimonials } = useData();
  const activeTestimonials = testimonials.map(t => ({
    id: t.id,
    name: t.personName,
    profession: t.designation || 'Student',
    review: t.review,
    profileImage: t.photo,
    logo: "/images/logos/ignite.png"
  }));

  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const scrollContainerRef = useRef(null);

  // Group testimonials into pairs of 2 for mobile stacked layout
  const chunkedTestimonials = [];
  for (let i = 0; i < activeTestimonials.length; i += 2) {
    chunkedTestimonials.push(activeTestimonials.slice(i, i + 2));
  }

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#fdfaf9] relative overflow-hidden">

      {/* Decorative blurs */}
      <div className="absolute top-0 left-[-10%] w-[350px] h-[350px] bg-primary/5 rounded-full filter blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] bg-rose-200/5 rounded-full filter blur-[90px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Title */}
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-primary text-xs font-bold tracking-widest mb-3 uppercase">Words of Praise</p>
          <h2 className="text-3xl md:text-5xl font-serif text-dark font-medium uppercase tracking-wider">
            TESTIMONIALS
          </h2>
        </div>

        {/* Desktop/Tablet Layout: Responsive Grid (compact, equal height) */}
        <div className="hidden md:grid grid-cols-2 xl:grid-cols-3 gap-6">
          {activeTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="h-full">
              <TestimonialCard testimonial={testimonial} onSelect={setSelectedTestimonial} />
            </div>
          ))}
        </div>

        {/* Mobile Layout: Swipe Carousel (snap horizontal scroll, stacked 2-high) */}
        <div className="md:hidden relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 scrollbar-none pb-6 px-2 scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {chunkedTestimonials.map((pair, pairIdx) => (
              <div
                key={pairIdx}
                className="w-[85vw] sm:w-[50vw] md:w-[45vw] flex-shrink-0 snap-center snap-always flex flex-col gap-6"
              >
                {pair.map((testimonial) => (
                  <div key={testimonial.id} className="flex-grow">
                    <TestimonialCard testimonial={testimonial} onSelect={setSelectedTestimonial} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-1.5 mt-2">
            <span className="text-[10px] text-dark/40 uppercase tracking-widest font-bold select-none animate-pulse">
              ← Swipe to view more →
            </span>
          </div>
        </div>

      </div>

      {/* Lightbox / Read More Modal popup */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          >
            <div className="absolute inset-0" onClick={() => setSelectedTestimonial(null)}></div>

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative max-w-lg w-full bg-gradient-to-br from-[#9b0b16] to-[#70070e] text-white rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(155,11,22,0.5)] border border-white/20 z-10 text-left overflow-hidden"
            >
              {/* Decorative Background Spotlight */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors z-20 hover:scale-105 active:scale-95"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3.5 border-b border-white/10 pb-4 mb-5">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/40 shadow-sm bg-white/10 flex-shrink-0">
                  <img
                    src={selectedTestimonial.profileImage}
                    alt={selectedTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-black tracking-wide text-white uppercase">{selectedTestimonial.name}</h4>
                  <p className="text-[10px] text-white/70 font-bold tracking-wider uppercase mt-0.5">{selectedTestimonial.profession}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex text-yellow-300 text-xs gap-0.5 mb-4 select-none">
                ★★★★★
              </div>

              {/* Scrollable testimonial text */}
              <div className="max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin select-text">
                <p className="text-white/90 text-[13px] sm:text-sm leading-relaxed text-justify font-normal whitespace-pre-wrap">
                  "{selectedTestimonial.review}"
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-white/80 text-[10px] font-bold tracking-widest uppercase">
                  <Sparkles size={12} className="text-yellow-300" />
                  <span>Success Vouch</span>
                </div>
                <div className="bg-white px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
                  <img
                    src={selectedTestimonial.logo}
                    alt="Ignite Logo"
                    className="h-3.5 w-auto object-contain"
                  />
                  <span className="text-[#e8256a] font-black tracking-wider text-[7px] uppercase mt-0.5">IGNITE</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
