import React, { useState } from 'react';
import { Send, CheckCircle, ChevronDown, Info } from 'lucide-react';

const SubmitProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    height: '',
    weight: '',
    location: '',
    preferred: 'Birthday'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setIsSubmitted(true);
    }
  };

  return (
    <section id="submit" className="py-20 px-6 bg-secondary/30 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-rose-200/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12" data-aos="fade-up">
          <p className="text-primary text-xs font-bold tracking-widest mb-3 uppercase">Join Our Roster</p>
          <h2 className="text-3xl md:text-5xl font-serif text-dark font-medium uppercase tracking-wide">
            SUBMIT YOUR PROFILE
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div
          data-aos="zoom-in"
          className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden text-left"
        >
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary"></div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="submit-name" className="text-xs font-bold text-dark/70 tracking-wider uppercase">Name</label>
                <input
                  type="text"
                  id="submit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-black/5 text-dark text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="submit-email" className="text-xs font-bold text-dark/70 tracking-wider uppercase">Email</label>
                <input
                  type="email"
                  id="submit-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-black/5 text-dark text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label htmlFor="submit-phone" className="text-xs font-bold text-dark/70 tracking-wider uppercase">Phone</label>
                <input
                  type="tel"
                  id="submit-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Your mobile number"
                  className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-black/5 text-dark text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
                />
              </div>

              {/* Height */}
              <div className="flex flex-col gap-2">
                <label htmlFor="submit-height" className="text-xs font-bold text-dark/70 tracking-wider uppercase">Height</label>
                <input
                  type="text"
                  id="submit-height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="e.g. 5'8\ or 173 cm"
                  className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-black/5 text-dark text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
                />
              </div>

              {/* Weight */}
              <div className="flex flex-col gap-2">
                <label htmlFor="submit-weight" className="text-xs font-bold text-dark/70 tracking-wider uppercase">Weight</label>
                <input
                  type="text"
                  id="submit-weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g. 62 kg or 136 lbs"
                  className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-black/5 text-dark text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
                />
              </div>

              {/* Location */}
              <div className="flex flex-col gap-2">
                <label htmlFor="submit-location" className="text-xs font-bold text-dark/70 tracking-wider uppercase">Location</label>
                <input
                  type="text"
                  id="submit-location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Chennai, Mumbai"
                  className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-black/5 text-dark text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
                />
              </div>

              {/* Preference Selection (Choose Our Services) */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <label htmlFor="submit-preferred" className="text-xs font-bold text-dark/70 tracking-wider uppercase">Select the Preferred One</label>
                <div className="relative">
                  <select
                    id="submit-preferred"
                    name="preferred"
                    value={formData.preferred}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-black/5 text-dark text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="Birthday">Birthday</option>
                    <option value="Modelling">Modelling</option>
                    <option value="Acting School">Acting School</option>
                    <option value="Shooting House">Shooting House</option>
                    <option value="Others">Others</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-dark/50">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl overflow-hidden group hover:scale-[1.01] transition-transform duration-300 shadow-lg shadow-primary/20 bg-primary cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="text-white font-bold text-sm tracking-widest uppercase">
                    SEND
                  </span>
                  <Send size={16} className="text-white" />
                </button>
              </div>

            </form>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12 gap-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-dark mb-2">Profile Submitted!</h3>
                <p className="text-dark/60 text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-dark font-medium">{formData.name}</strong>. Your casting profile has been successfully sent to Thaara Umesh Casting Agency.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', height: '', weight: '', location: '', preferred: 'Birthday' });
                }}
                className="text-primary hover:text-primary-dark font-bold text-sm tracking-wide uppercase transition-colors"
              >
                Submit Another Profile
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default SubmitProfile;
