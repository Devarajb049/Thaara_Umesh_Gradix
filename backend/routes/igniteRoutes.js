import express from 'express';
import { getIgniteImages, createIgniteImage, deleteIgniteImage } from '../controllers/igniteController.js';

const router = express.Router();

router.route('/')
  .get(getIgniteImages)
  .post(createIgniteImage);

router.route('/:id')
  .delete(deleteIgniteImage);

export default router;
