import express from 'express';
import { getWorkshops, createWorkshop, updateWorkshop, deleteWorkshop } from '../controllers/workshopController.js';

const router = express.Router();

router.route('/')
  .get(getWorkshops)
  .post(createWorkshop);

router.route('/:id')
  .put(updateWorkshop)
  .delete(deleteWorkshop);

export default router;
