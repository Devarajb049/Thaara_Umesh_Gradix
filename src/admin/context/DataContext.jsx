import React, { createContext, useContext, useState, useEffect } from 'react';
import { originalClients } from '../../sections/Clients';
import { baseVideos } from '../../pages/ShowcasePage';
import { testimonialsData } from '../../components/Testimonials';
import { workshopVideos } from '../../components/Workshops';
import { galleryImages } from '../../components/Graduation';
import { 
  mockShowcases, 
  mockTestimonials, 
  mockWorkshops, 
  mockEvents, 
  mockShootingHouseImages, 
  mockShootingHouseVideos, 
  mockContacts, 
  mockArtistRegistrations 
} from '../dummyData';

const DataContext = createContext(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // Clients state (Combining the 115 original clients with standard schema)
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('admin-clients');
    if (saved) return JSON.parse(saved);
    
    // Map original clients list to admin schema
    const mappedOriginals = originalClients.map((c, i) => ({
      id: `c_init_${i}`,
      clientName: c.name,
      logo: c.logo,
      category: 'Brands',
      displayOrder: i + 1,
      status: 'active',
      featured: false
    }));
    return mappedOriginals;
  });

  // Showcase state
  const [showcases, setShowcases] = useState(() => {
    const saved = localStorage.getItem('admin-showcases');
    const parsed = saved ? JSON.parse(saved) : [];
    // Auto upgrade if it only has mock dummy data (less than 10 items)
    if (parsed.length > 10) return parsed;
    
    // Map baseVideos to showcases schema
    return baseVideos.map((v, i) => ({
      id: v.id,
      title: v.title,
      slug: v.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: v.description || 'Professional portfolio video matching the casting projects.',
      thumbnail: v.thumbnail || `https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`,
      youtubeUrl: `https://www.youtube.com/watch?v=${v.id}`,
      category: v.category,
      tags: [v.brand || 'Showcase'],
      duration: v.duration || '01:00',
      displayOrder: i + 1,
      featured: i < 2,
      status: 'active'
    }));
  });

  // Testimonials state
  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('admin-testimonials');
    const parsed = saved ? JSON.parse(saved) : [];
    
    // Check if it already has the synchronized keys
    const isUpgraded = parsed.length > 3 && parsed.every(t => t.personName && t.designation);
    if (isUpgraded) return parsed;
    
    const sourceData = parsed.length > 3 ? parsed : testimonialsData;
    return sourceData.map((t, i) => ({
      id: t.id ? `t_${t.id}` : `t_init_${i}`,
      clientName: t.name || t.clientName,
      personName: t.name || t.clientName || t.personName,
      role: t.profession || t.role,
      designation: t.profession || t.role || t.designation,
      feedback: t.review || t.feedback,
      review: t.review || t.feedback || t.review,
      avatar: t.profileImage || t.avatar || t.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      photo: t.profileImage || t.avatar || t.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      status: t.status || 'active',
      displayOrder: t.displayOrder || i + 1
    }));
  });

  // Workshops state
  const [workshops, setWorkshops] = useState(() => {
    const saved = localStorage.getItem('admin-workshops');
    const parsed = saved ? JSON.parse(saved) : [];
    // Auto upgrade if it only has mock dummy data (2 items)
    if (parsed.length > 2) return parsed;
    
    return workshopVideos.map((w, i) => ({
      id: w.id ? `w_${w.id}` : `w_init_${i}`,
      title: w.title,
      description: w.description || 'Intensive acting school workshops training sessions.',
      videoUrl: w.videoUrl,
      thumbnail: w.thumbnail,
      duration: w.duration || '02:00',
      category: w.category || 'Workshop',
      status: 'active',
      displayOrder: i + 1
    }));
  });

  // Ignite Events state
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('admin-events');
    const parsed = saved ? JSON.parse(saved) : [];
    // Auto upgrade if it only has mock dummy data (less than 12 images in graduation event)
    const hasFullImages = parsed.some(ev => ev.id === 'ev_graduation_day' && ev.galleryImages?.length >= 12);
    if (parsed.length > 0 && hasFullImages) return parsed;
    
    return mockEvents.map((ev) => {
      if (ev.id === 'ev_graduation_day' || ev.eventTitle.toLowerCase().includes('graduation')) {
        return {
          ...ev,
          galleryImages: galleryImages.map(img => img.url)
        };
      }
      return ev;
    });
  });

  // Shooting House states
  const [shootingHouseImages, setShootingHouseImages] = useState(() => {
    const saved = localStorage.getItem('admin-sh-images');
    return saved ? JSON.parse(saved) : mockShootingHouseImages;
  });

  const [shootingHouseVideos, setShootingHouseVideos] = useState(() => {
    const saved = localStorage.getItem('admin-sh-videos');
    return saved ? JSON.parse(saved) : mockShootingHouseVideos;
  });

  // Contact inbox state
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('admin-contacts');
    return saved ? JSON.parse(saved) : mockContacts;
  });

  // Artist profiles state
  const [artistRegistrations, setArtistRegistrations] = useState(() => {
    const saved = localStorage.getItem('admin-artist-regs');
    return saved ? JSON.parse(saved) : mockArtistRegistrations;
  });

  // Persist states to local storage on change
  useEffect(() => {
    localStorage.setItem('admin-clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('admin-showcases', JSON.stringify(showcases));
  }, [showcases]);

  useEffect(() => {
    localStorage.setItem('admin-testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('admin-workshops', JSON.stringify(workshops));
  }, [workshops]);

  useEffect(() => {
    localStorage.setItem('admin-events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('admin-sh-images', JSON.stringify(shootingHouseImages));
  }, [shootingHouseImages]);

  useEffect(() => {
    localStorage.setItem('admin-sh-videos', JSON.stringify(shootingHouseVideos));
  }, [shootingHouseVideos]);

  useEffect(() => {
    localStorage.setItem('admin-contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('admin-artist-regs', JSON.stringify(artistRegistrations));
  }, [artistRegistrations]);

  // Mutations callbacks for public and admin operations
  const addContactMessage = (msg) => {
    const newMsg = {
      id: `m_${Math.random().toString(36).substring(2, 9)}`,
      name: msg.name,
      email: msg.email,
      phone: msg.phone,
      subject: msg.subject || 'Casting Inquiry',
      message: msg.message,
      createdDate: new Date().toISOString(),
      status: 'unread'
    };
    setContacts(prev => [newMsg, ...prev]);
  };

  const addArtistRegistration = (reg) => {
    const newReg = {
      id: `ar_${Math.random().toString(36).substring(2, 9)}`,
      fullName: reg.fullName,
      age: parseInt(reg.age) || 20,
      gender: reg.gender || 'Female',
      email: reg.email,
      phone: reg.phone,
      city: reg.city || 'Chennai',
      state: reg.state || 'Tamil Nadu',
      height: reg.height || "5'6\"",
      weight: reg.weight || '55 kg',
      languagesKnown: reg.languagesKnown || 'English, Tamil',
      experience: reg.experience || 'No previous experience.',
      category: reg.category || 'Model',
      skills: reg.skills || 'Grooming',
      instagram: reg.instagram || '',
      portfolio: reg.portfolio || '',
      profilePhoto: reg.profilePhoto || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
      resume: reg.resume || '',
      introductionVideo: reg.introductionVideo || '',
      applicationStatus: 'Pending',
      submittedDate: new Date().toISOString()
    };
    setArtistRegistrations(prev => [newReg, ...prev]);
  };

  const setTestimonialsSynced = (newVal) => {
    setTestimonials(prev => {
      const rawVal = typeof newVal === 'function' ? newVal(prev) : newVal;
      return rawVal.map(t => ({
        ...t,
        clientName: t.personName || t.clientName || '',
        role: t.designation || t.role || '',
        feedback: t.review || t.feedback || '',
        avatar: t.photo || t.avatar || '',
        personName: t.clientName || t.personName || '',
        designation: t.role || t.designation || '',
        review: t.feedback || t.review || '',
        photo: t.avatar || t.photo || ''
      }));
    });
  };

  return (
    <DataContext.Provider value={{
      clients, setClients,
      showcases, setShowcases,
      testimonials, setTestimonials: setTestimonialsSynced,
      workshops, setWorkshops,
      events, setEvents,
      shootingHouseImages, setShootingHouseImages,
      shootingHouseVideos, setShootingHouseVideos,
      contacts, setContacts,
      artistRegistrations, setArtistRegistrations,
      addContactMessage,
      addArtistRegistration
    }}>
      {children}
    </DataContext.Provider>
  );
};
