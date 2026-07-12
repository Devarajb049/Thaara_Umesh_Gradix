import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

import Home from './pages/Home';
import OurClientsPage from './pages/OurClientsPage';
import ShowcasePage from './pages/ShowcasePage';
import ActingSchoolPage from './pages/ActingSchoolPage';
import ContactUsPage from './pages/ContactUsPage';
import ShootingHousePage from './pages/ShootingHousePage';
import SubmitProfilePage from './pages/SubmitProfilePage';

function App() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50,
    });

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen font-sans text-dark bg-secondary overflow-hidden flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ourclients" element={<OurClientsPage />} />
            <Route path="/showcase" element={<ShowcasePage />} />
            <Route path="/actingschool" element={<ActingSchoolPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/shootinghouse" element={<ShootingHousePage />} />
            <Route path="/submit-profile" element={<SubmitProfilePage />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
