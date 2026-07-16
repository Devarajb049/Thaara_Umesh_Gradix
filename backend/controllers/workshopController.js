import WorkshopModel from '../models/workshopModel.js';

export const getWorkshops = async (req, res, next) => {
  try {
    const workshops = await WorkshopModel.getAll();
    res.json({ success: true, data: workshops });
  } catch (error) {
    next(error);
  }
};

export const createWorkshop = async (req, res, next) => {
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
        finalThumbnail = 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&auto=format&fit=crop';
      }
    }

    const order = display_order !== undefined ? parseInt(display_order) : (await WorkshopModel.getMaxOrder()) + 1;
    const workshop = await WorkshopModel.create({
      thumbnail: finalThumbnail,
      youtube_url,
      display_order: order
    });
    
    res.status(201).json({ success: true, data: workshop });
  } catch (error) {
    next(error);
  }
};

export const updateWorkshop = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { thumbnail, youtube_url, display_order } = req.body;
    
    const existing = await WorkshopModel.getById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Workshop video not found' });
    }

    const workshop = await WorkshopModel.update(id, {
      thumbnail: thumbnail || existing.thumbnail,
      youtube_url: youtube_url || existing.youtube_url,
      display_order: display_order !== undefined ? parseInt(display_order) : existing.display_order
    });
    
    res.json({ success: true, data: workshop });
  } catch (error) {
    next(error);
  }
};

export const deleteWorkshop = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = await WorkshopModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ success: false, message: 'Workshop video not found' });
    }
    
    res.json({ success: true, message: 'Workshop video deleted successfully' });
  } catch (error) {
    next(error);
  }
};
