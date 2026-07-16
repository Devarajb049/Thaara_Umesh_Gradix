import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../admin/context/DataContext';
import { 
  ShieldAlert, ShieldCheck, Mail, Phone, MapPin, 
  Sparkles, Calendar, User, Scale, Ruler, Globe,
  ExternalLink, FileText, Play, ArrowLeft, Loader2 
} from 'lucide-react';

const SecureArtistProfilePage = () => {
  const { token } = useParams();
  const { fetchArtistByToken } = useData();

  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    // Inject noindex tags dynamically to block search indexing
    const metaRobots = document.createElement('meta');
    metaRobots.name = "robots";
    metaRobots.content = "noindex, nofollow";
    document.head.appendChild(metaRobots);

    const loadArtist = async () => {
      try {
        const data = await fetchArtistByToken(token);
        if (data) {
          setArtist(data);
          if (data.portfolioImages && data.portfolioImages.length > 0) {
            setActiveImage(data.portfolioImages[0]);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadArtist();

    return () => {
      document.head.removeChild(metaRobots);
    };
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdf5f5] flex flex-col items-center justify-center gap-3 select-none">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <span className="text-xs font-bold text-zinc-550 uppercase tracking-widest">Validating Secure Token...</span>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-[#fdf5f5] py-20 px-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] border border-zinc-150 p-8 md:p-12 text-center shadow-lg flex flex-col items-center select-none">
          <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 mb-6 border border-rose-100">
            <ShieldAlert className="w-8 h-8" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900 mb-3">
            Access Link Invalid
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 leading-relaxed max-w-xs mb-8">
            This secure profile access link is invalid, expired, or has been revoked by the system administrators.
          </p>

          <Link 
            to="/artists"
            className="px-6 py-3 border border-primary text-primary hover:bg-[#fcf8f8] font-bold text-xs rounded-xl transition-all"
          >
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf5f5] py-28 px-4 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Secure Access Alert Header */}
        <div className="w-full bg-green-50 border border-green-150 rounded-3xl p-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-zinc-800">Secure Viewing Session Active</h4>
              <p className="text-[10px] text-zinc-450 font-bold uppercase tracking-wider">Private Profile Access Granted</p>
            </div>
          </div>
          <Link 
            to="/artists"
            className="flex items-center gap-1.5 px-4 py-2 border border-zinc-200 hover:bg-white text-zinc-650 rounded-xl text-xs font-bold transition-all self-start sm:self-center"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Close Profile</span>
          </Link>
        </div>

        {/* Profile Card Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column Left: Photo & Contacts */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Main Photo Card */}
            <div className="bg-white border border-zinc-150 rounded-[2.5rem] p-6 shadow-sm flex flex-col items-center">
              <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-zinc-100 bg-zinc-50 relative">
                <img 
                  src={artist.profilePhoto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"} 
                  alt={artist.fullName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-black text-zinc-900 mt-5 text-center">
                {artist.fullName}
              </h2>
              <span className="text-xs font-black tracking-widest text-primary uppercase bg-primary/5 px-4 py-1.5 rounded-full mt-2 inline-block">
                {artist.categories}
              </span>
            </div>

            {/* Private Contact Information Card */}
            <div className="bg-white border border-zinc-150 rounded-[2.5rem] p-6 shadow-sm text-left">
              <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-100 pb-3 uppercase tracking-wider mb-4">
                Contact Details
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-4.5 h-4.5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Email Address</p>
                    <a href={`mailto:${artist.email}`} className="text-sm text-zinc-800 font-semibold hover:underline">
                      {artist.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4.5 h-4.5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Phone Number</p>
                    <a href={`tel:${artist.phone}`} className="text-sm text-zinc-800 font-semibold hover:underline">
                      {artist.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4.5 h-4.5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Location / Address</p>
                    <p className="text-sm text-zinc-800 font-semibold leading-relaxed">
                      {artist.address}, {artist.city}, {artist.state}, {artist.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Portfolio Links Card */}
            <div className="bg-white border border-zinc-150 rounded-[2.5rem] p-6 shadow-sm text-left">
              <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-100 pb-3 uppercase tracking-wider mb-4">
                Links & Portfolios
              </h3>
              <div className="flex flex-col gap-3">
                {artist.portfolioWebsite && (
                  <a 
                    href={artist.portfolioWebsite} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 bg-zinc-50 hover:bg-[#fcf8f8] border border-zinc-150 rounded-2xl text-xs font-semibold text-zinc-700 hover:text-primary transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4" /> Portfolio Website
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {artist.instagram && (
                  <a 
                    href={artist.instagram} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 bg-zinc-50 hover:bg-[#fcf8f8] border border-zinc-150 rounded-2xl text-xs font-semibold text-zinc-700 hover:text-primary transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <i className="fa-brands fa-instagram text-base w-5 text-center text-zinc-400"></i> Instagram Handle
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {artist.facebook && (
                  <a 
                    href={artist.facebook} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 bg-zinc-50 hover:bg-[#fcf8f8] border border-zinc-150 rounded-2xl text-xs font-semibold text-zinc-700 hover:text-primary transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <i className="fa-brands fa-facebook-f text-base w-5 text-center text-zinc-400"></i> Facebook Profile
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Column Right: Details, Attributes, Gallery & Resume */}
          <div className="lg:col-span-8 flex flex-col gap-8 text-left">
            
            {/* Description & Overview */}
            <div className="bg-white border border-zinc-150 rounded-[2.5rem] p-6 md:p-8 shadow-sm flex flex-col gap-4">
              <h2 className="text-xl md:text-2xl font-bold font-serif text-zinc-900 border-b border-zinc-100 pb-3">
                Profile Description
              </h2>
              <p className="text-zinc-550 text-sm leading-relaxed whitespace-pre-line font-medium">
                {artist.profileDescription || `${artist.fullName} is represented by Thaara Casting Agency. Professional ${artist.categories} with versatile expression catalog.`}
              </p>
            </div>

            {/* Physical Metrics Grid */}
            <div className="bg-white border border-zinc-150 rounded-[2.5rem] p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-bold font-serif text-zinc-900 border-b border-zinc-100 pb-3 mb-6">
                Physical Attributes
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="flex flex-col gap-1 bg-[#FCF8F8] border border-zinc-150 p-4 rounded-2xl">
                  <Ruler className="w-5 h-5 text-primary mb-1" />
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Height</span>
                  <span className="text-sm font-bold text-zinc-900">{artist.height || 'N/A'}</span>
                </div>
                <div className="flex flex-col gap-1 bg-[#FCF8F8] border border-zinc-150 p-4 rounded-2xl">
                  <Scale className="w-5 h-5 text-primary mb-1" />
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Weight</span>
                  <span className="text-sm font-bold text-zinc-900">{artist.weight || 'N/A'}</span>
                </div>
                <div className="flex flex-col gap-1 bg-[#FCF8F8] border border-zinc-150 p-4 rounded-2xl">
                  <Calendar className="w-5 h-5 text-primary mb-1" />
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Date of Birth</span>
                  <span className="text-sm font-bold text-zinc-900">{artist.dob || 'N/A'}</span>
                </div>
                <div className="flex flex-col gap-1 bg-[#FCF8F8] border border-zinc-150 p-4 rounded-2xl">
                  <User className="w-5 h-5 text-primary mb-1" />
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Gender</span>
                  <span className="text-sm font-bold text-zinc-900">{artist.gender || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Experience & Skills */}
            <div className="bg-white border border-zinc-150 rounded-[2.5rem] p-6 md:p-8 shadow-sm flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-bold font-serif text-zinc-900 border-b border-zinc-100 pb-2 mb-3">
                  Experience & Background
                </h3>
                <p className="text-zinc-550 text-sm leading-relaxed whitespace-pre-line font-medium">
                  {artist.experience || "No experience summary detailed."}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold font-serif text-zinc-900 border-b border-zinc-100 pb-2 mb-3">
                  Skills & Languages
                </h3>
                <div className="flex flex-col gap-3 font-medium">
                  <p className="text-sm text-zinc-550">
                    <b className="text-zinc-700">Languages Known:</b> {artist.languages}
                  </p>
                  {artist.skills && (
                    <p className="text-sm text-zinc-550">
                      <b className="text-zinc-700">Special Talents:</b> {artist.skills}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Gallery Images Slideshow */}
            {artist.portfolioImages && artist.portfolioImages.length > 0 && (
              <div className="bg-white border border-zinc-150 rounded-[2.5rem] p-6 md:p-8 shadow-sm flex flex-col gap-4">
                <h3 className="text-xl font-bold font-serif text-zinc-900 border-b border-zinc-100 pb-3">
                  Portfolio Gallery
                </h3>
                
                {/* Active preview */}
                {activeImage && (
                  <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-100 relative shadow-sm">
                    <img src={activeImage} alt="Active preview" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Thumbnails grid */}
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-2">
                  {artist.portfolioImages.map((img, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                        activeImage === img ? 'border-primary' : 'border-transparent hover:border-zinc-200'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Introduction Video */}
            {artist.introVideoUrl && (
              <div className="bg-white border border-zinc-150 rounded-[2.5rem] p-6 md:p-8 shadow-sm flex flex-col gap-4">
                <h3 className="text-xl font-bold font-serif text-zinc-900 border-b border-zinc-100 pb-3">
                  Introduction Video
                </h3>
                <div className="w-full aspect-video bg-zinc-50 border border-zinc-150 rounded-3xl overflow-hidden shadow-inner relative flex items-center justify-center">
                  {artist.introVideoUrl.includes('youtube.com') || artist.introVideoUrl.includes('youtu.be') ? (
                    <iframe 
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${artist.introVideoUrl.split('v=')[1] || artist.introVideoUrl.split('/').pop()}`}
                      title="Introduction"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video 
                      src={artist.introVideoUrl}
                      className="w-full h-full object-contain"
                      controls
                    ></video>
                  )}
                </div>
              </div>
            )}

            {/* Resume Document Preview */}
            {artist.resumeUrl && (
              <div className="bg-white border border-zinc-150 rounded-[2.5rem] p-6 md:p-8 shadow-sm flex flex-col gap-4">
                <h3 className="text-xl font-bold font-serif text-zinc-900 border-b border-zinc-100 pb-3">
                  Resume / Physical Card
                </h3>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-zinc-150 bg-[#FCF8F8] rounded-2xl">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-800">Artist CV / Modeling Card.pdf</h4>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">PDF Document</p>
                    </div>
                  </div>
                  <a 
                    href={artist.resumeUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow-md shadow-primary/10 hover:bg-primary-dark transition-all flex items-center gap-1.5 cursor-pointer active:scale-98"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View CV Document</span>
                  </a>
                </div>

                {/* PDF preview iframe if on desktop */}
                <div className="hidden md:block w-full h-[500px] border border-zinc-150 rounded-2xl overflow-hidden bg-zinc-50 shadow-inner">
                  <iframe 
                    src={`${artist.resumeUrl}#toolbar=0`}
                    className="w-full h-full"
                    title="Resume Preview"
                  ></iframe>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default SecureArtistProfilePage;
