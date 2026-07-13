import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, X, Film } from 'lucide-react';

const workshopVideos = [
  {
    id: 1,
    title: "Acting Workshop Highlights",
    description: "Catch a glimpse of our intensive physical training and emotional expression workshops.",
    videoUrl: "https://video.wixstatic.com/video/e67e91_7ff82a837b9c4f2c9226ec9cc49f9e40/480p/mp4/file.mp4",
    thumbnail: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop",
    duration: "02:15",
    category: "Workshop"
  },
  {
    id: 2,
    title: "Camera Acting Masterclass",
    description: "Detailed breakdown of camera angles, subtle emoting, and framing techniques for actors.",
    videoUrl: "https://video.wixstatic.com/video/e67e91_b836e153cc7f4e468635a7a7b7f39654/360p/mp4/file.mp4",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop",
    duration: "01:45",
    category: "Masterclass"
  },
  {
    id: 3,
    title: "Student Success Stories",
    description: "Hear from our graduates who successfully transitioned from Ignite to television commercials and films.",
    videoUrl: "https://www.youtube.com/embed/_CZAM4GRc_I",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    duration: "03:10",
    category: "Success Stories"
  },
  {
    id: 4,
    title: "Screen Presence Training",
    description: "Specialized grooming sessions focused on posture, voice modulation, and micro-expressions.",
    videoUrl: "https://www.youtube.com/embed/JdVxbx70vf0",
    thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    duration: "01:30",
    category: "Training"
  },
  {
    id: 5,
    title: "Portfolio Shoot Behind the Scenes",
    description: "Graduates getting their professional portfolios shot by celebrity photographers.",
    videoUrl: "https://www.youtube.com/embed/fJiBFc4IEUQ",
    thumbnail: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
    duration: "02:00",
    category: "BTS"
  },
  {
    id: 6,
    title: "Mock Audition Session",
    description: "Simulating real industry auditions with veteran coordinators to build confidence.",
    videoUrl: "https://www.youtube.com/embed/xZcq_8JICY8",
    thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop",
    duration: "02:45",
    category: "Auditions"
  },
  {
    id: 7,
    title: "Method Acting Exploration",
    description: "Exploring psychological realism and sensory exercises for deep character building.",
    videoUrl: "https://video.wixstatic.com/video/e67e91_adf523a122b441198b11992625da808f/720p/mp4/file.mp4",
    thumbnail: "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=800&auto=format&fit=crop",
    duration: "01:58",
    category: "Method Acting"
  },
  {
    id: 8,
    title: "Improvisation & Body Language",
    description: "Spontaneous acting games and bodily movement training to enhance on-set flexibility.",
    videoUrl: "https://www.youtube.com/embed/GOxcDKppy4U",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    duration: "02:20",
    category: "Improv"
  }
];

const Workshops = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 2, workshopVideos.length));
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-white relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-rose-200/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-primary text-xs font-bold tracking-widest mb-3 uppercase">PRACTICAL TRAINING</p>
          <h2 className="text-3xl md:text-5xl font-black text-dark inline-block relative uppercase tracking-wider">
            STUDENTS TESTIMONIALS & WORKSHOPS
            <span className="absolute -bottom-3 left-0 w-full h-1 bg-primary/20 rounded-full"></span>
            <span className="absolute -bottom-3 left-1/4 w-1/2 h-1 bg-primary rounded-full"></span>
          </h2>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {workshopVideos.slice(0, visibleCount).map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              className="group cursor-pointer p-4 rounded-3xl bg-secondary/30 hover:bg-white border border-black/5 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              onClick={() => setSelectedVideo(video)}
            >
              {/* Thumbnail Container */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4 bg-black shadow-inner">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  loading="lazy"
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold text-white tracking-widest uppercase border border-white/10 z-10">
                  {video.category}
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/85 px-2 py-0.5 rounded text-[9px] font-bold text-white z-10">
                  {video.duration}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40 group-hover:bg-primary transition-all duration-500 shadow-xl group-hover:shadow-[0_0_35px_rgba(155,11,22,0.65)] scale-90 group-hover:scale-100">
                    <PlayCircle className="text-white fill-white/10 ml-0.5 w-7 h-7" />
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="px-1 flex flex-col flex-grow text-left">
                <h3 className="text-dark font-serif font-black text-lg leading-snug group-hover:text-primary transition-colors mb-2">
                  {video.title}
                </h3>
                <p className="text-dark/60 text-xs sm:text-sm leading-relaxed font-light line-clamp-2">
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        {visibleCount < workshopVideos.length && (
          <div className="mt-16 text-center" data-aos="fade-up">
            <button 
              onClick={handleLoadMore}
              className="relative px-8 py-3 rounded-full overflow-hidden group hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/20 bg-primary text-white font-bold text-xs tracking-widest uppercase"
            >
              VIEW MORE WORKSHOPS
            </button>
          </div>
        )}

      </div>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-sm"
          >
            {/* Close Overlay Trigger */}
            <div className="absolute inset-0" onClick={() => setSelectedVideo(null)}></div>

            {/* Modal Content Frame */}
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors bg-black/75 p-2 rounded-full z-20 hover:scale-105 active:scale-95"
              >
                <X size={20} />
              </button>

              {/* 16:9 Video Aspect Container */}
              <div className="relative w-full aspect-video bg-black">
                {selectedVideo.videoUrl.includes('wixstatic.com') ? (
                  <video 
                    src={selectedVideo.videoUrl}
                    className="absolute inset-0 w-full h-full object-contain"
                    controls
                    autoPlay
                  ></video>
                ) : (
                  <iframe 
                    className="absolute inset-0 w-full h-full"
                    src={`${selectedVideo.videoUrl}?autoplay=1`}
                    title={selectedVideo.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                )}
              </div>

              {/* Bottom Info Details */}
              <div className="p-6 bg-zinc-950 text-left border-t border-white/5">
                <div className="flex items-center gap-2 mb-2 text-primary font-bold text-[10px] tracking-widest uppercase">
                  <Film size={12} />
                  <span>{selectedVideo.category}</span>
                </div>
                <h2 className="text-white text-xl font-serif font-black mb-1">{selectedVideo.title}</h2>
                <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed">{selectedVideo.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Workshops;
