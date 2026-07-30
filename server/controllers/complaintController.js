import Complaint from '../models/Complaint.js';
import ActivityLog from '../models/ActivityLog.js';

// Existing function: createComplaint
export const createComplaint = async (req, res) => {
  const { title, description, category, consumerNumber, circle, esd } = req.body;
  
  const complaint = await Complaint.create({
    title,
    description,
    category,
    consumerNumber,
    circle,
    esd,
    user: req.user._id
  });

  // Log activity
  if (ActivityLog) {
    await ActivityLog.create({
      activity: `Consumer ${consumerNumber || req.user.email} filed a '${category}' ticket (${title})`,
      performedBy: req.user.name
    });
  }

  res.status(201).json(complaint);
};

// Existing function: getComplaints
export const getComplaints = async (req, res) => {
  let complaints;
  if (req.user.role === 'admin') {
    complaints = await Complaint.find()
      .populate('user', 'name email')
      .populate('assignedTo', 'name email');
  } else if (req.user.role === 'agent') {
    complaints = await Complaint.find({ assignedTo: req.user._id })
      .populate('user', 'name email');
  } else {
    complaints = await Complaint.find({ user: req.user._id });
  }
  res.json(complaints);
};

// Existing function: updateComplaintStatus
export const updateComplaintStatus = async (req, res) => {
  const { status } = req.body;
  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

  complaint.status = status;
  await complaint.save();
  res.json(complaint);
};

// ⚡ MISSING EXPORT: assignComplaint
export const assignComplaint = async (req, res) => {
  const { agentId } = req.body;
  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

  complaint.assignedTo = agentId;
  await complaint.save();

  if (ActivityLog) {
    await ActivityLog.create({
      activity: `Ticket #${complaint._id.toString().slice(-6)} assigned to Agent ID: ${agentId}`,
      performedBy: req.user.name
    });
  }

  res.json(complaint);
};

// ⚡ MISSING EXPORT: getActivityLogs
export const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(10);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};