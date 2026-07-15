import { Link } from 'react-router-dom';
import { useData } from '../admin/context/DataContext';

const Showcase = () => {
  const { showcases } = useData();
  
  // Get first showcase video as the featured video
  const featuredVideo = showcases[0];
  let embedUrl = "https://www.youtube.com/embed/BQ_d2rMpLwk?autoplay=1&mute=1&loop=1&playlist=BQ_d2rMpLwk";
  
  if (featuredVideo) {
    const url = featuredVideo.youtube_url;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      const ytId = match[2];
      embedUrl = `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}`;
    } else {
      embedUrl = url;
    }
  }

  return (
    <section id="showcase" className="py-12 md:py-16 px-6 relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-rose-200/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Title Area */}
        <div data-aos="fade-up" className="text-center mb-10 md:mb-12">
          <p className="text-primary text-xs font-bold tracking-widest mb-3 uppercase">Featured Work</p>
          <h2 className="text-4xl md:text-5xl font-serif text-dark font-medium uppercase tracking-wide">
            SHOWCASE
          </h2>
        </div>

        {/* Cinematic Video Frame (Modern Glassmorphism) */}
        <div 
          data-aos="zoom-in" 
          className="relative max-w-5xl mx-auto p-2 md:p-4 rounded-[2rem] bg-white/30 backdrop-blur-xl border border-white/50 shadow-[0_30px_60px_rgba(0,0,0,0.1)]"
        >
          {/* Decorative 'Recording' Dot */}
          <div className="absolute top-6 right-8 flex items-center gap-2 z-20">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-white text-[10px] font-bold tracking-widest drop-shadow-md hidden md:block">REC</span>
          </div>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
            <iframe 
              src={embedUrl} 
              title="Showcase Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </div>

        {/* Button below video (Matching Clients Section) */}
        <div className="mt-10 md:mt-12 text-center" data-aos="fade-up">
          <Link to="/showcase" className="inline-block">
            <button className="relative px-6 py-2.5 rounded-full overflow-hidden group hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/20 bg-primary cursor-pointer">
              <span className="relative z-10 text-white font-bold text-xs tracking-widest uppercase">
                VIEW FULL LIST
              </span>
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Showcase;
