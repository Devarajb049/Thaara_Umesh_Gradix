import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="relative pt-20 pb-12 lg:pt-32 lg:pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-12 items-center">
        
        {/* Text Content (1st on Mobile, Left-Top on Desktop) */}
        <div 
          className="order-1 lg:col-start-1 lg:row-start-1 w-full lg:max-w-[120%]"
          data-aos="fade-right"
        >
          <p className="text-primary font-serif italic text-sm md:text-base mb-3 md:mb-4">Welcome to Thaara Umesh</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-dark leading-[1.1] mb-4 md:mb-6 whitespace-nowrap">
            Where Talent <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ff4d4d] to-primary animate-spotlight italic font-normal">Meets Opportunity.</span>
          </h1>
          <p className="text-dark/70 text-sm md:text-base max-w-md leading-relaxed whitespace-normal text-justify">
            One-stop solution for advertising and entertainment industry. We bridge the gap between creative vision and world-class talent.
          </p>
        </div>

        {/* Image/Visuals (2nd on Mobile, Right side on Desktop) */}
        <div 
          className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 w-full relative flex justify-center lg:justify-end group"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <div className="relative w-full max-w-[400px] aspect-[4/4.5] md:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-[#EBE3D8]">
            <img 
              src="/images/Thaara_Umesh.jpg" 
              alt="Thaara Umesh - Casting Director" 
              className="w-full h-full object-cover transition-all duration-700"
            />
            
            {/* Cinematic Camera Viewfinder Overlays */}
            <div className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-500 opacity-50 group-hover:opacity-100">
              <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white"></div>
              <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white"></div>
              <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white"></div>
              <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white"></div>
              {/* Center Crosshair */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-30 flex items-center justify-center">
                <div className="w-full h-[1px] bg-white absolute"></div>
                <div className="h-full w-[1px] bg-white absolute"></div>
              </div>
            </div>

            {/* REC Blinking Dot */}
            <div className="absolute top-8 left-10 z-20 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div>
              <span className="text-white text-[10px] font-bold tracking-[0.2em] drop-shadow-md">REC</span>
            </div>

            <div className="absolute top-10 left-10 w-32 h-32 bg-white/40 blur-3xl rounded-full"></div>
            <div className="absolute top-20 right-10 w-40 h-40 bg-white/30 blur-3xl rounded-full"></div>
          </div>
          
          {/* Floating Badge top */}
          <div 
            data-aos="zoom-in"
            data-aos-delay="400"
            className="absolute top-4 -right-2 lg:right-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-xl flex items-center gap-2 z-10"
          >
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs">TU</div>
            <div>
              <p className="text-[10px] md:text-xs font-bold text-dark leading-tight">Casting Agency</p>
              <p className="text-[9px] text-dark/60">Est. 2018 in Mumbai</p>
            </div>
          </div>

          {/* Floating Badge bottom */}
          <div 
            data-aos="fade-up"
            data-aos-delay="500"
            className="absolute -bottom-4 -left-2 lg:-left-12 bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-xl flex items-center gap-2 z-10"
          >
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
              <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
              <div className="w-6 h-6 rounded-full bg-primary border-2 border-white flex items-center justify-center text-white text-[9px]">+</div>
            </div>
            <p className="text-[9px] md:text-xs font-semibold pr-2 whitespace-nowrap">Available 500+ models</p>
          </div>
        </div>

        {/* Buttons (3rd on Mobile, Left-Bottom on Desktop) */}
        <div 
          className="order-3 lg:col-start-1 lg:row-start-2 flex flex-row items-center gap-3 lg:gap-5 w-full max-w-xl mt-2 lg:mt-0"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {/* Primary Button with Animated Border */}
          <div className="relative p-[2px] rounded-full overflow-hidden flex-1 lg:flex-none shadow-lg shadow-primary/30 hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ffffff_50%,transparent_100%)] animate-[spin_2s_linear_infinite]" />
            <Link to="/actingschool" className="relative flex justify-center items-center gap-2 bg-primary text-white px-4 py-3.5 lg:px-8 rounded-full font-semibold text-[11px] md:text-sm whitespace-nowrap w-full h-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Continuous clap animation */}
                <g className="origin-[3px_11px] animate-clap">
                  <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"/>
                  <path d="m6.2 5.3 3.1 3.9"/>
                  <path d="m12.4 3.4 3.1 4"/>
                </g>
                <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>
              </svg>
              EXPLORE TALENT
            </Link>
          </div>

          {/* Secondary Button with Animated Border */}
          <div className="relative p-[2px] rounded-full overflow-hidden flex-1 lg:flex-none hover:scale-105 transition-transform duration-300 shadow-lg shadow-dark/10">
            <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#9b0b16_50%,transparent_100%)] animate-[spin_3s_linear_infinite_reverse]" />
            <a href="#submit" className="relative flex justify-center items-center bg-[#fffefe] text-dark px-4 py-3.5 lg:px-8 rounded-full font-semibold text-[11px] md:text-sm whitespace-nowrap w-full h-full hover:bg-white transition-colors">
              SUBMIT PROFILE
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
