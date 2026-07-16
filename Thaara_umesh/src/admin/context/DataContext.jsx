import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const defaultMockArtists = [
  {
    id: 1,
    fullName: "Aria Dev",
    email: "aria.dev@example.com",
    phone: "+91 98765 43210",
    dob: "1998-05-12",
    gender: "Female",
    address: "Flat 4B, Green Meadows Apartments, Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    height: "5'8\"",
    weight: "56 kg",
    languages: "English, Hindi, Telugu",
    experience: "3 years of professional runway modeling and commercial acting. Featured in two major cosmetics brand advertisements and various boutique designer catalogs.",
    skills: "Classical Dance, Swimming, Horse Riding, Improvisational Theater",
    categories: "Model, Actor",
    instagram: "https://instagram.com/aria_dev_official",
    facebook: "https://facebook.com/aria.dev.talent",
    portfolioWebsite: "https://ariadevportfolio.me",
    profileDescription: "Passionate model and actress looking to collaborate on premium ad films and feature cinema. Highly photogenic and adapt to versatile character roles.",
    profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    portfolioImages: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80"
    ],
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    introVideoUrl: "https://www.youtube.com/watch?v=_CZAM4GRc_I",
    status: "approved",
    created_at: "2026-07-10T10:00:00Z"
  },
  {
    id: 2,
    fullName: "Vikram Sen",
    email: "vikram.sen@example.com",
    phone: "+91 99988 77766",
    dob: "1994-09-24",
    gender: "Male",
    address: "12, 1st Cross, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    height: "6'1\"",
    weight: "78 kg",
    languages: "English, Kannada, Hindi",
    experience: "Lead actor in several theater productions and short films. Voice artist for radio commercials and animated series. Experience in action stunts.",
    skills: "Martial Arts, Guitar, Voice Modulation, Accents",
    categories: "Actor",
    instagram: "https://instagram.com/vikram_sen_actor",
    facebook: "",
    portfolioWebsite: "",
    profileDescription: "Dedicated actor with a strong theater background, specializing in high-energy performance, character roles, and physical acting.",
    profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    portfolioImages: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80"
    ],
    resumeUrl: "",
    introVideoUrl: "https://www.youtube.com/watch?v=xZcq_8JICY8",
    status: "pending",
    created_at: "2026-07-15T14:30:00Z"
  },
  {
    id: 3,
    fullName: "Meera Nair",
    email: "meera.nair@example.com",
    phone: "+91 98888 11111",
    dob: "1999-11-03",
    gender: "Female",
    address: "B-302, Marina Towers, Besant Nagar",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    height: "5'7\"",
    weight: "52 kg",
    languages: "English, Tamil, Malayalam",
    experience: "Freelance model for local clothing brands, catalogs and commercial prints. Worked with various fashion designers in South India.",
    skills: "Photography, Styling, Classical Singing",
    categories: "Model",
    instagram: "https://instagram.com/meeranair_official",
    facebook: "",
    portfolioWebsite: "",
    profileDescription: "Model looking for print shoot opportunities, ramp shows, and brand commercials.",
    profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
    portfolioImages: [],
    resumeUrl: "",
    introVideoUrl: "",
    status: "rejected",
    created_at: "2026-07-12T08:15:00Z"
  },
  {
    id: 4,
    fullName: "Kiara Mehta",
    email: "parents.kiara@example.com",
    phone: "+91 91234 56789",
    dob: "2018-04-10",
    gender: "Female",
    address: "A-501, Raheja Residency, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    height: "3'8\"",
    weight: "18 kg",
    languages: "English, Hindi",
    experience: "Appeared in a popular baby soap television commercial and print ads for kids' fashion apparel.",
    skills: "Expressive Faces, Mimicry, Quick Learner",
    categories: "Child Artist, Model",
    instagram: "",
    facebook: "",
    portfolioWebsite: "",
    profileDescription: "Energetic and friendly child artist, loves the camera, adapts quickly to directions and poses nicely.",
    profilePhoto: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=500&auto=format&fit=crop&q=80",
    portfolioImages: [
      "https://images.unsplash.com/photo-1519457431-44cac6c28969?w=500&auto=format&fit=crop&q=80"
    ],
    resumeUrl: "",
    introVideoUrl: "",
    status: "approved",
    created_at: "2026-07-14T11:00:00Z"
  }
];

const defaultMockRequests = [
  {
    id: 1,
    requesterName: "Sarah Jenkins",
    requesterEmail: "sarah@fashionhub.com",
    companyName: "Fashion Hub Agency",
    reason: "Looking for a female model for an upcoming winter catalog campaign photoshoot in Bangalore.",
    artistId: 1,
    artistName: "Aria Dev",
    artistPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    status: "approved",
    accessToken: "sec_aria_fashion_hub_token_xyz_123",
    created_at: "2026-07-15T09:00:00Z"
  },
  {
    id: 2,
    requesterName: "Marcus Brody",
    requesterEmail: "marcus@adworks.in",
    companyName: "AdWorks Media",
    reason: "Casting for a lead role in an upcoming television commercial for a corporate client. Requires strong expressions.",
    artistId: 2,
    artistName: "Vikram Sen",
    artistPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    status: "pending",
    accessToken: null,
    created_at: "2026-07-16T11:45:00Z"
  }
];

export const DataProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [showcases, setShowcases] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [igniteImages, setIgniteImages] = useState([]);
  const [shootingHouseImages, setShootingHouseImages] = useState([]);
  const [shootingHouseVideos, setShootingHouseVideos] = useState([]);
  const [contacts, setContacts] = useState([]);
  
  const [artists, setArtists] = useState(() => {
    const saved = localStorage.getItem('thaara_artists');
    return saved ? JSON.parse(saved) : defaultMockArtists;
  });

  const [profileRequests, setProfileRequests] = useState(() => {
    const saved = localStorage.getItem('thaara_profile_requests');
    return saved ? JSON.parse(saved) : defaultMockRequests;
  });

  const [loading, setLoading] = useState(true);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      const [
        clientsRes,
        showcasesRes,
        testimonialsRes,
        workshopsRes,
        igniteRes,
        shImagesRes,
        shVideosRes,
        contactsRes,
        artistsRes,
        requestsRes
      ] = await Promise.all([
        fetch('/api/clients').then(r => r.json()),
        fetch('/api/showcases').then(r => r.json()),
        fetch('/api/testimonials').then(r => r.json()),
        fetch('/api/workshops').then(r => r.json()),
        fetch('/api/ignite-images').then(r => r.json()),
        fetch('/api/shooting-house/images').then(r => r.json()),
        fetch('/api/shooting-house/videos').then(r => r.json()),
        fetch('/api/contacts?limit=100').then(r => r.json()),
        fetch('/api/artists?limit=100').then(r => r.json()).catch(() => ({ success: false })),
        fetch('/api/artists/requests?limit=100').then(r => r.json()).catch(() => ({ success: false }))
      ]);

      if (clientsRes.success) setClients(clientsRes.data);
      if (showcasesRes.success) {
        // Map database showcases to expected frontend schema
        setShowcases(showcasesRes.data.map(item => ({
          ...item,
          status: 'active', // Mock status for UI compatibility
          tags: ['Showcase'],
          duration: '01:00'
        })));
      }
      if (testimonialsRes.success) {
        // Map database testimonials to expected frontend schema
        setTestimonials(testimonialsRes.data.map(item => ({
          id: item.id,
          personName: item.person_name,
          designation: item.designation,
          photo: item.profile_image,
          review: item.review,
          displayOrder: item.display_order,
          status: 'active'
        })));
      }
      if (workshopsRes.success) {
        setWorkshops(workshopsRes.data.map(item => ({
          id: item.id,
          thumbnail: item.thumbnail,
          videoUrl: item.youtube_url,
          displayOrder: item.display_order,
          status: 'active'
        })));
      }
      if (igniteRes.success) setIgniteImages(igniteRes.data);
      if (shImagesRes.success) {
        setShootingHouseImages(shImagesRes.data.map(item => ({
          id: item.id,
          url: item.image_url,
          displayOrder: item.display_order
        })));
      }
      if (shVideosRes.success) {
        setShootingHouseVideos(shVideosRes.data.map(item => ({
          id: item.id,
          thumbnail: item.thumbnail,
          youtubeUrl: item.youtube_url,
          displayOrder: item.display_order
        })));
      }
      if (contactsRes.success) {
        setContacts(contactsRes.data.map(item => ({
          id: item.id,
          name: item.name,
          email: item.email,
          phone: item.phone,
          subject: item.subject,
          message: item.message,
          status: item.is_read ? 'read' : 'unread',
          createdDate: item.created_at
        })));
      }
      if (artistsRes && artistsRes.success) {
        setArtists(artistsRes.data);
        localStorage.setItem('thaara_artists', JSON.stringify(artistsRes.data));
      }
      if (requestsRes && requestsRes.success) {
        setProfileRequests(requestsRes.data);
        localStorage.setItem('thaara_profile_requests', JSON.stringify(requestsRes.data));
      }
    } catch (error) {
      console.error('Failed to fetch data from API, using fallback:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContactsOnly = async () => {
    try {
      const response = await fetch('/api/contacts');
      const contactsRes = await response.json();
      if (contactsRes.success) {
        setContacts(contactsRes.data.map(item => ({
          id: item.id,
          name: item.name,
          email: item.email,
          phone: item.phone,
          subject: item.subject,
          message: item.message,
          status: item.is_read ? 'read' : 'unread',
          createdDate: item.created_at
        })));
      }
    } catch (e) {
      console.error('Failed to poll contacts:', e);
    }
  };

  useEffect(() => {
    fetchAllData();

    // Poll contacts every 10 seconds for real-time notifications
    const interval = setInterval(() => {
      const isLoggedIn = localStorage.getItem('admin-logged-in') === 'true';
      if (isLoggedIn) {
        fetchContactsOnly();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // --- Clients Mutators ---
  const addClientLogo = async (logoUrl, order) => {
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logo: logoUrl, display_order: order })
      });
      const resData = await response.json();
      if (resData.success) {
        setClients(prev => [...prev, resData.data].sort((a, b) => a.display_order - b.display_order));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const updateClientLogo = async (id, logoUrl, order) => {
    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logo: logoUrl, display_order: order })
      });
      const resData = await response.json();
      if (resData.success) {
        setClients(prev => prev.map(c => c.id === parseInt(id) ? resData.data : c).sort((a, b) => a.display_order - b.display_order));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const deleteClientLogo = async (id) => {
    try {
      const response = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
      const resData = await response.json();
      if (resData.success) {
        setClients(prev => prev.filter(c => c.id !== parseInt(id)));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  // --- Showcase Mutators ---
  const addShowcaseVideo = async (showcaseData) => {
    try {
      const response = await fetch('/api/showcases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: showcaseData.title,
          thumbnail: showcaseData.thumbnail,
          youtube_url: showcaseData.youtubeUrl,
          display_order: showcaseData.displayOrder
        })
      });
      const resData = await response.json();
      if (resData.success) {
        const item = resData.data;
        setShowcases(prev => [...prev, {
          ...item,
          status: 'active',
          tags: ['Showcase'],
          duration: '01:00'
        }].sort((a, b) => a.display_order - b.display_order));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const updateShowcaseVideo = async (id, showcaseData) => {
    try {
      const response = await fetch(`/api/showcases/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: showcaseData.title,
          thumbnail: showcaseData.thumbnail,
          youtube_url: showcaseData.youtubeUrl,
          display_order: showcaseData.displayOrder
        })
      });
      const resData = await response.json();
      if (resData.success) {
        const item = resData.data;
        setShowcases(prev => prev.map(s => s.id === parseInt(id) ? {
          ...item,
          status: 'active',
          tags: ['Showcase'],
          duration: '01:00'
        } : s).sort((a, b) => a.display_order - b.display_order));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const deleteShowcaseVideo = async (id) => {
    try {
      const response = await fetch(`/api/showcases/${id}`, { method: 'DELETE' });
      const resData = await response.json();
      if (resData.success) {
        setShowcases(prev => prev.filter(s => s.id !== parseInt(id)));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  // --- Testimonials Mutators ---
  const addTestimonialRecord = async (tData) => {
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          person_name: tData.personName,
          designation: tData.designation,
          profile_image: tData.photo,
          review: tData.review,
          display_order: tData.displayOrder
        })
      });
      const resData = await response.json();
      if (resData.success) {
        const item = resData.data;
        setTestimonials(prev => [...prev, {
          id: item.id,
          personName: item.person_name,
          designation: item.designation,
          photo: item.profile_image,
          review: item.review,
          displayOrder: item.display_order,
          status: 'active'
        }].sort((a, b) => a.displayOrder - b.displayOrder));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const updateTestimonialRecord = async (id, tData) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          person_name: tData.personName,
          designation: tData.designation,
          profile_image: tData.photo,
          review: tData.review,
          display_order: tData.displayOrder
        })
      });
      const resData = await response.json();
      if (resData.success) {
        const item = resData.data;
        setTestimonials(prev => prev.map(t => t.id === parseInt(id) ? {
          id: item.id,
          personName: item.person_name,
          designation: item.designation,
          photo: item.profile_image,
          review: item.review,
          displayOrder: item.display_order,
          status: 'active'
        } : t).sort((a, b) => a.displayOrder - b.displayOrder));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const deleteTestimonialRecord = async (id) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      const resData = await response.json();
      if (resData.success) {
        setTestimonials(prev => prev.filter(t => t.id !== parseInt(id)));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  // --- Workshops Mutators ---
  const addWorkshopRecord = async (wData) => {
    try {
      const response = await fetch('/api/workshops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          thumbnail: wData.thumbnail,
          youtube_url: wData.videoUrl,
          display_order: wData.displayOrder
        })
      });
      const resData = await response.json();
      if (resData.success) {
        const item = resData.data;
        setWorkshops(prev => [...prev, {
          id: item.id,
          thumbnail: item.thumbnail,
          videoUrl: item.youtube_url,
          displayOrder: item.display_order,
          status: 'active'
        }].sort((a, b) => a.displayOrder - b.displayOrder));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const updateWorkshopRecord = async (id, wData) => {
    try {
      const response = await fetch(`/api/workshops/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          thumbnail: wData.thumbnail,
          youtube_url: wData.videoUrl,
          display_order: wData.displayOrder
        })
      });
      const resData = await response.json();
      if (resData.success) {
        const item = resData.data;
        setWorkshops(prev => prev.map(w => w.id === parseInt(id) ? {
          id: item.id,
          thumbnail: item.thumbnail,
          videoUrl: item.youtube_url,
          displayOrder: item.display_order,
          status: 'active'
        } : w).sort((a, b) => a.displayOrder - b.displayOrder));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const deleteWorkshopRecord = async (id) => {
    try {
      const response = await fetch(`/api/workshops/${id}`, { method: 'DELETE' });
      const resData = await response.json();
      if (resData.success) {
        setWorkshops(prev => prev.filter(w => w.id !== parseInt(id)));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  // --- Ignite Graduation Images ---
  const addIgniteImageRecord = async (imageUrl, order) => {
    try {
      const response = await fetch('/api/ignite-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: imageUrl, display_order: order })
      });
      const resData = await response.json();
      if (resData.success) {
        setIgniteImages(prev => [...prev, resData.data].sort((a, b) => a.display_order - b.display_order));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const deleteIgniteImageRecord = async (id) => {
    try {
      const response = await fetch(`/api/ignite-images/${id}`, { method: 'DELETE' });
      const resData = await response.json();
      if (resData.success) {
        setIgniteImages(prev => prev.filter(img => img.id !== parseInt(id)));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  // --- Shooting House Images ---
  const addShootingHouseImageRecord = async (imageUrl, order) => {
    try {
      const response = await fetch('/api/shooting-house/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: imageUrl, display_order: order })
      });
      const resData = await response.json();
      if (resData.success) {
        setShootingHouseImages(prev => [...prev, {
          id: resData.data.id,
          url: resData.data.image_url,
          displayOrder: resData.data.display_order
        }].sort((a, b) => a.displayOrder - b.displayOrder));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const deleteShootingHouseImageRecord = async (id) => {
    try {
      const response = await fetch(`/api/shooting-house/images/${id}`, { method: 'DELETE' });
      const resData = await response.json();
      if (resData.success) {
        setShootingHouseImages(prev => prev.filter(img => img.id !== parseInt(id)));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  // --- Shooting House Videos ---
  const addShootingHouseVideoRecord = async (vData) => {
    try {
      const response = await fetch('/api/shooting-house/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          thumbnail: vData.thumbnail,
          youtube_url: vData.youtubeUrl,
          display_order: vData.displayOrder
        })
      });
      const resData = await response.json();
      if (resData.success) {
        const item = resData.data;
        setShootingHouseVideos(prev => [...prev, {
          id: item.id,
          thumbnail: item.thumbnail,
          youtubeUrl: item.youtube_url,
          displayOrder: item.display_order
        }].sort((a, b) => a.displayOrder - b.displayOrder));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const updateShootingHouseVideoRecord = async (id, vData) => {
    try {
      const response = await fetch(`/api/shooting-house/videos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          thumbnail: vData.thumbnail,
          youtube_url: vData.youtubeUrl,
          display_order: vData.displayOrder
        })
      });
      const resData = await response.json();
      if (resData.success) {
        const item = resData.data;
        setShootingHouseVideos(prev => prev.map(v => v.id === parseInt(id) ? {
          id: item.id,
          thumbnail: item.thumbnail,
          youtubeUrl: item.youtube_url,
          displayOrder: item.display_order
        } : v).sort((a, b) => a.displayOrder - b.displayOrder));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const deleteShootingHouseVideoRecord = async (id) => {
    try {
      const response = await fetch(`/api/shooting-house/videos/${id}`, { method: 'DELETE' });
      const resData = await response.json();
      if (resData.success) {
        setShootingHouseVideos(prev => prev.filter(v => v.id !== parseInt(id)));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  // --- Contacts / Inbox Mutators ---
  const addContactMessage = async (msg) => {
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: msg.name,
          email: msg.email,
          phone: msg.phone,
          subject: msg.subject,
          message: msg.message
        })
      });
      const resData = await response.json();
      if (resData.success) {
        const item = resData.data;
        setContacts(prev => [{
          id: item.id,
          name: item.name,
          email: item.email,
          phone: item.phone,
          subject: item.subject,
          message: item.message,
          status: 'unread',
          createdDate: item.created_at
        }, ...prev]);
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const markContactMessageRead = async (id, isRead) => {
    try {
      const response = await fetch(`/api/contacts/${id}/read`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead })
      });
      const resData = await response.json();
      if (resData.success) {
        setContacts(prev => prev.map(m => m.id === parseInt(id) ? { ...m, status: isRead ? 'read' : 'unread' } : m));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const deleteContactMessage = async (id) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
      const resData = await response.json();
      if (resData.success) {
        setContacts(prev => prev.filter(m => m.id !== parseInt(id)));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  // --- Artist Operations ---
  const registerArtist = async (artistData) => {
    try {
      const response = await fetch('/api/artists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(artistData)
      });
      const resData = await response.json();
      if (resData.success) {
        setArtists(prev => {
          const updated = [resData.data, ...prev];
          localStorage.setItem('thaara_artists', JSON.stringify(updated));
          return updated;
        });
        return { success: true, data: resData.data, simulatedEmail: resData.simulatedEmail };
      }
    } catch (e) {
      console.error('API failed, using local storage fallback for registration:', e);
    }

    // Local Storage Fallback
    const newArtist = {
      id: Date.now(),
      fullName: artistData.fullName,
      email: artistData.email,
      phone: artistData.phone,
      dob: artistData.dob || '',
      gender: artistData.gender || '',
      address: artistData.address || '',
      city: artistData.city || '',
      state: artistData.state || '',
      country: artistData.country || '',
      height: artistData.height || '',
      weight: artistData.weight || '',
      languages: artistData.languages || '',
      experience: artistData.experience || '',
      skills: artistData.skills || '',
      categories: artistData.categories || '',
      instagram: artistData.instagram || '',
      facebook: artistData.facebook || '',
      portfolioWebsite: artistData.portfolioWebsite || '',
      profileDescription: artistData.profileDescription || '',
      profilePhoto: artistData.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      portfolioImages: Array.isArray(artistData.portfolioImages) ? artistData.portfolioImages : [],
      resumeUrl: artistData.resumeUrl || '',
      introVideoUrl: artistData.introVideoUrl || '',
      status: 'pending',
      created_at: new Date().toISOString()
    };

    setArtists(prev => {
      const updated = [newArtist, ...prev];
      localStorage.setItem('thaara_artists', JSON.stringify(updated));
      return updated;
    });

    const categoriesText = newArtist.categories;
    const emailBody = `
      <h3>Application Received Successfully</h3>
      <p>Dear <b>${newArtist.fullName}</b>,</p>
      <p>Thank you for registering as an artist with the Thaara Umesh Casting Agency. Your application has been saved successfully and is currently under review by our admin team.</p>
      <p>Categories: ${categoriesText}</p>
      <p>Best regards,<br>Casting Panel</p>
    `;

    return { 
      success: true, 
      data: newArtist, 
      simulatedEmail: {
        to: newArtist.email,
        subject: 'Artist Registration Received - Thaara Umesh Casting Agency',
        body: emailBody
      }
    };
  };

  const updateArtistStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/artists/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const resData = await response.json();
      if (resData.success) {
        setArtists(prev => {
          const updated = prev.map(art => art.id == id ? { ...art, status } : art);
          localStorage.setItem('thaara_artists', JSON.stringify(updated));
          return updated;
        });
        return { success: true, data: resData.data, simulatedEmail: resData.simulatedEmail };
      }
    } catch (e) {
      console.error('API failed, using local storage fallback for artist status:', e);
    }

    // Local Storage Fallback
    let targetArtist = null;
    setArtists(prev => {
      const updated = prev.map(art => {
        if (art.id == id) {
          targetArtist = { ...art, status };
          return targetArtist;
        }
        return art;
      });
      localStorage.setItem('thaara_artists', JSON.stringify(updated));
      return updated;
    });

    const isApp = status === 'approved';
    const emailBody = isApp 
      ? `<h3>Congratulations! Your Profile is Approved</h3><p>Dear <b>${targetArtist?.fullName}</b>,</p><p>We are thrilled to inform you that your application has been verified and APPROVED. Your profile is now live on our public Artists page.</p><p>Best regards,<br>Thaara Umesh</p>`
      : `<h3>Update on your Artist Application</h3><p>Dear <b>${targetArtist?.fullName}</b>,</p><p>Thank you for applying. We regret to inform you that we are unable to accept your registration at this time.</p><p>Best regards,<br>Casting Panel</p>`;

    return {
      success: true,
      data: { id, status },
      simulatedEmail: {
        to: targetArtist?.email || 'artist@example.com',
        subject: isApp 
          ? 'Congratulations! Your Artist Profile is Approved - Thaara Umesh'
          : 'Update on your Artist Application - Thaara Umesh',
        body: emailBody
      }
    };
  };

  const deleteArtist = async (id) => {
    try {
      const response = await fetch(`/api/artists/${id}`, { method: 'DELETE' });
      const resData = await response.json();
      if (resData.success) {
        setArtists(prev => {
          const updated = prev.filter(art => art.id != id);
          localStorage.setItem('thaara_artists', JSON.stringify(updated));
          return updated;
        });
        return true;
      }
    } catch (e) {
      console.error('API failed, using local storage fallback for delete artist:', e);
    }

    // Local Storage Fallback
    setArtists(prev => {
      const updated = prev.filter(art => art.id != id);
      localStorage.setItem('thaara_artists', JSON.stringify(updated));
      return updated;
    });
    return true;
  };

  // --- Profile Request Operations ---
  const submitProfileRequest = async (reqData) => {
    try {
      const response = await fetch('/api/artists/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqData)
      });
      const resData = await response.json();
      if (resData.success) {
        setProfileRequests(prev => {
          const updated = [resData.data, ...prev];
          localStorage.setItem('thaara_profile_requests', JSON.stringify(updated));
          return updated;
        });
        return { success: true, data: resData.data, simulatedEmail: resData.simulatedEmail };
      }
    } catch (e) {
      console.error('API failed, using local storage fallback for profile request:', e);
    }

    // Local Storage Fallback
    const targetArtist = artists.find(a => a.id == reqData.artistId);
    const newRequest = {
      id: Date.now(),
      requesterName: reqData.requesterName,
      requesterEmail: reqData.requesterEmail,
      companyName: reqData.companyName || '',
      reason: reqData.reason,
      artistId: parseInt(reqData.artistId),
      artistName: targetArtist ? targetArtist.fullName : 'Unknown Artist',
      artistPhoto: targetArtist ? targetArtist.profilePhoto : '',
      status: 'pending',
      accessToken: null,
      created_at: new Date().toISOString()
    };

    setProfileRequests(prev => {
      const updated = [newRequest, ...prev];
      localStorage.setItem('thaara_profile_requests', JSON.stringify(updated));
      return updated;
    });

    const emailBody = `
      <h3>Profile Access Request Received</h3>
      <p>Dear <b>${newRequest.requesterName}</b>,</p>
      <p>We have received your request to access the complete casting profile of <b>${newRequest.artistName}</b>.</p>
      <p>We will review it shortly.</p>
      <p>Best regards,<br>Privacy Desk</p>
    `;

    return {
      success: true,
      data: newRequest,
      simulatedEmail: {
        to: newRequest.requesterEmail,
        subject: 'Profile Access Request Received - Thaara Umesh',
        body: emailBody
      }
    };
  };

  const updateRequestStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/artists/requests/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const resData = await response.json();
      if (resData.success) {
        setProfileRequests(prev => {
          const updated = prev.map(req => req.id == id ? { ...req, status, accessToken: resData.data.accessToken } : req);
          localStorage.setItem('thaara_profile_requests', JSON.stringify(updated));
          return updated;
        });
        return { success: true, data: resData.data, simulatedEmail: resData.simulatedEmail };
      }
    } catch (e) {
      console.error('API failed, using local storage fallback for request status:', e);
    }

    // Local Storage Fallback
    let targetReq = null;
    const token = status === 'approved' ? 'local_token_' + Math.random().toString(36).substring(2, 12) : null;
    
    setProfileRequests(prev => {
      const updated = prev.map(req => {
        if (req.id == id) {
          targetReq = { ...req, status, accessToken: token };
          return targetReq;
        }
        return req;
      });
      localStorage.setItem('thaara_profile_requests', JSON.stringify(updated));
      return updated;
    });

    const mockLink = `${window.location.protocol}//${window.location.host}/artist-access/${token}`;
    const emailBody = status === 'approved'
      ? `<h3>Profile Access Request Approved</h3><p>Dear <b>${targetReq?.requesterName}</b>,</p><p>Your request to view the full casting profile of <b>${targetReq?.artistName}</b> has been APPROVED.</p><p><a href="${mockLink}"><b>Click Here to Access the Secure Profile</b></a></p><p>URL: ${mockLink}</p><p>Best regards,<br>Admin Desk</p>`
      : `<h3>Update on your Profile Access Request</h3><p>Dear <b>${targetReq?.requesterName}</b>,</p><p>We regret to inform you that we are unable to approve your viewing request for <b>${targetReq?.artistName}</b> at this time.</p><p>Best regards,<br>Admin Desk</p>`;

    return {
      success: true,
      data: { id, status, accessToken: token },
      simulatedEmail: {
        to: targetReq?.requesterEmail || 'client@example.com',
        subject: status === 'approved'
          ? `Access Granted: View ${targetReq?.artistName}'s Profile - Thaara Umesh`
          : `Update on your Profile Access Request - Thaara Umesh`,
        body: emailBody
      }
    };
  };

  const deleteProfileRequest = async (id) => {
    try {
      const response = await fetch(`/api/artists/requests/${id}`, { method: 'DELETE' });
      const resData = await response.json();
      if (resData.success) {
        setProfileRequests(prev => {
          const updated = prev.filter(req => req.id != id);
          localStorage.setItem('thaara_profile_requests', JSON.stringify(updated));
          return updated;
        });
        return true;
      }
    } catch (e) {
      console.error('API failed, using local storage fallback for delete request:', e);
    }

    // Local Storage Fallback
    setProfileRequests(prev => {
      const updated = prev.filter(req => req.id != id);
      localStorage.setItem('thaara_profile_requests', JSON.stringify(updated));
      return updated;
    });
    return true;
  };

  const fetchArtistByToken = async (token) => {
    try {
      const response = await fetch(`/api/artists/token/${token}`);
      const resData = await response.json();
      if (resData.success) {
        return resData.data;
      }
    } catch (e) {
      console.error('API token fetch failed, using local fallback:', e);
    }

    // Local Storage Fallback
    const req = profileRequests.find(r => r.accessToken === token && r.status === 'approved');
    if (req) {
      const artist = artists.find(a => a.id == req.artistId);
      return artist || null;
    }
    return null;
  };

  // Map Ignite Graduation Day list to compatibility schema for Graduation.jsx
  const events = [
    {
      id: 'ev_graduation_day',
      eventTitle: 'Ignite Graduation Day',
      status: 'active',
      galleryImages: igniteImages.map(img => img.image_url)
    }
  ];

  return (
    <DataContext.Provider value={{
      clients, setClients: () => {}, // Handled by API calls
      addClientLogo, updateClientLogo, deleteClientLogo,
      
      showcases, setShowcases: () => {},
      addShowcaseVideo, updateShowcaseVideo, deleteShowcaseVideo,
      
      testimonials, setTestimonials: () => {},
      addTestimonialRecord, updateTestimonialRecord, deleteTestimonialRecord,
      
      workshops, setWorkshops: () => {},
      addWorkshopRecord, updateWorkshopRecord, deleteWorkshopRecord,
      
      igniteImages, addIgniteImageRecord, deleteIgniteImageRecord,
      events, // Computed compatibility list
      
      shootingHouseImages, addShootingHouseImageRecord, deleteShootingHouseImageRecord,
      shootingHouseVideos, addShootingHouseVideoRecord, updateShootingHouseVideoRecord, deleteShootingHouseVideoRecord,
      
      contacts, addContactMessage, markContactMessageRead, deleteContactMessage,
      
      artists, setArtists, registerArtist, updateArtistStatus, deleteArtist,
      profileRequests, setProfileRequests, submitProfileRequest, updateRequestStatus, deleteProfileRequest, fetchArtistByToken,
      
      loading
    }}>
      {children}
    </DataContext.Provider>
  );
};
