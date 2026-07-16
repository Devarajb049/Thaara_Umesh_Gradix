import TestimonialModel from '../models/testimonialModel.js';

export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await TestimonialModel.getAll();
    res.json({ success: true, data: testimonials });
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req, res, next) => {
  try {
    const { person_name, designation, profile_image, review, display_order } = req.body;
    
    if (!person_name || !review) {
      return res.status(400).json({ success: false, message: 'Person Name and Review are required' });
    }

    const order = display_order !== undefined ? parseInt(display_order) : (await TestimonialModel.getMaxOrder()) + 1;
    const testimonial = await TestimonialModel.create({
      person_name,
      designation: designation || 'Student',
      profile_image: profile_image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      review,
      display_order: order
    });
    
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { person_name, designation, profile_image, review, display_order } = req.body;
    
    const existing = await TestimonialModel.getById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    const testimonial = await TestimonialModel.update(id, {
      person_name: person_name || existing.person_name,
      designation: designation !== undefined ? designation : existing.designation,
      profile_image: profile_image || existing.profile_image,
      review: review || existing.review,
      display_order: display_order !== undefined ? parseInt(display_order) : existing.display_order
    });
    
    res.json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = await TestimonialModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    
    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    next(error);
  }
};
