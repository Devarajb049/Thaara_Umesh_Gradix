import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, ChevronDown, Compass } from 'lucide-react';

const SubmitProfilePage = () => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="min-h-screen bg-secondary/10 flex flex-col pt-24 font-sans">
      {/* Top Banner */}
      <section className="relative py-20 md:py-24 px-6 bg-black overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1533928298208-27ff66555d8d?q=80&w=2000&auto=format&fit=crop"
            alt="Submit Profile Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-secondary/10"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center" data-aos="zoom-in">
          <p className="text-primary text-xs font-bold tracking-widest mb-4 uppercase drop-shadow-md">Talent Application</p>
          <h1 className="text-5xl md:text-6xl font-serif text-white font-bold mb-4 drop-shadow-2xl">
            SUBMIT YOUR PROFILE
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
            Fill in your measurements and details to apply as an actor or model with Thaara Umesh Casting Agency.
          </p>
        </div>
      </section>

      {/* Profile Submission Form Section */}
      <section className="flex-grow py-16 px-6 relative z-20 -mt-10">
        <div className="max-w-3xl mx-auto">
          <div
            data-aos="fade-up"
            className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden text-left"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary"></div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 mb-2">
                  <h2 className="text-2xl font-serif text-dark font-bold mb-1">APPLICANT DETAILS</h2>
                  <p className="text-dark/60 text-xs md:text-sm font-light">Please ensure all coordinates and phone details are accurate.</p>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="appl-name" className="text-xs font-bold text-dark/70 tracking-wider uppercase">Name</label>
                  <input
                    type="text"
                    id="appl-name"
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
                  <label htmlFor="appl-email" className="text-xs font-bold text-dark/70 tracking-wider uppercase">Email</label>
                  <input
                    type="email"
                    id="appl-email"
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
                  <label htmlFor="appl-phone" className="text-xs font-bold text-dark/70 tracking-wider uppercase">Phone</label>
                  <input
                    type="tel"
                    id="appl-phone"
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
                  <label htmlFor="appl-height" className="text-xs font-bold text-dark/70 tracking-wider uppercase">Height</label>
                  <input
                    type="text"
                    id="appl-height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="e.g. 5'8\"
                    className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-black/5 text-dark text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
                  />
                </div>

                {/* Weight */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="appl-weight" className="text-xs font-bold text-dark/70 tracking-wider uppercase">Weight</label>
                  <input
                    type="text"
                    id="appl-weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="e.g. 62 kg"
                    className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-black/5 text-dark text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
                  />
                </div>

                {/* Location */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="appl-location" className="text-xs font-bold text-dark/70 tracking-wider uppercase">Location</label>
                  <input
                    type="text"
                    id="appl-location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Chennai, Mumbai"
                    className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-black/5 text-dark text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
                  />
                </div>

                {/* Select the preferred one dropdown */}
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label htmlFor="appl-preferred" className="text-xs font-bold text-dark/70 tracking-wider uppercase">Select the Preferred One</label>
                  <div className="relative">
                    <select
                      id="appl-preferred"
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
                    Thank you, <strong className="text-dark font-medium">{formData.name}</strong>. Your profile has been successfully sent to Thaara Umesh Casting Agency.
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
    </div>
  );
};

export default SubmitProfilePage;
