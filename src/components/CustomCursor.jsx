import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     ('ontouchstart' in window) || 
                     (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };

    checkDevice();
    
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    // Bind mouseenter and mouseleave to hoverable targets
    const addHoverEvents = () => {
      const interactives = document.querySelectorAll('a, button, input, select, textarea, [role="button"], .cursor-pointer, .hover-target');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    addHoverEvents();
    
    // Dynamic element observer to bind new elements when rendered
    const observer = new MutationObserver(addHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, [isMobile]);

  // Smooth trailing logic using requestAnimationFrame
  useEffect(() => {
    if (isMobile || isHidden) return;
    
    let reqId;
    const animateTrail = () => {
      setTrail(prev => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15
        };
      });
      reqId = requestAnimationFrame(animateTrail);
    };

    reqId = requestAnimationFrame(animateTrail);
    return () => cancelAnimationFrame(reqId);
  }, [position, isMobile, isHidden]);

  if (isMobile || isHidden) return null;

  return (
    <>
      {/* Hide standard cursor globally via styling when custom cursor is active */}
      <style>{`
        @media (min-width: 768px) {
          body, a, button, input, select, textarea, [role="button"], .cursor-pointer {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Inner solid dot */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-primary rounded-full pointer-events-none z-[99999] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x - 5}px, ${position.y - 5}px, 0) scale(${isHovered ? 1.4 : 1})`,
        }}
      />
      
      {/* Outer trailing circle */}
      <div
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[99998] border border-primary/50 transition-all duration-300 ease-out bg-primary/5"
        style={{
          transform: `translate3d(${trail.x - 18}px, ${trail.y - 18}px, 0) scale(${isHovered ? 1.5 : 1})`,
        }}
      />
    </>
  );
};

export default CustomCursor;
