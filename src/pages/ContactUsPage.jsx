import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, Award, Compass, ChevronDown } from 'lucide-react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Modelling',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/10 flex flex-col pt-24 font-sans">
      {/* Cinematic Top Banner */}
      <section className="relative py-24 md:py-32 px-6 bg-black overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" 
            alt="Office Banner" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-secondary/10"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center" data-aos="zoom-in">
          <p className="text-primary text-xs font-bold tracking-widest mb-4 uppercase drop-shadow-md">Get In Touch</p>
          <h1 className="text-5xl md:text-7xl font-serif text-white font-bold mb-4 drop-shadow-2xl">
            CONTACT US
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
            Reach out to our corporate office for hiring talents, casting, bookings or any business inquiries.
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="flex-grow py-16 px-6 relative z-20 -mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Office Details */}
            <div className="lg:col-span-5 text-left" data-aos="fade-right">
              <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-black/5 shadow-[0_15px_40px_rgba(0,0,0,0.03)]">
                
                {/* Header */}
                <p className="text-primary text-xs font-bold tracking-widest mb-3 uppercase">Corporate Headquarters</p>
                <h2 className="text-2xl md:text-3xl font-serif text-dark font-bold mb-8 uppercase leading-tight">
                  THAARA UMESH CASTING AGENCY
                </h2>

                {/* Details List */}
                <div className="flex flex-col gap-8">
                  {/* Address */}
                  <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 transition-transform group-hover:scale-110">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className="text-dark font-bold text-sm tracking-wide uppercase mb-1.5">Corporate Office</h4>
                      <p className="text-dark/70 text-sm md:text-base leading-relaxed font-light">
                        #14/8, Vivek Bajaj flats. Ground floor, Sterling 1st cross street, Nungambakkam, Chennai-34.
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 transition-transform group-hover:scale-110">
                      <Phone size={18} />
                    </div>
                    <div>
                      <h4 className="text-dark font-bold text-sm tracking-wide uppercase mb-1.5">Phone & Mobile</h4>
                      <a 
                        href="tel:+917395915551" 
                        className="text-dark/70 text-sm md:text-base font-light hover:text-primary transition-colors block"
                      >
                        +91 7395 915 551
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 transition-transform group-hover:scale-110">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h4 className="text-dark font-bold text-sm tracking-wide uppercase mb-1.5">Email Support</h4>
                      <a 
                        href="mailto:taaraumesh@gmail.com" 
                        className="text-dark/70 text-sm md:text-base font-light hover:text-primary transition-colors block"
                      >
                        taaraumesh@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Additional Info / Note */}
                <div className="mt-10 pt-8 border-t border-black/5 flex items-start gap-3">
                  <Award className="text-primary w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-dark/60 text-xs leading-relaxed font-light">
                    Over 30 years of casting experience matching actors and models to national advertisements and feature productions.
                  </p>
                </div>

              </div>
            </div>

            {/* Right Column: Contact/Hire Us Form */}
            <div className="lg:col-span-7" data-aos="fade-left">
              <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-black/5 shadow-[0_15px_40px_rgba(0,0,0,0.03)] text-left relative overflow-hidden">
                
                {/* Decorative border line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary"></div>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-serif text-dark font-bold mb-2">
                        CONTACT & HIRE US
                      </h2>
                      <p className="text-dark/60 text-xs md:text-sm font-light">
                        Reach out for agency services, casting partnerships, or studio bookings.
                      </p>
                    </div>

                    {/* Name input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-bold text-dark/70 tracking-wider uppercase">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name" 
                        className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-black/5 text-dark text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email input */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs font-bold text-dark/70 tracking-wider uppercase">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Your email address" 
                          className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-black/5 text-dark text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
                        />
                      </div>

                      {/* Phone input */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-xs font-bold text-dark/70 tracking-wider uppercase">Phone</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="Your phone number" 
                          className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-black/5 text-dark text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Services Choice dropdown */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="service" className="text-xs font-bold text-dark/70 tracking-wider uppercase">Preferred Service</label>
                      <div className="relative">
                        <select 
                          id="service" 
                          name="service" 
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-black/5 text-dark text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 appearance-none cursor-pointer"
                        >
                          <option value="Modelling">Modelling & Actor Casting</option>
                          <option value="Acting School">Acting School Registration</option>
                          <option value="Shooting House">Shooting House Booking</option>
                          <option value="Corporate/Casting">Corporate Collaborations</option>
                          <option value="Others">Others</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-dark/50">
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>

                    {/* Message textarea */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-xs font-bold text-dark/70 tracking-wider uppercase">Message / Inquiry Details</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Tell us about your requirements..." 
                        className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-black/5 text-dark text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 resize-none"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      className="mt-4 relative w-full py-4 rounded-xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-primary/20 bg-primary cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span className="relative z-10 text-white font-bold text-sm tracking-widest uppercase">
                        SEND MESSAGE
                      </span>
                      <Send size={16} className="text-white relative z-10" />
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Compass size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-dark mb-2">Message Sent!</h3>
                      <p className="text-dark/60 text-sm max-w-sm mx-auto leading-relaxed">
                        Thank you, <strong className="text-dark font-medium">{formData.name}</strong>. Your inquiry has been sent. Our team will get back to you shortly.
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', service: 'Modelling', message: '' });
                      }}
                      className="text-primary hover:text-primary-dark font-bold text-sm tracking-wide uppercase mt-4 transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
