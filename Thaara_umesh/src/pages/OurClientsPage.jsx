import Clients from '../sections/Clients';

const OurClientsPage = () => {
  return (
    <div className="min-h-screen bg-secondary/10 flex flex-col">
      {/* Header Section */}
      <section className="relative pt-40 pb-24 px-6 bg-black overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop" 
            alt="Clients Header Background" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* Gradient Overlay for text readability and blending into the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-secondary/10"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center" data-aos="zoom-in">
          <p className="text-primary text-sm font-bold tracking-widest mb-4 uppercase drop-shadow-md">Collaborations</p>
          <h1 className="text-5xl md:text-7xl font-serif text-white font-bold mb-6 drop-shadow-2xl">
            Our Trusted Partners
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            We are proud to have collaborated with some of the biggest names in the industry, delivering exceptional casting solutions across films, commercials, and digital media.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <div className="flex-grow -mt-10 relative z-20 pb-24">
        <Clients />
      </div>
    </div>
  );
};

export default OurClientsPage;
