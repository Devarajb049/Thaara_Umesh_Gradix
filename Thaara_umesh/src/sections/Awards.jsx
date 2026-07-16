const Awards = () => {
  // Creating an array of 10 empty items for 2 rows of 5
  const awardImages = Array.from({ length: 10 });

  return (
    <section id="awards" className="py-16 md:py-24 px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-rose-200/20 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title Area */}
        <div data-aos="fade-up" className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">
          <p className="text-primary text-xs font-bold tracking-widest mb-3 uppercase">Recognitions</p>
          <h2 className="text-3xl md:text-5xl font-serif text-dark font-medium uppercase">
            AWARDS & HONORS
          </h2>
        </div>

        {/* Awards Image Grid (5 columns on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {awardImages.map((_, index) => (
            <div 
              key={index}
              data-aos="fade-up"
              data-aos-delay={(index % 5) * 100}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg bg-white/50 border border-black/5"
            >
              {/* Dynamic Image from public/awards */}
              <img 
                src={`/images/awards/thaara_umesh_award${index + 1}.jpg`} 
                alt={`Award ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/400x500/ebe3d8/1a1a1a?text=Award+${index + 1}&font=Montserrat`;
                }}
              />
              
              {/* Optional Hover Overlay for elegant effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Awards;
