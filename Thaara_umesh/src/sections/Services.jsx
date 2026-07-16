import { Users, Crosshair, GraduationCap, Camera, Star, Globe2 } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Users size={24} className="text-primary" />,
      title: 'Artist Management',
      desc: 'Expert representation that focuses on long-term career growth, brand alignment, and strategic partnerships.'
    },
    {
      icon: <Crosshair size={24} className="text-primary" />,
      title: 'Precision Casting',
      desc: 'Network-spanning selections for feature films, high-budget TVCs, and independent OTT productions.'
    },
    {
      icon: <GraduationCap size={24} className="text-primary" />,
      title: 'Acting School',
      desc: 'Award-winning curriculum designed to transform raw potential into professional acting prowess.'
    },
    {
      icon: <Camera size={24} className="text-primary" />,
      title: 'Akshaya Shooting House',
      desc: 'Custom-built in consultation and expertise of Multi-Award Winning Art Director, Mr. Sabu Cyril at Nesapakkam in Chennai.'
    },
    {
      icon: <Star size={24} className="text-primary" />,
      title: 'Talent Grooming',
      desc: 'Holistic development including styling, portfolio management, and public relations for artists.'
    },
    {
      icon: <Globe2 size={24} className="text-primary" />,
      title: 'Global Outreach',
      desc: 'Connecting local talent to global opportunities through our international network and agencies.'
    }
  ];

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-primary text-xs font-bold tracking-widest mb-4">WHAT WE DO</p>
          <h2 className="text-4xl md:text-5xl font-serif text-dark font-medium">
            Comprehensive Talent Ecosystem
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-secondary/30 border border-black/5 p-8 rounded-3xl hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300 [&>svg]:group-hover:text-white">
                {service.icon}
              </div>
              <h3 className="text-xl font-serif font-semibold text-dark mb-4">{service.title}</h3>
              <p className="text-dark/60 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
