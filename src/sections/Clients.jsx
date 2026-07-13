import { useState } from 'react';

export const originalClients = [
    // Row 1
    { name: "Sudarshan", logo: "/images/clients/sudarshan.png" },
    { name: "K7 Security", logo: "/images/clients/k7security.png" },
    { name: "Tanishq", logo: "/images/clients/tanishq.png" },
    { name: "Preethi", logo: "/images/clients/preethi.png" },
    { name: "Nimyle", logo: "/images/clients/nimyle.png" },
    { name: "NEU", logo: "/images/clients/neu.png" },
    { name: "Shahs", logo: "/images/clients/shahs.png" },
    { name: "TORF", logo: "/images/clients/torf.png" },
    { name: "Nestlé", logo: "/images/clients/nestle.png" },
    { name: "Chola", logo: "/images/clients/chola.png" },
    { name: "Saregama Carvaan", logo: "/images/clients/carvaan.png" },
    { name: "WagonR", logo: "/images/clients/wagonr.png" },

    // Row 2
    { name: "Nandini", logo: "/images/clients/nandini.png" },
    { name: "Girias", logo: "/images/clients/girias.png" },
    { name: "Viking", logo: "/images/clients/viking.png" },
    { name: "Sundari Silks", logo: "/images/clients/sundarisilks.png" },
    { name: "Samsung", logo: "/images/clients/samsung.png" },
    { name: "Dettol", logo: "/images/clients/dettol.png" },
    { name: "Lay's", logo: "/images/clients/lays.png" },
    { name: "Nippon Paint", logo: "/images/clients/nipponpaint.png" },
    { name: "Crio", logo: "/images/clients/crio.png" },
    { name: "Zee Telugu", logo: "/images/clients/zeetelugu.png" },
    { name: "Surf Excel", logo: "/images/clients/surfexcel.png" },
    { name: "Mi", logo: "/images/clients/mi.png" },

    // Row 3
    { name: "Rexona", logo: "/images/clients/rexona.png" },
    { name: "Gold Winner", logo: "/images/clients/goldwinner.png" },
    { name: "Hero", logo: "/images/clients/hero.png" },
    { name: "Dulux", logo: "/images/clients/dulux.png" },
    { name: "Max Life", logo: "/images/clients/maxlife.png" },
    { name: "Google", logo: "/images/clients/google.png" },
    { name: "Sri Kumaran Stores", logo: "/images/clients/srikumaranstores.png" },
    { name: "MTR", logo: "/images/clients/mtr.png" },
    { name: "Manna", logo: "/images/clients/manna.png" },
    { name: "Arokya", logo: "/images/clients/arokya.png" },
    { name: "Jeyachandran", logo: "/images/clients/jeyachandran.png" },
    { name: "GRB", logo: "/images/clients/grb.png" },

    // Row 4
    { name: "Milk Bikis", logo: "/images/clients/milkbikis.png" },
    { name: "Tata Sky", logo: "/images/clients/tatasky.png" },
    { name: "A23", logo: "/images/clients/a23.png" },
    { name: "Nu-Shakti", logo: "/images/clients/nushakti.png" },
    { name: "RKG", logo: "/images/clients/rkg.png" },
    { name: "Mom's Magic", logo: "/images/clients/momsmagic.png" },
    { name: "3 Roses", logo: "/images/clients/3roses.png" },
    { name: "Woodward's", logo: "/images/clients/woodwards.png" },
    { name: "Cars24", logo: "/images/clients/cars24.png" },
    { name: "Parle", logo: "/images/clients/parle.png" },
    { name: "Vaya", logo: "/images/clients/vaya.png" },
    { name: "Wipro", logo: "/images/clients/wipro.png" },

    // Row 5
    { name: "Sundaram Mutual", logo: "/images/clients/sundarammutual.png" },
    { name: "Arun Icecreams", logo: "/images/clients/arunicecreams.png" },
    { name: "Bru", logo: "/images/clients/bru.png" },
    { name: "MPL", logo: "/images/clients/mpl.png" },
    { name: "Vanish", logo: "/images/clients/vanish.png" },
    { name: "Indica Easy Home", logo: "/images/clients/indicaeasyhome.png" },
    { name: "Amazon Prime", logo: "/images/clients/amazonprime.png" },
    { name: "OYO", logo: "/images/clients/oyo.png" },
    { name: "Asian Paints", logo: "/images/clients/asianpaints.png" },
    { name: "Hamam", logo: "/images/clients/hamam.png" },
    { name: "Luker", logo: "/images/clients/luker.png" },
    { name: "Medimix", logo: "/images/clients/medimix.png" },

    // Row 6
    { name: "Jana Small Finance Bank", logo: "/images/clients/janasmallfinancebank.png" },
    { name: "Kellogg's", logo: "/images/clients/kelloggs.png" },
    { name: "Annapoorna", logo: "/images/clients/annapoorna.png" },
    { name: "CNN", logo: "/images/clients/cnn.png" },
    { name: "Jos Alukkas", logo: "/images/clients/josalukkas.png" },
    { name: "Lotte Choco Pie", logo: "/images/clients/lottechocopie.png" },
    { name: "SPICY", logo: "/images/clients/spicy.png" },
    { name: "Indian Bank", logo: "/images/clients/indianbank.png" },
    { name: "Havells", logo: "/images/clients/havells.png" },
    { name: "Wonderla", logo: "/images/clients/wonderla.png" },
    { name: "Tata Tea Gold", logo: "/images/clients/tatateagold.png" },
    { name: "Aachi", logo: "/images/clients/aachi.png" },

    // Row 7
    { name: "Colgate", logo: "/images/clients/colgate.png" },
    { name: "B Natural", logo: "/images/clients/bnatural.png" },
    { name: "Alto 800", logo: "/images/clients/alto800.png" },
    { name: "Pepsodent", logo: "/images/clients/pepsodent.png" },
    { name: "Sundrop", logo: "/images/clients/sundrop.png" },
    { name: "RAKI", logo: "/images/clients/raki.png" },
    { name: "Whirlpool", logo: "/images/clients/whirlpool.png" },
    { name: "Swiggy", logo: "/images/clients/swiggy.png" },
    { name: "Kryolan", logo: "/images/clients/kryolan.png" },
    { name: "Khazana Jewellery", logo: "/images/clients/khazanajewellery.png" },
    { name: "Bhima Jewellers", logo: "/images/clients/bhimajewellers.png" },
    { name: "echoMe", logo: "/images/clients/echome.png" },

    // Row 8
    { name: "Flipkart", logo: "/images/clients/flipkart.png" },
    { name: "Ministry of Tourism", logo: "/images/clients/ministryoftourism.png" },
    { name: "Whisper", logo: "/images/clients/whisper.png" },
    { name: "JK Cement", logo: "/images/clients/jkcement.png" },
    { name: "Coca-Cola", logo: "/images/clients/cocacola.png" },
    { name: "VBJ Jewellers", logo: "/images/clients/vbjjewellers.png" },
    { name: "Bolero", logo: "/images/clients/bolero.png" },
    { name: "Clinic Plus", logo: "/images/clients/clinicplus.png" },
    { name: "Sundrop", logo: "/images/clients/sundrop.png" },
    { name: "RAKI", logo: "/images/clients/raki.png" },
    { name: "Whirlpool", logo: "/images/clients/whirlpool.png" },
    { name: "Swiggy", logo: "/images/clients/swiggy.png" }
];

import { useData } from '../admin/context/DataContext';

const Clients = () => {
  const { clients } = useData();
  const activeClients = clients.filter(c => c.status === 'active');
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
                  className="max-w-full max-h-12 object-contain grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
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