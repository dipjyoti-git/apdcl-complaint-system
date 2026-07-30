import express from 'express';
import { 
  createComplaint, 
  getComplaints, 
  updateComplaintStatus, 
  assignComplaint,
  getActivityLogs 
} from '../controllers/complaintController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createComplaint)
  .get(protect, getComplaints);

router.get('/activity-logs', protect, getActivityLogs);

router.route('/:id/status')
  .put(protect, authorize('admin', 'agent'), updateComplaintStatus);

router.route('/:id/assign')
  .put(protect, authorize('admin'), assignComplaint);

export default router;