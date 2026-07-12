const About = () => {
  return (
    <section id="about" className="py-12 md:py-24 px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-200/20 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Title Area */}
        <div data-aos="fade-up" className="text-center mb-10 md:mb-16 max-w-4xl mx-auto">
          <p className="text-primary text-xs md:text-sm font-bold tracking-[0.2em] mb-4">THE FOUNDER</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary font-bold leading-tight mb-4 uppercase">
            Thaara Umesh
          </h2>
          <h3 className="text-xl md:text-2xl text-dark/80 font-serif uppercase">
            The One Stop Solution for Advertising & Entertainment Industry
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch z-10 relative mb-8 md:mb-12">
          
          {/* Left Side: Image matching text height */}
          <div className="lg:col-span-5" data-aos="fade-right" data-aos-delay="100">
             <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden w-full h-full min-h-[400px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] group border border-white/40 bg-white">
              <img 
                src="https://images.unsplash.com/photo-1594908900066-3f47337549d8?q=80&w=1000&auto=format&fit=crop" 
                alt="Studio setup" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent flex items-end p-6 md:p-8">
                 <div className="text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-serif text-3xl md:text-4xl font-bold mb-1 md:mb-2 text-white drop-shadow-md">30+ Years</p>
                    <p className="text-xs md:text-sm text-white/90 tracking-widest uppercase font-semibold">of Excellence in Casting</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8" data-aos="fade-left" data-aos-delay="200">
            
            {/* Glassy Text Box 1 */}
            <div className="bg-white/50 backdrop-blur-2xl border border-white/70 p-6 md:p-8 lg:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl flex-1">
              <p className="text-dark/80 leading-relaxed text-sm md:text-base mb-4 lg:mb-6 text-justify">
                Meet Thaara, a Casting Director who has climbed the ranks from humble beginnings. Hailing from an agricultural family in Chikmagalur, Karnataka, Thaara migrated to Chennai in 1983 and began her foray into the advertising world with the support of her late husband, Mr. Umesh, who was a Film Animation Illustrator trained in France.
              </p>
              <p className="text-dark/80 leading-relaxed text-sm md:text-base text-justify">
                Three decades ago, Chennai lacked professional models and model coordinators, but Thaara changed that when she appeared on the scene as a Professional Model Coordinator. She was one of the few model coordinators, and one of the few lady model coordinators in the country. In fact, Thaara was the only coordinator in Chennai and the first lady coordinator.
              </p>
            </div>

            {/* Glassy Text Box 2 */}
            <div className="bg-white/50 backdrop-blur-2xl border border-white/70 p-6 md:p-8 lg:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl flex-1">
              <p className="text-dark/80 leading-relaxed text-sm md:text-base mb-4 lg:mb-6 text-justify">
                Through her hard work and dedication, Thaara grew from a model coordinator in Chennai to a leading Casting Director on the national horizon. She is a multiple award-winning Casting Director, socialite, and compassionate social worker. With three decades of experience, Thaara changed the Chennai scenario from contracting Mumbai Models for Chennai to contracting Chennai Models for Mumbai. Some of the leading stars of today's tinsel towns, both heroes and heroines, are her introductions.
              </p>
              <p className="text-primary font-bold leading-relaxed text-sm md:text-base text-justify">
                Thaara's story is one of perseverance, determination, and innovation. She has shattered barriers and blazed a trail for future generations in the entertainment industry.
              </p>
            </div>

          </div>
        </div>

        {/* Full Width Special Highlight Box */}
        <div className="w-full z-10 relative" data-aos="fade-up" data-aos-delay="300">
          <div className="bg-gradient-to-br from-primary to-primary-dark backdrop-blur-2xl p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl text-white transform hover:-translate-y-1 transition-transform duration-300">
            <h4 className="text-lg md:text-2xl font-serif font-bold mb-4 border-b border-white/20 pb-4 text-center md:text-left">
              INTEGRATED ONE STOP SOLUTION PROVIDER
            </h4>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <p className="text-white/90 leading-relaxed text-sm md:text-base">
                Her three decades of experience helped her to identify the need for providing all the industry related services, at one point. This made her venture into two specific felt needs:
              </p>
              <ul className="space-y-4 font-medium text-white flex flex-col justify-center">
                <li className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-colors">
                  <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-primary flex items-center justify-center font-bold text-base md:text-lg shadow-inner">1</span>
                  <span className="text-sm md:text-base">A professional shooting house.</span>
                </li>
                <li className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-colors">
                  <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-primary flex items-center justify-center font-bold text-base md:text-lg shadow-inner">2</span>
                  <span className="text-sm md:text-base">A professional modelling/acting school.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
