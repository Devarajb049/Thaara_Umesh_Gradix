import ClientModel from '../models/clientModel.js';

export const getClients = async (req, res, next) => {
  try {
    const clients = await ClientModel.getAll();
    res.json({ success: true, data: clients });
  } catch (error) {
    next(error);
  }
};

export const createClient = async (req, res, next) => {
  try {
    const { logo, display_order } = req.body;
    
    if (!logo) {
      return res.status(400).json({ success: false, message: 'Logo is required' });
    }

    const order = display_order !== undefined ? parseInt(display_order) : (await ClientModel.getMaxOrder()) + 1;
    const client = await ClientModel.create({ logo, display_order: order });
    
    res.status(201).json({ success: true, data: client });
  } catch (error) {
    next(error);
  }
};

export const updateClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { logo, display_order } = req.body;
    
    const existing = await ClientModel.getById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    const client = await ClientModel.update(id, {
      logo: logo || existing.logo,
      display_order: display_order !== undefined ? parseInt(display_order) : existing.display_order
    });
    
    res.json({ success: true, data: client });
  } catch (error) {
    next(error);
  }
};

export const deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = await ClientModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }
    
    res.json({ success: true, message: 'Client deleted successfully' });
  } catch (error) {
    next(error);
  }
};
