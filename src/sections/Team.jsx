const Team = () => {
  const teamMembers = [
    {
      name: 'Thaara Umesh',
      role: 'Casting Director',
      image: '/images/team/thaara_umesh.avif'
    },
    {
      name: 'Ajay Umesh',
      role: 'Managing Director',
      image: '/images/team/ajay_umesh.avif'
    },
    {
      name: 'Kruthi HM',
      role: 'CEO',
      image: '/images/team/kruthi_hm.avif'
    }
  ];

  return (
    <section id="team" className="py-24 px-6 relative overflow-hidden bg-white/50">
      <div className="max-w-6xl mx-auto">
        <div data-aos="fade-up" className="text-center mb-16">
          <p className="text-primary text-xs font-bold tracking-widest mb-3 uppercase">Behind the Scenes</p>
          <h2 className="text-4xl md:text-5xl font-serif text-dark font-medium uppercase tracking-wide">
            THE TEAM
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              data-aos="fade-up" 
              data-aos-delay={index * 150}
              className="group flex flex-col items-center text-center"
            >
              {/* Image Container with Unique Animation */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 mb-8 cursor-pointer">
                {/* Animated Rotating Border Ring */}
                <div className="absolute inset-0 rounded-full border-[2px] border-dashed border-dark/20 group-hover:border-primary group-hover:rotate-[180deg] transition-all duration-1000 ease-in-out"></div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700"></div>

                {/* Actual Round Image Frame */}
                <div className="absolute inset-3 rounded-full overflow-hidden border-[6px] border-white shadow-xl group-hover:shadow-[0_0_40px_rgba(155,11,22,0.3)] transition-all duration-500 z-10 bg-secondary">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                </div>
              </div>

              {/* Name & Designation */}
              <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-serif font-bold text-dark mb-1 group-hover:text-primary transition-colors duration-300">{member.name}</h3>
                <p className="text-dark/60 text-xs font-bold tracking-widest uppercase">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
