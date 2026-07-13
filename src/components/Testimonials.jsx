import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, Quote, Sparkles } from 'lucide-react';

export const testimonialsData = [
  {
    id: 1,
    name: "Delhi Ganesh",
    profession: "Actor",
    review: "Thara Umesh is a pioneer in the casting industry, I have known her for more than 25 years. She understands the concept and casts the right talent for advertising and movies. I have witnessed her auditioning and seen how professionally she directs and makes any artist feel comfortable and makes them act. She is a very warm and loving human being. Now that she is starting Ignite Talents grooming school with her vast experience, I am sure she will bring out the talents in many upcoming and aspiring models. IGNITE TALENTS is the right place for aspiring talents. I wish all the best to Thaara Umesh and her grooming school.",
    profileImage: "/src/assets/testimonials/delhi-ganesh.jpg",
    logo: "/images/logos/ignite.png"
  },
  {
    id: 2,
    name: "Mohan Raman",
    profession: "Actor",
    review: "I understand that my friend and Model coordinator Thaara Umesh is starting a School - Ignite Talents for aspiring Actors and Models. Her immense knowledge of the Industry and what Ad film makers expect from Talent puts her in the perfect place to give the right inputs and advice, not just in terms of technique but the attitude needed on sets. I wish her the very best in this endeavor and hope she is able to Ignite many talents and send them rocketing to success .",
    profileImage: "/src/assets/testimonials/mohan-raman.jpg",
    logo: "/images/logos/ignite.png"
  },
  {
    id: 3,
    name: "Priya Mani",
    profession: "Actress",
    review: "Tara Umesh is one the first \"modelling coordinator \" I ever worked with in chennai and she was so gracious enough to guide me through my first modelling assignment and from there was no looking back. She even set me up with my very first professional portfolio with her own son Ajai Umesh who now is an even more famous photographer. Tara is a committed woman who knows her craft very well. An excellent judge of character and assignments. She is the one who practically launched my modelling career in the south, and now is all set to start her own grooming school which is called \"IGNITE TALENTS\". All my good wishes to Tara Umesh and her grooming school!!! May it become super successful and may it launch many more new and upcoming",
    profileImage: "/src/assets/testimonials/priya-mani.jpg",
    logo: "/images/logos/ignite.png"
  },
  {
    id: 4,
    name: "Nikki Galrani",
    profession: "Actress",
    review: "Thara Umesh has been a dear friend for more than a decade now. Each year of knowing her has only gotten better than the previous ones. Thara Umesh apart from being a dear one with an aura that makes me feel immensely positive and warm, has also played a vital role in structuring not just my career but a lot of others. Her support has been there throughout and i'm sure for each one of you that is looking to have an amazing experience in the entertainment industry, i could not suggest a place thats more apt than \"Ignite Talents Grooming School\". For all the warmth, support and learning Thara Umesh is definitely the person and Ignite Talents is no doubt the place to be in ❤",
    profileImage: "/src/assets/testimonials/nikki-galrani.jpg",
    logo: "/images/logos/ignite.png"
  },
  {
    id: 5,
    name: "Chinni Jayanth",
    profession: "Actor",
    review: "Hi my dear sister Thara, I know you for more than 20 years now, you are such a hard working woman and also a very talented person. If you start anything, it will be successful. Now I came to know that you're starting \"IGNITE TALENT Grooming school \" It will be a 100% successful project . Always my support and our entire Film Industry support will be with you.. Rock it !!!!! Good luck, Your loving brother",
    profileImage: "/src/assets/testimonials/chinni-jayanth.jpg",
    logo: "/images/logos/ignite.png"
  },
  {
    id: 6,
    name: "Pavithra",
    profession: "Actress",
    review: "Ignite talents grooming school by Thara Umesh mam is the best place in chennai to kickstart your modelling/acting career. Thara mam is like a godmother to me, well actually she is a godmother to a lot of successful models and actors in the city Today. Thara mam has been a big part of my career growth, from grooming, acting and how to personally build myself. So without further delay enroll with the most professionally equipped and knowledgeable trainer in the city. If you are looking for the right path to start your career in media, IGNITE is the right place",
    profileImage: "/src/assets/testimonials/pavithra.jpg",
    logo: "/images/logos/ignite.png"
  },
  {
    id: 7,
    name: "Vidya Pradeep",
    profession: "Actress",
    review: "My journey started with Thaara Mam. She is the one who identified me, prepared me to be a model, and guided me throughout. She is my mentor and family. I was a regular office goer, working at a hospital in Chennai. I had heard a lot about the top model coordinator in Chennai, with more than 30 years of experience. Like any other newcomer I was a bit shy and hesitant to approach Mam, because I was not sure whether she would even consider me as a model. With a lot of doubts and insecurities about myself, I was able to meet her. I was surprised to meet her and receive a warm welcome from her. She was extremely kind and professional, and we had an instant connection. I remember the words she told me, \"There is something in you child, Your eyes are very powerful. \" She explained the details to me with a lot of love and patience. She even taught me how to walk and stand like a model. I am forever grateful to you, Mam. You identified the talent in me, gave me confidence, and encouraged me to pursue my dreams. Today Mam is starting her new venture, \"IGNITE TALENTS\" grooming school. I am sure she will be able to bring out the talents in many aspiring models. Her grooming sessions will help to bring out their best versions of themselves. With her vast experience in this field, Ignite Talents is the best place for you to start your career. My best wishes to all the aspiring models and actors. You guys are lucky to be at the right place at the right time.",
    profileImage: "/src/assets/testimonials/vidya-pradeep.jpg",
    logo: "/images/logos/ignite.png"
  },
  {
    id: 8,
    name: "Jennifer",
    profession: "Casting Director",
    review: "I'm so happy and proud for Mrs.Thaara Umesh who has been my best friend over 35 years as she takes the big step in entering IGNITE TALENTS GROOMING SCHOOL. The talented, hardworking and must to mention the stylish Thaara Umesh is the monopoly of Casting when it comes to South. Over 35 years of experience and exposure, who would beat her to be the best. I encourage all the upcoming models to get trained by this wonderful lady who has the beauty with brains. My best wishes to IGNITE TALENTS and the team. Keep rocking.",
    profileImage: "/src/assets/testimonials/jennifer.jpg",
    logo: "/images/logos/ignite.png"
  },
  {
    id: 9,
    name: "Surya Ganapathy",
    profession: "Model / Actress",
    review: "Thaara aunty played a big role in moulding my modelling career. When I started out as an outsider who wanted to be a model, she gave me my biggest ad campaigns which helped me establish my name in the industry. She not only got me the auditions but also went the extra mile of helping me with the process of delivering a good performance everytime! I owe a lot of my success to her :) Today I am extremely pleased for the students who are now getting a chance to directly be groomed by her. Thaara aunty is a lovely human being, spiritually inclined, extremely professional and always there to guide, help you grow into your better version. Congratulations and my hearty wishes to IGNITE talents - grooming school! All my love.",
    profileImage: "/src/assets/testimonials/surya-ganapathy.jpg",
    logo: "/images/logos/ignite.png"
  },
  {
    id: 10,
    name: "Kunal Daswani",
    profession: "Photographer",
    review: "Tara Umesh has been a stalwart in the industry for decades now. It's always been a pleasure working with her... she is a thorough professional and always brings her 'A' game to everything she does. I wish her all the best with her new venture, Ignite Talents grooming school. I look forward working with the next batch of talented youngsters she grooms.",
    profileImage: "/src/assets/testimonials/kunal-daswani.jpg",
    logo: "/images/logos/ignite.png"
  },
  {
    id: 11,
    name: "Vijay Xavier",
    profession: "Former Vice President & Unit Head, Lintas",
    review: "With 35 years of experience and professional acumen, her contacts and exposure of Professional interaction with the country's top Drectors, Creative Directors, Art Directors and Producers, Thaara is the best person to start a Grooming School and provide the industry with top class professional models. I wish Thaara all the very best and outstanding success in this latest venture of hers.",
    profileImage: "/src/assets/testimonials/vijay-xavier.jpg",
    logo: "/images/logos/ignite.png"
  },
  {
    id: 12,
    name: "Mugen Rao",
    profession: "Actor",
    review: "HI Thaara Umesh ma'am, congratulations on your new venture IGNITE TALENTS grooming school. Working with you for Uber Moto ad was an excellent and great experience for me. I was very glad to see you on set and blessed to have met you. Working with you was an amazing experience, I admire the clarity in your communication, casting and you coordination is impeccable ma'am. Hope to work with you for more big projects in the future. And I wish you, IGNITE TALENTS grooming school and all the aspiring talents who train under you.. Congrats once again ma'am...",
    profileImage: "/src/assets/testimonials/mugen-rao.jpg",
    logo: "/images/logos/ignite.png"
  },
  {
    id: 13,
    name: "Anonymous Industry Professional",
    profession: "Casting Director / Model Coordinator",
    review: "Tara is a wonderful coordinator and casting director. I have known her for almost 18 years. When we go to Tara with a model requirement, we can be assured that we would get the best of talents available in the country. That is the trust I have on Tara. She is not just prompt in responding, which is a trait missing among the new age casting directors but also ensures that I get what I want without any compromise. Being transparent even at the cost of losing business is how upfront and professional she is. That makes her the most bankable Model Coordinator/ Casting Director.",
    profileImage: "/src/assets/testimonials/anonymous-professional.jpg",
    logo: "/images/logos/ignite.png"
  },
  {
    id: 14,
    name: "Arun Kumar",
    profession: "Director / Producer",
    review: "Ignite Talents - a grooming school started by Tara is the place to be for budding models and actors. She has the experience and knowledge to hone talents professionally. Its not enough to simply train and groom without the contacts and expertise to place them where they shine. Tara - being a veteran in the industry, enables her to provide opportunities for the talents she grooms with ease.",
    profileImage: "/src/assets/testimonials/arun-kumar.jpg",
    logo: "/images/logos/ignite.png"
  },
  {
    id: 15,
    name: "Ashok Kumar",
    profession: "Actor / Model / Choreographer",
    review: "I take immense pleasure in vouching for the \"Ignite Talents Grooming School\" coz' the 'Iron Lady' behind it is a \"Star Maker\" (Ms.Thara ★ Umesh) as her name suggests ! I've worked with her & known her as a dedicated model coordinator, a director who works relentlessly even to get the perfect audition recorded and most importantly - She is a wonderful Soul. She has always ignited the flames within quality talent in her career and I wish her all the very best as she now formally paves the way for future talent through her venture - Ignite Talents Grooming School",
    profileImage: "/src/assets/testimonials/ashok-kumar.jpg",
    logo: "/images/logos/ignite.png"
  },
  {
    id: 16,
    name: "V. K. Prakash",
    profession: "Director",
    review: "Thara and my association with work goes on for years .. and she is most committed proffessional and more above a honest person. I wish all the best for her IGNITE TALENTS grooming school.. and my prayers for the success",
    profileImage: "/src/assets/testimonials/vk-prakash.jpg",
    logo: "/images/logos/ignite.png"
  }
];

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
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const scrollContainerRef = useRef(null);

  // Group testimonials into pairs of 2 for mobile stacked layout
  const chunkedTestimonials = [];
  for (let i = 0; i < testimonialsData.length; i += 2) {
    chunkedTestimonials.push(testimonialsData.slice(i, i + 2));
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
          {testimonialsData.map((testimonial) => (
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
