import ShowcaseModel from '../models/showcaseModel.js';

export const getShowcases = async (req, res, next) => {
  try {
    const showcases = await ShowcaseModel.getAll();
    res.json({ success: true, data: showcases });
  } catch (error) {
    next(error);
  }
};

export const createShowcase = async (req, res, next) => {
  try {
    const { title, thumbnail, youtube_url, display_order } = req.body;
    
    if (!title || !youtube_url) {
      return res.status(400).json({ success: false, message: 'Title and YouTube URL are required' });
    }

    // Attempt to extract YouTube ID for default thumbnail if not provided
    let finalThumbnail = thumbnail;
    if (!finalThumbnail) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = youtube_url.match(regExp);
      if (match && match[2].length === 11) {
        finalThumbnail = `https://i.ytimg.com/vi/${match[2]}/mqdefault.jpg`;
      } else {
        finalThumbnail = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&auto=format&fit=crop';
      }
    }

    const order = display_order !== undefined ? parseInt(display_order) : (await ShowcaseModel.getMaxOrder()) + 1;
    const showcase = await ShowcaseModel.create({
      title,
      thumbnail: finalThumbnail,
      youtube_url,
      display_order: order
    });
    
    res.status(201).json({ success: true, data: showcase });
  } catch (error) {
    next(error);
  }
};

export const updateShowcase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, thumbnail, youtube_url, display_order } = req.body;
    
    const existing = await ShowcaseModel.getById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Showcase item not found' });
    }

    const showcase = await ShowcaseModel.update(id, {
      title: title || existing.title,
      thumbnail: thumbnail || existing.thumbnail,
      youtube_url: youtube_url || existing.youtube_url,
      display_order: display_order !== undefined ? parseInt(display_order) : existing.display_order
    });
    
    res.json({ success: true, data: showcase });
  } catch (error) {
    next(error);
  }
};

export const deleteShowcase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = await ShowcaseModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ success: false, message: 'Showcase item not found' });
    }
    
    res.json({ success: true, message: 'Showcase item deleted successfully' });
  } catch (error) {
    next(error);
  }
};
