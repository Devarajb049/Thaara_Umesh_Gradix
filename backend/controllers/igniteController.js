import IgniteModel from '../models/igniteModel.js';

export const getIgniteImages = async (req, res, next) => {
  try {
    const images = await IgniteModel.getAll();
    res.json({ success: true, data: images });
  } catch (error) {
    next(error);
  }
};

export const createIgniteImage = async (req, res, next) => {
  try {
    const { image_url, display_order } = req.body;
    
    if (!image_url) {
      return res.status(400).json({ success: false, message: 'Image URL is required' });
    }

    const order = display_order !== undefined ? parseInt(display_order) : (await IgniteModel.getMaxOrder()) + 1;
    const image = await IgniteModel.create({ image_url, display_order: order });
    
    res.status(201).json({ success: true, data: image });
  } catch (error) {
    next(error);
  }
};

export const deleteIgniteImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = await IgniteModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }
    
    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    next(error);
  }
};
