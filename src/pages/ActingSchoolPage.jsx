import React, { useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import ActingSchoolContent from '../components/ActingSchoolContent';
import Testimonials from '../components/Testimonials';

const ActingSchoolPage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col min-h-screen">
      <HeroSlider />
      <ActingSchoolContent />
      <Testimonials />
    </div>
  );
};

export default ActingSchoolPage;
