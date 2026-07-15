import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section id="hire-us" className="py-24 px-6 bg-secondary overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div 
          data-aos="zoom-in"
          className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-white/20 blur-3xl rotate-12"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[150%] bg-black/20 blur-3xl -rotate-12"></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif text-white font-medium mb-6">
              Ready to bring your creative vision to life?
            </h2>
            <p className="text-white/80 mb-10 text-sm md:text-base leading-relaxed">
              Whether you're a brand seeking fresh faces or a talent ready for the spotlight, we're here to facilitate the perfect match.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="bg-white text-primary px-8 py-4 rounded-full font-bold text-xs tracking-widest hover:bg-secondary transition-all hover:-translate-y-1 shadow-xl">
                HIRE TALENT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
