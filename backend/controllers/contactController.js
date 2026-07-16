import ContactModel from '../models/contactModel.js';

export const getContacts = async (req, res, next) => {
  try {
    const { search = '', status = '', limit = 100, page = 1, sortBy = 'created_at', order = 'DESC' } = req.query;
    
    const isRead = status === 'read' ? true : status === 'unread' ? false : null;
    const limitVal = parseInt(limit);
    const pageVal = parseInt(page);
    const offsetVal = (pageVal - 1) * limitVal;

    const contacts = await ContactModel.getAll({
      search,
      isRead,
      limit: limitVal,
      offset: offsetVal,
      sortBy,
      order
    });

    const total = await ContactModel.getCount({ search, isRead });

    res.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page: pageVal,
        limit: limitVal,
        totalPages: Math.ceil(total / limitVal)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'All fields (name, email, phone, message) are required' });
    }

    const contact = await ContactModel.create({
      name,
      email,
      phone,
      subject: subject || 'General Casting Inquiry',
      message
    });

    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

export const markContactRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isRead = true } = req.body;

    const existing = await ContactModel.getById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    const updated = await ContactModel.markAsRead(id, isRead);
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = await ContactModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
};
