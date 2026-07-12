import { useRef, useEffect } from 'react';
import { useInView, animate } from 'framer-motion';

const AnimatedCounter = ({ from = 0, to, duration = 2.5 }) => {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration: duration,
        ease: "easeOut",
        onUpdate(value) {
          nodeRef.current.textContent = Math.round(value);
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{from}</span>;
};

const Stats = () => {
  const stats = [
    { endValue: 1000, suffix: '+', text: '', label: 'AUDITIONS CONDUCTED' },
    { endValue: 500, suffix: '+', text: '', label: 'MODELS SERVED' },
    { endValue: 5000, suffix: '+', text: '', label: 'TALENTS DISCOVERED' },
    { endValue: 30, suffix: '+', text: '', label: 'YEARS EXPERIENCE' },
  ];

  return (
    <section className="py-12 md:py-24 px-6 relative">
      {/* Decorative background blurs for glass effect */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-rose-200/40 blur-3xl rounded-full"></div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 relative z-10">
        {stats.map((stat, index) => (
          <div 
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            className="w-full aspect-square max-w-[160px] md:max-w-[200px] flex flex-col justify-center items-center text-center p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-2 transition-transform duration-500 mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary font-bold mb-1 md:mb-2 drop-shadow-sm">
              <AnimatedCounter to={stat.endValue} />
              {stat.suffix}
            </h2>
            <p className="text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.15em] font-semibold text-dark/60 uppercase leading-snug">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
