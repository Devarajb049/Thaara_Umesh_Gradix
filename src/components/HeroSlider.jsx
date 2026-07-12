import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop',
    title: 'Professional Acting School',
    subtitle: 'Ignite your talent and shape your future.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1517457816828-5690b2e3f8ec?q=80&w=2070&auto=format&fit=crop',
    title: 'Learn from Experts',
    subtitle: 'Training tailored for aspiring models and actors.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
    title: 'Showcase Your Potential',
    subtitle: 'Get the perfect platform to jumpstart your career.'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?q=80&w=1925&auto=format&fit=crop',
    title: 'Join Ignite Talents',
    subtitle: 'Transforming passion into profession.'
  }
];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Slide every 5 seconds
    return () => clearInterval(timer);
  }, [currentIndex]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? banners.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === banners.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] group overflow-hidden bg-black mt-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <div
            style={{ backgroundImage: `url(${banners[currentIndex].image})` }}
            className="w-full h-full bg-center bg-cover duration-500"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
             <motion.h1 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.3, duration: 0.8 }}
               className="text-4xl md:text-6xl font-bold mb-4 tracking-wider uppercase drop-shadow-lg"
             >
               {banners[currentIndex].title}
             </motion.h1>
             <motion.p 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.5, duration: 0.8 }}
               className="text-lg md:text-2xl font-light drop-shadow-md"
             >
               {banners[currentIndex].subtitle}
             </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left Arrow */}
      <div className="hidden group-hover:flex absolute top-[50%] -translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/50 transition-colors z-10 items-center justify-center">
        <ChevronLeft onClick={prevSlide} size={40} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:flex absolute top-[50%] -translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/50 transition-colors z-10 items-center justify-center">
        <ChevronRight onClick={nextSlide} size={40} />
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center py-2 gap-2 z-10">
        {banners.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === slideIndex ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/80'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
