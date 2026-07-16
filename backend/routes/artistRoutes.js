import express from 'express';
import {
  getArtists,
  getArtistById,
  registerArtist,
  updateArtistStatus,
  deleteArtist,
  getRequests,
  createProfileRequest,
  updateRequestStatus,
  deleteRequest,
  verifyToken
} from '../controllers/artistController.js';

const router = express.Router();

// Public & Admin Artists
router.route('/')
  .get(getArtists)
  .post(registerArtist);

// Requests endpoints
router.route('/requests')
  .get(getRequests)
  .post(createProfileRequest);

router.route('/requests/:id/status')
  .put(updateRequestStatus);

router.route('/requests/:id')
  .delete(deleteRequest);

// Token access
router.route('/token/:token')
  .get(verifyToken);

// Single Artist detail
router.route('/:id')
  .get(getArtistById)
  .delete(deleteArtist);

router.route('/:id/status')
  .put(updateArtistStatus);

export default router;
