import express from 'express';
import { getContacts, createContact, markContactRead, deleteContact } from '../controllers/contactController.js';

const router = express.Router();

router.route('/')
  .get(getContacts)
  .post(createContact);

router.route('/:id/read')
  .put(markContactRead);

router.route('/:id')
  .delete(deleteContact);

export default router;
