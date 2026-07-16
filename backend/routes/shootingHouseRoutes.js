import express from 'express';
import { 
  getShootingHouseImages, 
  createShootingHouseImage, 
  deleteShootingHouseImage,
  getShootingHouseVideos,
  createShootingHouseVideo,
  updateShootingHouseVideo,
  deleteShootingHouseVideo
} from '../controllers/shootingHouseController.js';

const router = express.Router();

// Images Routes
router.route('/images')
  .get(getShootingHouseImages)
  .post(createShootingHouseImage);

router.route('/images/:id')
  .delete(deleteShootingHouseImage);

// Videos Routes
router.route('/videos')
  .get(getShootingHouseVideos)
  .post(createShootingHouseVideo);

router.route('/videos/:id')
  .put(updateShootingHouseVideo)
  .delete(deleteShootingHouseVideo);

export default router;
