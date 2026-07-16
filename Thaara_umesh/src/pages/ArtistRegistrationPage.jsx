import React, { useState } from 'react';
import { useData } from '../admin/context/DataContext';
import { 
  User, Mail, Phone, Calendar, MapPin, 
  ArrowUp, Sparkles, CheckCircle2, ChevronRight,
  Info, Loader2, UploadCloud, Link as LinkIcon, AlertCircle
} from 'lucide-react';

const ArtistRegistrationPage = () => {
  const { registerArtist } = useData();

  // State management
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    height: '',
    weight: '',
    languages: '',
    experience: '',
    skills: '',
    categories: '',
    instagram: '',
    facebook: '',
    portfolioWebsite: '',
    profileDescription: '',
    profilePhoto: '',
    portfolioImages: [],
    resumeUrl: '',
    introVideoUrl: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [portfolioUploading, setPortfolioUploading] = useState(false);
  const [resumeUploading, setResumeUploading] = useState(false);

  // Validation
  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (formData.phone.length < 10) {
        newErrors.phone = 'Enter a valid phone number';
      }
      if (!formData.dob) newErrors.dob = 'Date of Birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    } else if (currentStep === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.country.trim()) newErrors.country = 'Country is required';
    } else if (currentStep === 3) {
      if (!formData.categories) newErrors.categories = 'Please select at least one Category';
      if (!formData.height.trim()) newErrors.height = 'Height is required (e.g. 5\'9")';
      if (!formData.weight.trim()) newErrors.weight = 'Weight is required (e.g. 60 kg)';
      if (!formData.languages.trim()) newErrors.languages = 'Languages are required';
    } else if (currentStep === 4) {
      if (!formData.profilePhoto) newErrors.profilePhoto = 'Profile photo is required';
      if (!formData.resumeUrl) newErrors.resumeUrl = 'Resume PDF is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Upload handlers
  const handleSingleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'photo') setPhotoUploading(true);
    if (type === 'resume') setResumeUploading(true);

    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const folderName = type === 'photo' ? 'artists_photos' : 'resumes';
      const response = await fetch(`/api/upload?folder=${folderName}`, {
        method: 'POST',
        body: uploadData
      });
      const data = await response.json();
      if (data.success) {
        if (type === 'photo') {
          setFormData(prev => ({ ...prev, profilePhoto: data.url }));
        } else {
          setFormData(prev => ({ ...prev, resumeUrl: data.url }));
        }
      } else {
        alert(data.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      // fallback
      const mockUrl = `/uploads/${type === 'photo' ? 'artists_photos' : 'resumes'}/${Date.now()}-${file.name}`;
      if (type === 'photo') {
        setFormData(prev => ({ ...prev, profilePhoto: mockUrl }));
      } else {
        setFormData(prev => ({ ...prev, resumeUrl: mockUrl }));
      }
    } finally {
      setPhotoUploading(false);
      setResumeUploading(false);
    }
  };

  const handleMultipleUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setPortfolioUploading(true);
    const uploadData = new FormData();
    Array.from(files).forEach(file => {
      uploadData.append('images', file);
    });

    try {
      const response = await fetch('/api/upload/multiple?folder=portfolios', {
        method: 'POST',
        body: uploadData
      });
      const data = await response.json();
      if (data.success) {
        setFormData(prev => ({
          ...prev,
          portfolioImages: [...prev.portfolioImages, ...data.urls]
        }));
      }
    } catch (err) {
      console.error(err);
      // fallback
      const mockUrls = Array.from(files).map((f, i) => `/uploads/portfolios/${Date.now()}-${i}-${f.name}`);
      setFormData(prev => ({
        ...prev,
        portfolioImages: [...prev.portfolioImages, ...mockUrls]
      }));
    } finally {
      setPortfolioUploading(false);
    }
  };

  const removePortfolioImage = (index) => {
    setFormData(prev => ({
      ...prev,
      portfolioImages: prev.portfolioImages.filter((_, i) => i !== index)
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    try {
      const res = await registerArtist(formData);
      if (res.success) {
        setSubmitResult(res);
      } else {
        alert('Failed to register. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsList = [
    { num: 1, name: 'Personal' },
    { num: 2, name: 'Contact' },
    { num: 3, name: 'Attributes' },
    { num: 4, name: 'Media' }
  ];

  if (submitResult) {
    return (
      <div className="min-h-screen bg-[#fdf5f5] py-20 px-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-[2.5rem] border border-zinc-150 p-8 md:p-12 text-center shadow-xl animate-fade-in flex flex-col items-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6 border border-green-100">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 mb-3">
            Registration Submitted!
          </h1>
          <p className="text-sm md:text-base text-zinc-500 max-w-md mb-8">
            Thank you, <span className="font-semibold text-zinc-800">{formData.fullName}</span>. Your artist application is registered under pending approval. Our casting team will review it shortly.
          </p>

          {/* Email Log Receipt */}
          <div className="w-full bg-[#FCF8F8] border border-zinc-150 rounded-3xl p-6 text-left mb-8">
            <div className="flex items-center justify-between mb-4 border-b border-zinc-200/60 pb-3">
              <span className="text-[10px] uppercase tracking-widest font-black text-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Simulated Email Dispatch
              </span>
              <span className="text-[10px] font-semibold text-zinc-400">To: {formData.email}</span>
            </div>
            <div className="text-xs text-zinc-550 space-y-1.5 font-mono">
              <p><b>Subject:</b> {submitResult.simulatedEmail?.subject}</p>
              <p><b>From:</b> no-reply@thaaraumesh.com</p>
            </div>
            <div 
              className="mt-4 p-4 bg-white border border-zinc-100 rounded-2xl text-xs overflow-x-auto text-zinc-700 leading-relaxed font-sans max-h-60 overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: submitResult.simulatedEmail?.body }}
            />
          </div>

          <button 
            onClick={() => window.location.href = '/'}
            className="px-8 py-3.5 bg-primary text-white font-semibold text-sm rounded-2xl hover:bg-primary-dark shadow-lg shadow-primary/10 transition-all active:scale-98"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf5f5] py-28 px-4 md:px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        
        {/* Header Title */}
        <div className="text-center select-none" data-aos="fade-up">
          <span className="text-xs md:text-sm font-black tracking-widest text-primary uppercase bg-primary/5 px-4 py-1.5 rounded-full inline-block mb-3">
            CASTING REGISTRATION
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-zinc-900 tracking-tight">
            Register as an Artist
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 mt-2 max-w-lg mx-auto">
            Submit your profile, physical measurements, portfolio, and experience to get casting opportunities with top brands.
          </p>
        </div>

        {/* Progress Timeline */}
        <div className="w-full bg-white rounded-3xl border border-zinc-150 p-4 md:p-6 shadow-sm flex items-center justify-between select-none" data-aos="fade-up" data-aos-delay="100">
          {stepsList.map((s, idx) => (
            <React.Fragment key={s.num}>
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s.num 
                    ? 'bg-primary text-white ring-4 ring-primary/10' 
                    : step > s.num 
                      ? 'bg-green-600 text-white' 
                      : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
                }`}>
                  {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                </div>
                <span className={`hidden sm:inline text-xs font-bold tracking-wider uppercase ${
                  step === s.num ? 'text-zinc-800' : 'text-zinc-400'
                }`}>
                  {s.name}
                </span>
              </div>
              {idx < stepsList.length - 1 && (
                <div className="flex-1 h-[2px] bg-zinc-150 mx-4 max-w-[40px] sm:max-w-none" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form Container */}
        <div className="w-full bg-white rounded-[2.5rem] border border-zinc-150 p-6 md:p-10 shadow-lg" data-aos="fade-up" data-aos-delay="200">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* STEP 1: PERSONAL DETAILS */}
            {step === 1 && (
              <div className="flex flex-col gap-5 text-left">
                <div className="border-b border-zinc-100 pb-3 flex items-center justify-between">
                  <h2 className="text-xl font-bold font-serif text-zinc-900">Personal Details</h2>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Step 1 of 4</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> Full Name *
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Aria Dev"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full focus:ring-1 focus:ring-primary focus:border-primary text-sm bg-white"
                    />
                    {errors.fullName && <span className="text-xs text-rose-600 font-semibold">{errors.fullName}</span>}
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" /> Email Address *
                    </label>
                    <input 
                      type="email" 
                      placeholder="e.g. aria.dev@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full text-sm bg-white"
                    />
                    {errors.email && <span className="text-xs text-rose-600 font-semibold">{errors.email}</span>}
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" /> Phone Number *
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full text-sm bg-white"
                    />
                    {errors.phone && <span className="text-xs text-rose-600 font-semibold">{errors.phone}</span>}
                  </div>

                  {/* Date of Birth */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Date of Birth *
                    </label>
                    <input 
                      type="date" 
                      value={formData.dob}
                      onChange={(e) => setFormData(prev => ({ ...prev, dob: e.target.value }))}
                      className="w-full text-sm bg-white"
                    />
                    {errors.dob && <span className="text-xs text-rose-600 font-semibold">{errors.dob}</span>}
                  </div>

                  {/* Gender */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Gender *</label>
                    <select 
                      value={formData.gender}
                      onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                      className="w-full text-sm bg-white cursor-pointer"
                    >
                      <option value="">Select Gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Non-Binary">Non-Binary</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <span className="text-xs text-rose-600 font-semibold">{errors.gender}</span>}
                  </div>
                </div>

                {/* Profile Description */}
                <div className="flex flex-col gap-1.5 mt-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Profile Description / Short Bio</label>
                  <textarea 
                    rows="3"
                    placeholder="Describe yourself, your personality, and type of modeling/acting projects you seek..."
                    value={formData.profileDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, profileDescription: e.target.value }))}
                    className="w-full text-sm bg-white resize-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: ADDRESS & CONTACT DETAILS */}
            {step === 2 && (
              <div className="flex flex-col gap-5 text-left">
                <div className="border-b border-zinc-100 pb-3 flex items-center justify-between">
                  <h2 className="text-xl font-bold font-serif text-zinc-900">Address & Contact Details</h2>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Step 2 of 4</span>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> Full Address *
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Street name, Apartment, Area"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full text-sm bg-white"
                  />
                  {errors.address && <span className="text-xs text-rose-600 font-semibold">{errors.address}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* City */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">City *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Hyderabad"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full text-sm bg-white"
                    />
                    {errors.city && <span className="text-xs text-rose-600 font-semibold">{errors.city}</span>}
                  </div>

                  {/* State */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">State *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Telangana"
                      value={formData.state}
                      onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full text-sm bg-white"
                    />
                    {errors.state && <span className="text-xs text-rose-600 font-semibold">{errors.state}</span>}
                  </div>

                  {/* Country */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Country *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. India"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full text-sm bg-white"
                    />
                    {errors.country && <span className="text-xs text-rose-600 font-semibold">{errors.country}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: ATTRIBUTES & TALENTS */}
            {step === 3 && (
              <div className="flex flex-col gap-5 text-left">
                <div className="border-b border-zinc-100 pb-3 flex items-center justify-between">
                  <h2 className="text-xl font-bold font-serif text-zinc-900">Physical Attributes & Talents</h2>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Step 3 of 4</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Height */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Height *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 5ft 8in or 173 cm"
                      value={formData.height}
                      onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                      className="w-full text-sm bg-white"
                    />
                    {errors.height && <span className="text-xs text-rose-600 font-semibold">{errors.height}</span>}
                  </div>

                  {/* Weight */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Weight *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 58 kg"
                      value={formData.weight}
                      onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                      className="w-full text-sm bg-white"
                    />
                    {errors.weight && <span className="text-xs text-rose-600 font-semibold">{errors.weight}</span>}
                  </div>

                  {/* Languages Known */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Languages Known *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. English, Hindi, Tamil"
                      value={formData.languages}
                      onChange={(e) => setFormData(prev => ({ ...prev, languages: e.target.value }))}
                      className="w-full text-sm bg-white"
                    />
                    {errors.languages && <span className="text-xs text-rose-600 font-semibold">{errors.languages}</span>}
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Categories *</label>
                  <select 
                    value={formData.categories}
                    onChange={(e) => setFormData(prev => ({ ...prev, categories: e.target.value }))}
                    className="w-full text-sm bg-white cursor-pointer"
                  >
                    <option value="">Select Categories</option>
                    <option value="Model">Model</option>
                    <option value="Actor">Actor</option>
                    <option value="Model, Actor">Model & Actor</option>
                    <option value="Child Artist">Child Artist</option>
                    <option value="Voice Artist">Voice Artist</option>
                    <option value="Stunts / Action">Stunts / Action</option>
                  </select>
                  {errors.categories && <span className="text-xs text-rose-600 font-semibold">{errors.categories}</span>}
                </div>

                {/* Skills */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Special Skills</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Horse Riding, Singing, Martial Arts, Accents"
                    value={formData.skills}
                    onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                    className="w-full text-sm bg-white"
                  />
                </div>

                {/* Experience */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Experience Summary</label>
                  <textarea 
                    rows="3"
                    placeholder="Detail past brands, theater plays, short films, ad shoots, years in modeling..."
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full text-sm bg-white resize-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: SOCIAL LINKS & MULTIMEDIA UPLOADS */}
            {step === 4 && (
              <div className="flex flex-col gap-5 text-left">
                <div className="border-b border-zinc-100 pb-3 flex items-center justify-between">
                  <h2 className="text-xl font-bold font-serif text-zinc-900">Multimedia, Social & Resume</h2>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Step 4 of 4</span>
                </div>

                {/* Social Handles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Instagram Link</label>
                    <input 
                      type="text" 
                      placeholder="https://instagram.com/..."
                      value={formData.instagram}
                      onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                      className="w-full text-sm bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Facebook Link</label>
                    <input 
                      type="text" 
                      placeholder="https://facebook.com/..."
                      value={formData.facebook}
                      onChange={(e) => setFormData(prev => ({ ...prev, facebook: e.target.value }))}
                      className="w-full text-sm bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Portfolio Website</label>
                    <input 
                      type="text" 
                      placeholder="https://yourportfolio.com"
                      value={formData.portfolioWebsite}
                      onChange={(e) => setFormData(prev => ({ ...prev, portfolioWebsite: e.target.value }))}
                      className="w-full text-sm bg-white"
                    />
                  </div>
                </div>

                {/* Profile Photo File Upload */}
                <div className="flex flex-col gap-1.5 border border-zinc-100 bg-[#FCF8F8] p-5 rounded-2xl">
                  <label className="text-xs font-black text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <UploadCloud className="w-4 h-4" /> Profile Photo *
                  </label>
                  <p className="text-[10px] text-zinc-450 font-bold mb-2">Upload a professional high-resolution headshot.</p>
                  
                  <div className="flex items-center gap-4">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleSingleUpload(e, 'photo')}
                      className="hidden" 
                      id="profile-photo-file"
                    />
                    <label 
                      htmlFor="profile-photo-file"
                      className="px-4 py-2 bg-white border border-primary text-primary hover:bg-[#FCF8F8] font-bold text-xs rounded-xl cursor-pointer transition-colors"
                    >
                      {photoUploading ? 'Uploading...' : 'Choose headshot'}
                    </label>

                    {formData.profilePhoto && (
                      <div className="w-12 h-12 rounded-xl border border-zinc-200 overflow-hidden">
                        <img src={formData.profilePhoto} alt="headshot" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  {errors.profilePhoto && <span className="text-xs text-rose-600 font-semibold">{errors.profilePhoto}</span>}
                </div>

                {/* Portfolio Multiple Images Upload */}
                <div className="flex flex-col gap-1.5 border border-zinc-100 bg-[#FCF8F8] p-5 rounded-2xl">
                  <label className="text-xs font-black text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <UploadCloud className="w-4 h-4" /> Portfolio Gallery (Max 10 Images)
                  </label>
                  <p className="text-[10px] text-zinc-450 font-bold mb-2">Upload multiple pictures highlighting various styles, angles, or outfits.</p>
                  
                  <input 
                    type="file" 
                    accept="image/*"
                    multiple
                    onChange={handleMultipleUpload}
                    className="hidden" 
                    id="portfolio-images-files"
                  />
                  <label 
                    htmlFor="portfolio-images-files"
                    className="px-4 py-2 bg-white border border-primary text-primary hover:bg-[#FCF8F8] font-bold text-xs rounded-xl cursor-pointer self-start transition-colors"
                  >
                    {portfolioUploading ? 'Uploading images...' : 'Add portfolio pictures'}
                  </label>

                  {formData.portfolioImages.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-3">
                      {formData.portfolioImages.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-xl border border-zinc-200 overflow-hidden bg-white group">
                          <img src={img} alt="portfolio" className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => removePortfolioImage(idx)}
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-650 hover:bg-rose-700 text-white flex items-center justify-center text-[10px]"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Resume PDF File Upload */}
                <div className="flex flex-col gap-1.5 border border-zinc-100 bg-[#FCF8F8] p-5 rounded-2xl">
                  <label className="text-xs font-black text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <UploadCloud className="w-4 h-4" /> Resume / CV (PDF Only) *
                  </label>
                  <p className="text-[10px] text-zinc-450 font-bold mb-2">Upload your modeling cards or physical resumes containing measurements and skills.</p>
                  
                  <div className="flex items-center gap-4">
                    <input 
                      type="file" 
                      accept=".pdf"
                      onChange={(e) => handleSingleUpload(e, 'resume')}
                      className="hidden" 
                      id="resume-pdf-file"
                    />
                    <label 
                      htmlFor="resume-pdf-file"
                      className="px-4 py-2 bg-white border border-primary text-primary hover:bg-[#FCF8F8] font-bold text-xs rounded-xl cursor-pointer transition-colors"
                    >
                      {resumeUploading ? 'Uploading CV...' : 'Choose PDF document'}
                    </label>

                    {formData.resumeUrl && (
                      <span className="text-xs text-zinc-500 font-mono truncate max-w-xs">
                        {formData.resumeUrl.split('/').pop()}
                      </span>
                    )}
                  </div>
                  {errors.resumeUrl && <span className="text-xs text-rose-600 font-semibold">{errors.resumeUrl}</span>}
                </div>

                {/* Introduction Video URL */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <LinkIcon className="w-3.5 h-3.5" /> Introduction Video Link (YouTube URL / Video Link)
                  </label>
                  <input 
                    type="text" 
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={formData.introVideoUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, introVideoUrl: e.target.value }))}
                    className="w-full text-sm bg-white"
                  />
                  <span className="text-[9px] text-zinc-400 font-semibold leading-relaxed">
                    Provide a link to a YouTube audition monolouge, ramp-walk demo, or self-introduction video.
                  </span>
                </div>
              </div>
            )}

            {/* BUTTON BAR */}
            <div className="flex items-center justify-between border-t border-zinc-100 pt-6 mt-4 select-none">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2.5 rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-50 font-bold text-sm transition-all"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1 px-6 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-dark shadow-md shadow-primary/10 transition-all ml-auto active:scale-98"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-dark shadow-md shadow-primary/15 transition-all ml-auto active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Profile...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ArtistRegistrationPage;
