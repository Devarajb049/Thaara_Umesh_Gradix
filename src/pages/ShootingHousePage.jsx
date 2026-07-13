import React, { useState, useEffect } from 'react';
import { Phone, MapPin, ChevronLeft, ChevronRight, Home, Camera, Compass, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../admin/context/DataContext';

const ShootingHousePage = () => {
  const { shootingHouseImages, shootingHouseVideos } = useData();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const images = shootingHouseImages.length > 0 
    ? shootingHouseImages.map(img => img.url) 
    : [
        "https://static.wixstatic.com/media/e67e91_6810b8cc855742f2a161bf7af70b8c7b~mv2.jpeg", // 7.jpeg
        "https://static.wixstatic.com/media/e67e91_321abb18e663495aa19394b58250068e~mv2.jpeg", // 6.jpeg
        "https://static.wixstatic.com/media/e67e91_d47c869c116c48efb111b9c55a00b3ff~mv2.jpeg", // 5.jpeg
        "https://static.wixstatic.com/media/e67e91_218a9b66e63546d6b608a21f7114d78d~mv2.jpeg", // 3.jpeg
        "https://static.wixstatic.com/media/e67e91_8dab172717744e789248cd0f12454255~mv2.jpeg", // 2.jpeg
        "https://static.wixstatic.com/media/e67e91_436ceeda4d044b73b042842081e9a137~mv2.jpeg", // 4.jpeg
        "https://static.wixstatic.com/media/e67e91_67d73becfac143fe9d4886ef4d7fe3cd~mv2.jpeg"  // 1.jpeg
      ];

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pt-24 font-sans">

      {/* Banner Section - Background matches 7.jpeg (Exterior) */}
      <section className="relative h-[45vh] md:h-[60vh] w-full overflow-hidden bg-black flex-shrink-0">
        <img
          src="https://static.wixstatic.com/media/e67e91_6810b8cc855742f2a161bf7af70b8c7b~mv2.jpeg"
          alt="Akshaya Professional Shooting House"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-black/35 to-black/50"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-serif text-amber-400 font-bold mb-2 drop-shadow-lg italic">
            Shooting house
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="flex-grow py-12 px-4 md:px-8 relative z-20 bg-white">
        <div className="max-w-5xl mx-auto">

          {/* Title block */}
          <div className="text-center mb-8" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-serif text-primary font-bold tracking-wide uppercase border-b border-black/10 pb-4 inline-block">
              AKSHAYA - THE PROFESSIONAL SHOOTING HOUSE
            </h2>

            {/* Description */}
            <p className="text-dark/80 text-sm md:text-base leading-relaxed font-light mt-6 max-w-4xl mx-auto text-justify md:text-center px-2">
              In consultation and expertise of Multi-Award Winning Art Director, Mr. Sabu Cyril she custom built an all requirement providing Shooting House - AKSHAYA at Nesapakkam in Chennai, which is the 1st location built only for shooting purpose, filled with specific features.
            </p>
          </div>

          {/* Interactive Image Showcase Gallery */}
          <div className="flex flex-col gap-4 mb-12" data-aos="zoom-in">
            {/* Active Display Frame */}
            <div className="relative w-full aspect-[16/10] md:aspect-[16/9] bg-black/5 rounded-2xl overflow-hidden shadow-lg border border-black/5">
              <img
                src={images[activeIdx]}
                alt={`Studio Room View ${activeIdx + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
              />

              {/* Slide controls */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-dark flex items-center justify-center shadow-md hover:scale-105 transition-all z-10"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-dark flex items-center justify-center shadow-md hover:scale-105 transition-all z-10"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-7 gap-2 md:gap-4 overflow-hidden py-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${idx === activeIdx ? 'border-primary scale-[1.03] shadow-md' : 'border-black/5 hover:border-black/20 opacity-80 hover:opacity-100'
                    }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Location Map & Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mb-12">

            {/* Map Box */}
            <div className="md:col-span-8 rounded-2xl overflow-hidden border border-black/5 shadow-md aspect-video md:aspect-auto min-h-[300px]" data-aos="fade-right">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7212001479836!2d80.19013067576579!3d13.021575413759902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267252277d337%3A0xe54e3848b532bf14!2sAkshaya%20House!5e0!3m2!1sen!2sin!4v1720800000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Akshaya House Map Location"
              ></iframe>
            </div>

            {/* Address & Contact Box */}
            <div className="md:col-span-4 bg-secondary/20 rounded-2xl p-6 md:p-8 border border-black/5 flex flex-col justify-center text-left" data-aos="fade-left">
              <p className="text-primary text-[10px] font-bold tracking-widest uppercase mb-4">Location Details</p>

              {/* Phone */}
              <div className="flex gap-3 items-start mb-6">
                <Phone size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-dark font-bold text-sm tracking-wide uppercase mb-1">Booking Mobile</h4>
                  <a href="tel:+917395915551" className="text-dark/70 text-sm md:text-base font-light hover:text-primary transition-colors">
                    +91 7395 915 551
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-3 items-start mb-6">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-dark font-bold text-sm tracking-wide uppercase mb-1">Address</h4>
                  <p className="text-dark/70 text-sm leading-relaxed font-light">
                    Akshaya House,<br />
                    Plot No. 1/11,<br />
                    Amman Nagar, Nesapakkam,<br />
                    Chennai - 600 078.
                  </p>
                </div>
              </div>

              {/* Get Directions Button */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Akshaya+House+Nesapakkam+Chennai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-3.5 rounded-xl hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-xs tracking-wider uppercase shadow-md shadow-primary/10 w-full text-center"
              >
                <Compass size={14} className="animate-spin-slow" />
                GET DIRECTIONS
              </a>
            </div>

          </div>

          {/* Video / Showcase List linked to admin dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" data-aos="fade-up">
            {shootingHouseVideos.map((video, idx) => (
              <div 
                key={video.id || idx} 
                className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-md border border-white/10 group cursor-pointer flex items-center justify-center"
                onClick={() => {
                  setSelectedVideo(video);
                }}
              >
                {video.thumbnail && (
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <Camera size={24} />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 z-20 text-left">
                  <h4 className="text-white text-sm font-bold font-serif">{video.title}</h4>
                  <p className="text-white/60 text-xs font-light">{video.description || 'Virtual walkthrough'}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Video Modal Popup */}
          {selectedVideo && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xs">
              <div className="absolute inset-0" onClick={() => setSelectedVideo(null)}></div>
              <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10">
                <button 
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 text-white/50 hover:text-white bg-black/85 p-2 rounded-full z-20"
                >
                  <X size={20} />
                </button>
                <div className="relative w-full aspect-video">
                  {selectedVideo.youtubeUrl && (selectedVideo.youtubeUrl.includes('youtube.com') || selectedVideo.youtubeUrl.includes('youtu.be')) ? (
                    <iframe 
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedVideo.youtubeUrl.split('v=')[1] || selectedVideo.youtubeUrl.split('/').pop()}?autoplay=1`}
                      title={selectedVideo.title}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video 
                      src={selectedVideo.youtubeUrl || "https://video.wixstatic.com/video/e67e91_7ff82a837b9c4f2c9226ec9cc49f9e40/480p/mp4/file.mp4"}
                      className="absolute inset-0 w-full h-full object-contain"
                      controls
                      autoPlay
                    ></video>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default ShootingHousePage;
