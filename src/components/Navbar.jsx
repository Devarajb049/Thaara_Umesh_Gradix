import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'HOME', path: '/' },
    { name: 'OUR CLIENTS', path: '/ourclients' },
    { name: 'SHOWCASE', path: '/showcase' },
    { name: 'ACTING SCHOOL', path: '/actingschool' },
    { name: 'SHOOTING HOUSE', path: '/shootinghouse' },
    { name: 'CONTACT US', path: '/contact' }
  ];

  // Prevent scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  // Handle smooth scroll for hash links when on the same page
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <nav className="fixed w-full z-40 px-6 py-2.5 md:py-4 transition-all duration-300 backdrop-blur-md bg-secondary/80 border-b border-black/5" data-aos="fade-down">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/images/Thaara_Umesh_Logo.png" 
              alt="Thaara Umesh Casting Agency Logo" 
              className="h-12 md:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest text-dark/70">
            {links.map((link) => {
              const isHashLink = link.path.includes('#');
              // If it's a hash link for the current page, use standard <a> for smooth Lenis scroll
              if (isHashLink && location.pathname === '/') {
                return (
                  <a key={link.name} href={link.path.replace('/', '')} className="hover:text-primary transition-colors">
                    {link.name}
                  </a>
                );
              }
              // Otherwise use React Router Link
              return (
                <Link key={link.name} to={link.path} className={`hover:text-primary transition-colors ${location.pathname === link.path ? 'text-primary' : ''}`}>
                  {link.name}
                </Link>
              );
            })}
            <Link to="/submit-profile" className="bg-primary text-white px-6 py-2.5 rounded-full hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
              SUBMIT PROFILE
            </Link>
          </div>

          {/* Mobile Menu Toggle (Open) */}
          <button className="md:hidden text-dark relative z-40" onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Sidebar/Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-secondary shadow-2xl z-[60] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Close Button inside Sidebar */}
        <div className="flex justify-end p-6">
          <button className="text-dark hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col gap-6 px-8 pt-4">
          {links.map((link, index) => {
            const isHashLink = link.path.includes('#');
            if (isHashLink && location.pathname === '/') {
              return (
                <a 
                  key={link.name} 
                  href={link.path.replace('/', '')} 
                  className={`text-sm font-semibold tracking-widest text-dark/80 hover:text-primary border-b border-black/5 pb-2 transform transition-all duration-500 ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                  style={{ transitionDelay: `${isOpen ? 100 + index * 50 : 0}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              );
            }
            return (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`text-sm font-semibold tracking-widest text-dark/80 hover:text-primary border-b border-black/5 pb-2 transform transition-all duration-500 ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'} ${location.pathname === link.path ? 'text-primary' : ''}`}
                style={{ transitionDelay: `${isOpen ? 100 + index * 50 : 0}ms` }}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          <Link 
            to="/submit-profile" 
            className={`bg-primary text-white px-6 py-3 rounded-full text-center font-semibold text-sm w-full mt-4 shadow-lg shadow-primary/20 transform transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionDelay: `${isOpen ? 100 + links.length * 50 : 0}ms` }}
            onClick={() => setIsOpen(false)}
          >
            SUBMIT PROFILE
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
