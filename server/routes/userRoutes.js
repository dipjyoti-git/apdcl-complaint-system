import express from 'express';
import { getAgents } from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/agents', protect, authorize('admin'), getAgents);

export default router;