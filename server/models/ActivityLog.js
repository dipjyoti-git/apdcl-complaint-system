import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  activity: { type: String, required: true },
  performedBy: { type: String, default: 'System' }
}, { timestamps: true });

export default mongoose.model('ActivityLog', activityLogSchema);