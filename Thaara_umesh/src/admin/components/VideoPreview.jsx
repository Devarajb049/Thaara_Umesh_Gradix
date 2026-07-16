import React, { useState } from 'react';
import { Play, PlayCircle, X } from 'lucide-react';
import Modal from './Modal';

// Helper to extract YouTube video ID from URL
export const getYoutubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const VideoPreview = ({ url = '', thumbnail = '', title = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYoutubeId(url);
  const fallbackThumbnail = videoId 
    ? `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg` 
    : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&auto=format&fit=crop&q=60';

  const displayThumbnail = thumbnail || fallbackThumbnail;

  if (!url) {
    return (
      <div className="w-full aspect-video rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 text-xs border border-zinc-200 dark:border-zinc-800">
        No video URL provided
      </div>
    );
  }

  return (
    <>
      <div 
        onClick={() => setIsPlaying(true)}
        className="group relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer bg-black border border-zinc-100 dark:border-zinc-800/80 shadow-md"
      >
        <img 
          src={displayThumbnail} 
          alt={title || "Video thumbnail"} 
          className="w-full h-full object-cover opacity-85 group-hover:opacity-75 transition-opacity duration-300 group-hover:scale-102"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-900/90 text-primary flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <Play className="w-5.5 h-5.5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Video Info Overlay */}
        {title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-6">
            <p className="text-white text-xs font-medium truncate">
              {title}
            </p>
          </div>
        )}
      </div>

      {/* Video Modal Player */}
      <Modal 
        isOpen={isPlaying} 
        onClose={() => setIsPlaying(false)} 
        title={title || "Video Preview"}
        size="lg"
      >
        <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black">
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-400">
              Invalid YouTube URL format
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default VideoPreview;
