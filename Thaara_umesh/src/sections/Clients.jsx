import { useState } from 'react';
import { useData } from '../admin/context/DataContext';

const Clients = () => {
  const { clients } = useData();
  const activeClients = clients;
  const [failedImages, setFailedImages] = useState({});

  const handleImageError = (index) => {
    setFailedImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section className="px-6 relative">
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-2xl border border-white p-8 md:p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-dark font-medium uppercase tracking-wide">
            Brands We've Worked With
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6">
          {activeClients.map((client, index) => (
            <div
              key={client.id || index}
              data-aos="fade-up"
              data-aos-delay={(index % 8) * 50}
              className="group bg-white/85 rounded-2xl aspect-[4/3] flex items-center justify-center p-3 border border-black/5 shadow-sm hover:shadow-[0_10px_30px_rgba(155,11,22,0.1)] hover:border-primary/30 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {failedImages[index] ? (
                <span className="text-dark/80 font-bold text-xs tracking-wider uppercase font-serif text-center px-1 leading-snug group-hover:text-primary transition-colors">
                  {client.clientName || client.name}
                </span>
              ) : (
                <img
                  src={client.logo}
                  alt={client.clientName || client.name}
                  onError={() => handleImageError(index)}
                  className="w-full h-full object-contain p-1 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Clients;