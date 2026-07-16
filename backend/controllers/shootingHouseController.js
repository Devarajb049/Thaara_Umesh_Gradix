import ShootingHouseImageModel from '../models/shootingHouseImageModel.js';
import ShootingHouseVideoModel from '../models/shootingHouseVideoModel.js';

// --- Images ---
export const getShootingHouseImages = async (req, res, next) => {
  try {
    const images = await ShootingHouseImageModel.getAll();
    res.json({ success: true, data: images });
  } catch (error) {
    next(error);
  }
};

export const createShootingHouseImage = async (req, res, next) => {
  try {
    const { image_url, display_order } = req.body;
    
    if (!image_url) {
      return res.status(400).json({ success: false, message: 'Image URL is required' });
    }

    const order = display_order !== undefined ? parseInt(display_order) : (await ShootingHouseImageModel.getMaxOrder()) + 1;
    const image = await ShootingHouseImageModel.create({ image_url, display_order: order });
    
    res.status(201).json({ success: true, data: image });
  } catch (error) {
    next(error);
  }
};

export const deleteShootingHouseImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = await ShootingHouseImageModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }
    
    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// --- Videos ---
export const getShootingHouseVideos = async (req, res, next) => {
  try {
    const videos = await ShootingHouseVideoModel.getAll();
    res.json({ success: true, data: videos });
  } catch (error) {
    next(error);
  }
};

export const createShootingHouseVideo = async (req, res, next) => {
  try {
    const { thumbnail, youtube_url, display_order } = req.body;
    
    if (!youtube_url) {
      return res.status(400).json({ success: false, message: 'YouTube URL is required' });
    }

    let finalThumbnail = thumbnail;
    if (!finalThumbnail) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = youtube_url.match(regExp);
      if (match && match[2].length === 11) {
        finalThumbnail = `https://i.ytimg.com/vi/${match[2]}/mqdefault.jpg`;
      } else {
        finalThumbnail = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=60';
      }
    }

    const order = display_order !== undefined ? parseInt(display_order) : (await ShootingHouseVideoModel.getMaxOrder()) + 1;
    const video = await ShootingHouseVideoModel.create({
      thumbnail: finalThumbnail,
      youtube_url,
      display_order: order
    });
    
    res.status(201).json({ success: true, data: video });
  } catch (error) {
    next(error);
  }
};

export const updateShootingHouseVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { thumbnail, youtube_url, display_order } = req.body;
    
    const existing = await ShootingHouseVideoModel.getById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    const video = await ShootingHouseVideoModel.update(id, {
      thumbnail: thumbnail || existing.thumbnail,
      youtube_url: youtube_url || existing.youtube_url,
      display_order: display_order !== undefined ? parseInt(display_order) : existing.display_order
    });
    
    res.json({ success: true, data: video });
  } catch (error) {
    next(error);
  }
};

export const deleteShootingHouseVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = await ShootingHouseVideoModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    
    res.json({ success: true, message: 'Video deleted successfully' });
  } catch (error) {
    next(error);
  }
};
