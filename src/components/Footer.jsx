const Footer = () => {
  const links = {
    QuickLinks: ['Home', 'About Us', 'Showcase', 'Acting Advice'],
    Social: [
      { name: 'Facebook', url: 'https://www.facebook.com/thaaraumesh.modelling.agency/' },
      { name: 'Instagram', url: 'https://www.instagram.com/taaraumesh/' },
      { name: 'YouTube', url: 'https://www.youtube.com/@thaaraumeshcasting' },
    ],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy']
  };

  return (
    <footer className="bg-secondary pt-20 pb-10 px-6 border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-16">
        <div className="max-w-sm">
          <h3 className="text-2xl font-serif text-primary font-semibold mb-6">Thaara Umesh Casting Agency</h3>
          <p className="text-dark/60 text-sm leading-relaxed mb-8">
            A leading powerhouse in casting and talent representation since 1998. Our commitment is to find and groom the stars of tomorrow.
          </p>
          <div className="flex gap-4">
            {[
              { icon: 'fa-brands fa-facebook-f', url: 'https://www.facebook.com/thaaraumesh.modelling.agency/', label: 'Facebook' },
              { icon: 'fa-brands fa-instagram', url: 'https://www.instagram.com/taaraumesh/', label: 'Instagram' },
              { icon: 'fa-brands fa-youtube', url: 'https://www.youtube.com/@thaaraumeshcasting', label: 'YouTube' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.url}
                aria-label={social.label}
                target={social.url.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-sm text-dark hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-16">
          <div>
            <h4 className="font-bold text-xs tracking-widest text-dark mb-6 uppercase">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              {links.QuickLinks.map((link, i) => (
                <li key={i}>
                  <a href={`#${link}`} className="text-sm text-dark/70 hover:text-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs tracking-widest text-dark mb-6 uppercase">Social & Connect</h4>
            <ul className="flex flex-col gap-4">
              {links.Social.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.url}
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="text-sm text-dark/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs tracking-widest text-dark mb-6 uppercase">Legal</h4>
            <ul className="flex flex-col gap-4">
              {links.Legal.map((link, i) => (
                <li key={i}>
                  <a href={`#${link}`} className="text-sm text-dark/70 hover:text-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-dark/50">
        <p>Thaara Umesh Casting Agency © Copyright 2025 | All Rights Reserved.</p>
        <p>
          Designed by <a href="https://gradixtech.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-semibold">arvicomm.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
