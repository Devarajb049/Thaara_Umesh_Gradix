import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import EmailPreviewDrawer from '../components/EmailPreviewDrawer';
import DeleteConfirmation from '../components/DeleteConfirmation';
import { 
  ArrowLeft, Check, X, Trash2, Calendar, User, 
  MapPin, Ruler, Scale, Globe, 
  FileText, Play, Mail, Phone, ExternalLink, Sparkles 
} from 'lucide-react';

const ArtistDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { artists, updateArtistStatus, deleteArtist } = useData();

  const [artist, setArtist] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  
  // Modals
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [simulatedEmailData, setSimulatedEmailData] = useState(null);

  useEffect(() => {
    const data = artists.find(a => a.id == id);
    if (data) {
      setArtist(data);
      if (data.portfolioImages && data.portfolioImages.length > 0) {
        setActiveImage(data.portfolioImages[0]);
      }
    }
  }, [id, artists]);

  if (!artist) {
    return (
      <div className="flex flex-col items-center justify-center p-16 select-none">
        <p className="text-zinc-500 font-bold mb-4">Artist Profile Not Found</p>
        <button 
          onClick={() => navigate('/admin')}
          className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleApprove = async () => {
    const res = await updateArtistStatus(artist.id, 'approved');
    if (res && res.success) {
      addToast("Artist application approved", "success");
      if (res.simulatedEmail) {
        setSimulatedEmailData(res.simulatedEmail);
        setIsEmailOpen(true);
      }
    }
  };

  const handleReject = async () => {
    const res = await updateArtistStatus(artist.id, 'rejected');
    if (res && res.success) {
      addToast("Artist application rejected", "warning");
      if (res.simulatedEmail) {
        setSimulatedEmailData(res.simulatedEmail);
        setIsEmailOpen(true);
      }
    }
  };

  const handleConfirmDelete = async () => {
    const success = await deleteArtist(artist.id);
    if (success) {
      addToast("Artist profile deleted", "success");
      navigate('/admin');
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-150 pb-5 select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="p-2 rounded-xl bg-white border border-zinc-200 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
            title="Go Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-serif font-bold text-zinc-900 leading-tight">
              {artist.fullName}
            </h1>
            <p className="text-xs text-zinc-400 font-semibold mt-1">
              Registered Category: <span className="text-primary uppercase tracking-wide">{artist.categories}</span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          {artist.status === 'pending' && (
            <>
              <button
                onClick={handleApprove}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-md shadow-green-650/15 cursor-pointer transition-all active:scale-98"
              >
                <Check className="w-4 h-4" />
                <span>Approve</span>
              </button>
              <button
                onClick={handleReject}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md shadow-amber-600/15 cursor-pointer transition-all active:scale-98"
              >
                <X className="w-4 h-4" />
                <span>Reject</span>
              </button>
            </>
          )}

          {artist.status === 'approved' && (
            <>
              <span className="px-3 py-1.5 rounded-xl bg-green-50 text-green-700 border border-green-150 text-xs font-bold mr-2">
                Live Approved
              </span>
              <button
                onClick={handleReject}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl cursor-pointer transition-all active:scale-98"
              >
                <X className="w-4 h-4" />
                <span>Revoke Approval</span>
              </button>
            </>
          )}

          {artist.status === 'rejected' && (
            <>
              <span className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-150 text-xs font-bold mr-2">
                Rejected
              </span>
              <button
                onClick={handleApprove}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl cursor-pointer transition-all active:scale-98"
              >
                <Check className="w-4 h-4" />
                <span>Approve Profile</span>
              </button>
            </>
          )}

          <button
            onClick={() => setIsDeleteOpen(true)}
            className="p-2.5 rounded-xl bg-rose-50 text-rose-650 hover:bg-rose-100 hover:text-rose-750 transition-all cursor-pointer"
            title="Delete Profile"
          >
            <Trash2 className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Profile Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Headshot and Contacts */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Main Photo Headshot */}
          <div className="bg-white border border-zinc-150 rounded-[2rem] p-5 shadow-sm">
            <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100">
              <img 
                src={artist.profilePhoto} 
                alt={artist.fullName} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-zinc-400 font-bold select-none">
              <span>Talent ID: #{artist.id}</span>
              <span>Joined: {new Date(artist.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Private Contact Information Card */}
          <div className="bg-white border border-zinc-150 rounded-[2rem] p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2">
              Private Contact Details
            </h3>
            
            <div className="flex items-start gap-3">
              <Mail className="w-4.5 h-4.5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Email Address</p>
                <a href={`mailto:${artist.email}`} className="text-sm font-semibold text-zinc-800 hover:underline">
                  {artist.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4.5 h-4.5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Phone Number</p>
                <a href={`tel:${artist.phone}`} className="text-sm font-semibold text-zinc-800 hover:underline">
                  {artist.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4.5 h-4.5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Address / Residency</p>
                <p className="text-xs font-semibold text-zinc-700 leading-relaxed">
                  {artist.address}, {artist.city}, {artist.state}, {artist.country}
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="bg-white border border-zinc-150 rounded-[2rem] p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2 mb-2">
              Portfolios & Social links
            </h3>
            {artist.portfolioWebsite && (
              <a 
                href={artist.portfolioWebsite} 
                target="_blank" 
                className="flex items-center justify-between p-2.5 bg-zinc-50 border border-zinc-150 rounded-xl text-xs font-semibold text-zinc-700 hover:text-primary transition-colors"
              >
                <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-zinc-400" /> Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {artist.instagram && (
              <a 
                href={artist.instagram} 
                target="_blank" 
                className="flex items-center justify-between p-2.5 bg-zinc-50 border border-zinc-150 rounded-xl text-xs font-semibold text-zinc-700 hover:text-primary transition-colors"
              >
                <span className="flex items-center gap-2"><i className="fa-brands fa-instagram text-sm w-4 text-center text-zinc-400"></i> Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {artist.facebook && (
              <a 
                href={artist.facebook} 
                target="_blank" 
                className="flex items-center justify-between p-2.5 bg-zinc-50 border border-zinc-150 rounded-xl text-xs font-semibold text-zinc-700 hover:text-primary transition-colors"
              >
                <span className="flex items-center gap-2"><i className="fa-brands fa-facebook-f text-sm w-4 text-center text-zinc-400"></i> Facebook</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

        </div>

        {/* Right Column: Descriptions, Attributes, Galleries */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Attributes */}
          <div className="bg-white border border-zinc-150 rounded-[2rem] p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2.5 mb-5">
              Physical Attributes
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col gap-0.5 bg-zinc-50 border border-zinc-150 p-3 rounded-xl">
                <Ruler className="w-4.5 h-4.5 text-primary mb-1" />
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Height</span>
                <span className="text-xs font-bold text-zinc-800">{artist.height || 'N/A'}</span>
              </div>
              <div className="flex flex-col gap-0.5 bg-zinc-50 border border-zinc-150 p-3 rounded-xl">
                <Scale className="w-4.5 h-4.5 text-primary mb-1" />
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Weight</span>
                <span className="text-xs font-bold text-zinc-800">{artist.weight || 'N/A'}</span>
              </div>
              <div className="flex flex-col gap-0.5 bg-zinc-50 border border-zinc-150 p-3 rounded-xl">
                <Calendar className="w-4.5 h-4.5 text-primary mb-1" />
                <span className="text-[10px] text-zinc-400 font-bold uppercase">DOB</span>
                <span className="text-xs font-bold text-zinc-800">{artist.dob || 'N/A'}</span>
              </div>
              <div className="flex flex-col gap-0.5 bg-zinc-50 border border-zinc-150 p-3 rounded-xl">
                <User className="w-4.5 h-4.5 text-primary mb-1" />
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Gender</span>
                <span className="text-xs font-bold text-zinc-800">{artist.gender || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Description & experience */}
          <div className="bg-white border border-zinc-150 rounded-[2rem] p-6 shadow-sm space-y-5">
            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Short Description</h4>
              <p className="text-xs text-zinc-700 leading-relaxed font-semibold">
                {artist.profileDescription || 'No description listed.'}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Experience Summary</h4>
              <p className="text-xs text-zinc-700 leading-relaxed font-semibold">
                {artist.experience || 'No experience summary listed.'}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Talents & Languages</h4>
              <div className="space-y-1 text-xs text-zinc-700 font-semibold">
                <p><b>Languages:</b> {artist.languages}</p>
                {artist.skills && <p><b>Special Skills:</b> {artist.skills}</p>}
              </div>
            </div>
          </div>

          {/* Gallery Images */}
          {artist.portfolioImages && artist.portfolioImages.length > 0 && (
            <div className="bg-white border border-zinc-150 rounded-[2rem] p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2.5">
                Portfolio Gallery
              </h3>
              
              {activeImage && (
                <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-150">
                  <img src={activeImage} alt="Main view" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {artist.portfolioImages.map((img, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      activeImage === img ? 'border-primary' : 'border-transparent hover:border-zinc-200'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Introduction video */}
          {artist.introVideoUrl && (
            <div className="bg-white border border-zinc-150 rounded-[2rem] p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2.5">
                Audition Video
              </h3>
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-zinc-150 bg-black">
                {artist.introVideoUrl.includes('youtube.com') || artist.introVideoUrl.includes('youtu.be') ? (
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${artist.introVideoUrl.split('v=')[1] || artist.introVideoUrl.split('/').pop()}`}
                    title="Intro Play"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video src={artist.introVideoUrl} className="w-full h-full object-contain" controls />
                )}
              </div>
            </div>
          )}

          {/* Resume PDF */}
          {artist.resumeUrl && (
            <div className="bg-white border border-zinc-150 rounded-[2rem] p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2.5">
                Casting Resume Card
              </h3>
              
              <div className="flex items-center justify-between p-3.5 bg-zinc-50 border border-zinc-150 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-zinc-800">Artist_Modeling_Card.pdf</h4>
                    <p className="text-[9px] text-zinc-450 uppercase font-bold font-mono">Size: ~1.2 MB</p>
                  </div>
                </div>
                <a 
                  href={artist.resumeUrl} 
                  target="_blank" 
                  className="px-4 py-2 border border-primary text-primary hover:bg-[#fcf8f8] font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open PDF</span>
                </a>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Delete Confirmation */}
      <DeleteConfirmation 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to permanently delete this artist profile? This action will remove their files and photos."
      />

      {/* Email Preview Drawer */}
      <EmailPreviewDrawer 
        isOpen={isEmailOpen}
        onClose={() => setIsEmailOpen(false)}
        emailData={simulatedEmailData}
      />

    </div>
  );
};

export default ArtistDetails;
