import express from 'express';
import { 
  createComplaint, 
  getComplaints, 
  updateComplaintStatus, 
  assignComplaint,
  getActivityLogs 
} from '../controllers/complaintController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Wrap multer so file validation errors (type/size) become clean 400 responses
const handleUpload = (req, res, next) => {
  upload.array('photos', 5)(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
};

router.route('/')
  .post(protect, handleUpload, createComplaint)
  .get(protect, getComplaints);

router.get('/activity-logs', protect, authorize('agent', 'admin'), getActivityLogs);

router.route('/:id/status')
  .put(protect, authorize('admin', 'agent'), updateComplaintStatus);

router.route('/:id/assign')
  .put(protect, authorize('admin'), assignComplaint);

export default router;