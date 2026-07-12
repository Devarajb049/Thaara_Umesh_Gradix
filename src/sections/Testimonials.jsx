import { useState } from 'react';
import { Play } from 'lucide-react';

const Testimonials = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="testimonials" className="py-24 px-6 relative overflow-hidden bg-secondary/20">
      {/* Abstract Backgrounds */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Title */}
        <div data-aos="fade-up" className="text-center mb-16">
          <p className="text-primary text-xs font-bold tracking-widest mb-3 uppercase">Words of Praise</p>
          <h2 className="text-4xl md:text-5xl font-serif text-dark font-medium uppercase tracking-wide">
            TESTIMONIALS
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">

          {/* Box 1: Video Testimonial (Spans 2 columns) */}
          <div
            data-aos="fade-up"
            className="lg:col-span-2 group relative rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-xl aspect-video border border-black/5 bg-black cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            {isPlaying ? (
              <video
                src="https://video.wixstatic.com/video/e67e91_b836e153cc7f4e468635a7a7b7f39654/360p/mp4/file.mp4"
                controls
                autoPlay
                className="absolute inset-0 w-full h-full object-cover"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            ) : (
              <>
                <img
                  src="https://images.unsplash.com/photo-1574322421396-150244436ae1?q=80&w=1000&auto=format&fit=crop"
                  alt="Video Thumbnail"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40 cursor-pointer group-hover:bg-primary transition-colors duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(155,11,22,0.6)]">
                    <Play className="text-white fill-white ml-1 sm:ml-2 w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                </div>
                {/* Details Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-8 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none">
                  <h3 className="text-white text-lg sm:text-xl md:text-2xl font-serif font-bold">Mark Manuel</h3>
                  <p className="text-white/80 text-[10px] sm:text-xs font-bold tracking-widest uppercase mt-1">Ad Film Maker, Producer</p>
                </div>
              </>
            )}
          </div>

          {/* Box 2: Text Testimonial (Spans 1 column) */}
          <div data-aos="fade-up" data-aos-delay="100" className="bg-white/60 backdrop-blur-xl border border-white p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col">
            <span className="text-primary text-6xl font-serif leading-none h-10">"</span>
            <p className="text-dark/80 text-sm italic leading-relaxed mb-8 flex-grow">
              With 35 years of experience and professional acumen, her contacts, and exposure... Thaara is the best person to provide the industry with top-class professional models.
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                <img src="/images/testimonials/vijay_xavier.png" alt="Vijay" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-dark text-sm font-serif">Vijay Xavier</h4>
                <p className="text-[10px] text-dark/50 font-bold uppercase tracking-widest">VP, Lintas</p>
              </div>
            </div>
          </div>

          {/* Box 3: Text Testimonial (Spans 1 column) */}
          <div data-aos="fade-up" data-aos-delay="200" className="bg-primary text-white border border-primary-dark p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-[2rem] shadow-xl flex flex-col">
            <span className="text-white/30 text-6xl font-serif leading-none h-10">"</span>
            <p className="text-white/90 text-sm italic leading-relaxed mb-8 flex-grow font-light">
              Tara is a wonderful coordinator and casting director. I have known her for almost 18 years... Being transparent even at the cost of losing business is how upfront and professional she is.
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                <img src="/images/testimonials/arun_kumar.png" alt="Director" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm font-serif">Arun Kumar</h4>
                <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Casting Director</p>
              </div>
            </div>
          </div>

          {/* Box 4: Text Testimonial (Spans 2 columns) */}
          <div data-aos="fade-up" data-aos-delay="300" className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-white p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row gap-5 sm:gap-8 items-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
              <img src="./images/testimonials/s_ramesh.png" alt="S. Ramesh" className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
              <span className="text-primary/30 text-6xl font-serif leading-none h-10 block mb-2">"</span>
              <p className="text-dark/80 text-sm md:text-base italic leading-relaxed mb-6">
                I am indeed happy to note you are launching your grooming studio. In all these 22 years of our association, you were not just a model coordinator, but you were doing grooming as well informally. I am sure this studio will prove to be a launchpad for aspiring models.
              </p>
              <div>
                <h4 className="font-bold text-dark text-lg font-serif">S. Ramesh</h4>
                <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1">Managing Director, Pothys Private Limited</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
