import React, { useState } from 'react';
import { useData } from '../admin/context/DataContext';
import { 
  Lock, Eye, Send, CheckCircle2, User, Mail, 
  Briefcase, MessageSquare, AlertCircle, X, Sparkles 
} from 'lucide-react';

const ArtistsPage = () => {
  const { artists, submitProfileRequest } = useData();

  // Filter approved artists
  const approvedArtists = artists.filter(a => a.status === 'approved');

  // Request Access Form State
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    requesterName: '',
    requesterEmail: '',
    companyName: '',
    reason: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openRequestModal = (artist) => {
    setSelectedArtist(artist);
    setFormData({
      requesterName: '',
      requesterEmail: '',
      companyName: '',
      reason: ''
    });
    setErrors({});
    setIsSuccess(false);
  };

  const handleInputChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const err = {};
    if (!formData.requesterName.trim()) err.requesterName = 'Name is required';
    if (!formData.requesterEmail.trim()) {
      err.requesterEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.requesterEmail)) {
      err.requesterEmail = 'Please enter a valid email';
    }
    if (!formData.reason.trim()) err.reason = 'Reason for profile view is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        artistId: selectedArtist.id
      };
      const res = await submitProfileRequest(payload);
      if (res.success) {
        setIsSuccess(true);
      } else {
        alert('Failed to submit request');
      }
    } catch (e) {
      console.error(e);
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf5f5] py-28 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Title */}
        <div className="text-center select-none" data-aos="fade-up">
          <span className="text-xs md:text-sm font-black tracking-widest text-primary uppercase bg-primary/5 px-4 py-1.5 rounded-full inline-block mb-3">
            TALENT DISCOVERY
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-zinc-900 tracking-tight">
            Our Casting Roster
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 mt-2 max-w-lg mx-auto">
            Discover approved models, actors, and child artists. Full portfolio access, contact info, and videos are protected for privacy.
          </p>
        </div>

        {/* Directory Grid */}
        {approvedArtists.length === 0 ? (
          <div className="bg-white border border-zinc-150 rounded-3xl p-16 text-center shadow-sm" data-aos="fade-up" data-aos-delay="100">
            <User className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold font-serif text-zinc-800">No Artists Active</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
              Our casting panel is currently verifying submitted registrations. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8" data-aos="fade-up" data-aos-delay="100">
            {approvedArtists.map((artist) => (
              <div 
                key={artist.id}
                className="group bg-white border border-zinc-150 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                {/* Photo container */}
                <div className="aspect-[4/5] bg-zinc-50 border-b border-zinc-100 overflow-hidden relative">
                  <img 
                    src={artist.profilePhoto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"}
                    alt={artist.fullName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Category overlay tag */}
                  {artist.categories && (
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider">
                      {artist.categories.split(',')[0]}
                    </div>
                  )}
                  
                  {/* Privacy secure indicator */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-zinc-500 shadow-sm">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Name details */}
                <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                  <div className="text-left">
                    <h3 className="text-lg md:text-xl font-bold font-serif text-zinc-900 truncate">
                      {artist.fullName}
                    </h3>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mt-1">
                      Thaara Talent
                    </p>
                  </div>

                  <button
                    onClick={() => openRequestModal(artist)}
                    className="w-full py-2.5 bg-primary/5 group-hover:bg-primary text-primary group-hover:text-white font-bold text-xs rounded-xl tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Profile</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* REQUEST ACCESS MODAL */}
      {selectedArtist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs select-none">
          <div 
            className="w-full max-w-md bg-white border border-zinc-150 rounded-[2.5rem] p-6 md:p-8 relative shadow-2xl animate-fade-in text-left flex flex-col gap-5"
          >
            {/* Close */}
            <button
              onClick={() => setSelectedArtist(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="border-b border-zinc-100 pb-3">
                  <h3 className="text-xl md:text-2xl font-bold font-serif text-zinc-900 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" /> Request Profile Access
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    To request access to <span className="font-semibold text-zinc-800">{selectedArtist.fullName}</span>'s complete profile, please enter your details.
                  </p>
                </div>

                {/* Requester Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-zinc-400" /> Full Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. John Miller"
                    value={formData.requesterName}
                    onChange={(e) => handleInputChange('requesterName', e.target.value)}
                    className="w-full text-sm bg-white"
                  />
                  {errors.requesterName && <span className="text-xs text-rose-600 font-semibold">{errors.requesterName}</span>}
                </div>

                {/* Requester Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-zinc-400" /> Email Address
                  </label>
                  <input 
                    type="email" 
                    placeholder="e.g. john@adagency.com"
                    value={formData.requesterEmail}
                    onChange={(e) => handleInputChange('requesterEmail', e.target.value)}
                    className="w-full text-sm bg-white"
                  />
                  {errors.requesterEmail && <span className="text-xs text-rose-600 font-semibold">{errors.requesterEmail}</span>}
                </div>

                {/* Company Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-zinc-400" /> Company / Agency Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Red Pixels Advertising"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full text-sm bg-white"
                  />
                </div>

                {/* Reason for view */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-zinc-400" /> Reason for Viewing Profile
                  </label>
                  <textarea 
                    rows="3"
                    placeholder="Casting for upcoming corporate ad film campaign. Need to check heights, portfolio details, etc..."
                    value={formData.reason}
                    onChange={(e) => handleInputChange('reason', e.target.value)}
                    className="w-full text-sm bg-white resize-none"
                  />
                  {errors.reason && <span className="text-xs text-rose-600 font-semibold">{errors.reason}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl tracking-wider uppercase transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Request...' : 'Submit Permission Request'}</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6 flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-green-50 border border-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold font-serif text-zinc-900">
                  Request Received
                </h3>
                <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                  Your permission request has been sent. We will review your application. If approved, a secure viewing link will be sent to <span className="font-semibold text-zinc-800">{formData.requesterEmail}</span>.
                </p>

                <div className="bg-[#fcf8f8] border border-zinc-150 rounded-2xl p-4 w-full text-left mt-2">
                  <span className="text-[9px] uppercase tracking-widest font-black text-primary flex items-center gap-1 mb-1">
                    <Sparkles className="w-3 h-3" />
                    Simulated Client Alert
                  </span>
                  <p className="text-[10px] text-zinc-550 leading-relaxed font-sans">
                    A confirmation email has been simulated to <b>{formData.requesterEmail}</b> acknowledging your casting review query.
                  </p>
                </div>

                <button
                  onClick={() => setSelectedArtist(null)}
                  className="mt-4 px-6 py-2.5 border border-primary text-primary hover:bg-primary/5 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistsPage;
