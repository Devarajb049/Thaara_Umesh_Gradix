import React from 'react';

// This data can later be fetched from your admin backend
const testimonialsData = [
  {
    id: 1,
    name: 'DELHI GANESH',
    role: 'ACTOR',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop',
    text: 'Thara Umesh is a pioneer in the casting industry. I have known her for more than 25 years. She understands the concept and casts the right talent for advertising and movies. I have witnessed her auditioning and seen how professionally she directs and makes any artist feel comfortable and makes them act. She is a very warm and loving human being. Now that she is starting Ignite Talents grooming school with her vast experience, I am sure she will bring out the talents in many upcoming and aspiring models. IGNITE TALENTS is the right place for aspiring talents. I wish all the best to Thaara Umesh and her grooming school.'
  },
  {
    id: 2,
    name: 'MOHAN RAMAN',
    role: 'ACTOR',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    text: 'I understand that my friend and Model coordinator Thaara Umesh is starting a School - Ignite Talents for aspiring Actors and Models. Her immense knowledge of the Industry and what Ad film makers expect from Talent puts her in the perfect place to give the right inputs and advice, not just in terms of technique but the attitude needed on sets. I wish her the very best in this endeavor and hope she is able to Ignite many talents and send them rocketing to success.'
  },
  {
    id: 3,
    name: 'PRIYA MANI',
    role: 'ACTRESS',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    text: 'Tara Umesh is one of the first "modelling coordinator" I ever worked with in chennai and she was so gracious enough to guide me through my first modelling assignment and from there was no looking back. She even set me up with my very first professional portfolio with her own son Ajai Umesh who now is an even more famous photographer. Tara is a committed woman who knows her craft very well. An excellent judge of character and assignments. She is the one who practically launched my modelling career in the south, and now is all set to start her own grooming school which is called "IGNITE TALENTS". All my good wishes to Tara Umesh and her grooming school!!! May it become super successful and may it launch many more new and upcoming.'
  },
  {
    id: 4,
    name: 'NIKKI GALRANI',
    role: 'ACTRESS',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop',
    text: 'Thara Umesh has been a dear friend for more than a decade now. Each year of knowing her has only gotten better than the previous ones. Thara Umesh apart from being a dear one with an aura that makes me feel immensely positive and warm, has also played a vital role in structuring not just my career but a lot of others. Her support has been there throughout and I\'m sure for each one of you that is looking to have an amazing experience in the entertainment industry, I could not suggest a place thats more apt than "Ignite Talents Grooming School". For all the warmth, support and learning Thara Umesh is definitely the person and Ignite Talents is no doubt the place to be in.'
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 px-4 sm:px-6 bg-[#f8f9fa] relative overflow-hidden">
      
      {/* Decorative Background Elements for Glassmorphism Effect */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-[#942c81]/15 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 pointer-events-none"></div>
      <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-[#e8256a]/15 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-dark inline-block relative uppercase tracking-wider" data-aos="fade-up">
            TESTIMONIALS
            <span className="absolute -bottom-4 left-0 w-full h-1.5 bg-primary/20 rounded-full"></span>
            <span className="absolute -bottom-4 left-1/4 w-1/2 h-1.5 bg-primary rounded-full"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 sm:gap-16">
          {testimonialsData.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              // Beautiful centered flexbox alignment to perfectly balance the layout
              className="relative p-6 sm:p-8 rounded-[2rem] bg-gradient-to-br from-[#942c81]/95 to-[#e8256a]/95 backdrop-blur-xl shadow-[0_20px_50px_-15px_rgba(232,37,106,0.3)] border border-white/20 flex flex-col sm:flex-row gap-8 sm:gap-10 items-center group h-auto"
            >
              
              {/* Giant watermark quote in background */}
              <div className="absolute top-4 right-6 text-white/5 text-[10rem] font-serif leading-none pointer-events-none select-none">"</div>

              {/* Left: Neatly aligned Portrait Frame (Tall aspect ratio balances the text perfectly) */}
              <div className="w-full sm:w-[42%] flex justify-center items-center relative z-10 mt-2 sm:mt-0">
                
                {/* 3:4 Portrait Frame (Like an elegant photo frame, prevents face cropping) */}
                <div className="w-full max-w-[240px] aspect-[4/5] rounded-[1.5rem] overflow-hidden border-[4px] border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.25)] relative group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] transition-all duration-500 bg-white">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-500"
                  />
                </div>
                
                {/* Floating Logo Pill gracefully overlapping the bottom of the frame */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-xl shadow-xl z-20 flex items-center justify-center gap-2 border border-white/50 group-hover:-translate-y-1 transition-transform duration-300 w-[85%] max-w-[180px]">
                  <img 
                    src="/images/logos/ignite.png" 
                    alt="Ignite Logo" 
                    className="h-4 sm:h-5 w-auto object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="hidden sm:block text-[#e8256a] font-black tracking-widest text-[0.6rem] uppercase mt-0.5">IGNITE</span>
                </div>
              </div>

              {/* Right: Text Content perfectly balanced vertically */}
              <div className="w-full sm:w-[58%] flex flex-col justify-center h-full text-white z-10 relative pt-4 sm:pt-0 pb-2">
                
                <div className="mb-6">
                  <p className="text-white/95 text-[0.85rem] sm:text-[0.95rem] leading-[1.7] sm:leading-[1.8] font-medium text-center sm:text-justify drop-shadow-sm">
                    {testimonial.text}
                  </p>
                </div>
                
                {/* Name & Role perfectly anchored at the bottom */}
                <div className="mt-auto pt-5 border-t border-white/20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <h4 className="text-[1.1rem] sm:text-[1.25rem] font-black tracking-widest mb-1 uppercase drop-shadow-md">{testimonial.name}</h4>
                    <p className="text-white/80 text-[0.65rem] sm:text-[0.7rem] font-bold tracking-[0.15em] uppercase">{testimonial.role}</p>
                  </div>
                  {/* Subtle stars */}
                  <div className="flex text-yellow-300/90 text-base drop-shadow-sm">
                     ★★★★★
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
