import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [showcases, setShowcases] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [igniteImages, setIgniteImages] = useState([]);
  const [shootingHouseImages, setShootingHouseImages] = useState([]);
  const [shootingHouseVideos, setShootingHouseVideos] = useState([]);
  const [contacts, setContacts] = useState([]);
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
        contactsRes
      ] = await Promise.all([
        fetch('/api/clients').then(r => r.json()),
        fetch('/api/showcases').then(r => r.json()),
        fetch('/api/testimonials').then(r => r.json()),
        fetch('/api/workshops').then(r => r.json()),
        fetch('/api/ignite-images').then(r => r.json()),
        fetch('/api/shooting-house/images').then(r => r.json()),
        fetch('/api/shooting-house/videos').then(r => r.json()),
        fetch('/api/contacts?limit=100').then(r => r.json())
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
      loading
    }}>
      {children}
    </DataContext.Provider>
  );
};
