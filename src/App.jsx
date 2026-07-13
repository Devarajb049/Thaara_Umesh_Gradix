import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
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

// Admin Imports
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import ClientsManager from './admin/pages/ClientsManager';
import ShowcaseManager from './admin/pages/ShowcaseManager';
import ActingSchoolManager from './admin/pages/ActingSchoolManager';
import ShootingHouseManager from './admin/pages/ShootingHouseManager';
import ContactManager from './admin/pages/ContactManager';
import ArtistRegistrationManager from './admin/pages/ArtistRegistrationManager';
import AdminLogin from './admin/pages/AdminLogin';
import { DataProvider } from './admin/context/DataContext';

// Public Layout to isolate original Navbar, Footer, and BackToTop from Admin
const PublicLayout = () => {
  return (
    <div className="min-h-screen font-sans text-dark bg-secondary overflow-hidden flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

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
    <DataProvider>
      <Router>
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/ourclients" element={<OurClientsPage />} />
            <Route path="/showcase" element={<ShowcasePage />} />
            <Route path="/actingschool" element={<ActingSchoolPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/shootinghouse" element={<ShootingHousePage />} />
            <Route path="/submit-profile" element={<SubmitProfilePage />} />
          </Route>

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Isolated Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<ClientsManager />} />
            <Route path="showcase" element={<ShowcaseManager />} />
            <Route path="acting-school" element={<ActingSchoolManager />} />
            <Route path="shooting-house" element={<ShootingHouseManager />} />
            <Route path="contact" element={<ContactManager />} />
            <Route path="artist-registrations" element={<ArtistRegistrationManager />} />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;

