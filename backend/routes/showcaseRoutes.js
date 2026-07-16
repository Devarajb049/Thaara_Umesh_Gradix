import express from 'express';
import { getShowcases, createShowcase, updateShowcase, deleteShowcase } from '../controllers/showcaseController.js';

const router = express.Router();

router.route('/')
  .get(getShowcases)
  .post(createShowcase);

router.route('/:id')
  .put(updateShowcase)
  .delete(deleteShowcase);

export default router;
