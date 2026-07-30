import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: [
      'Billing & Metering', 
      'Power Supply & Voltage', 
      'Infrastructure Failure', 
      'New Connection / Transfer',
      'Hardware', 'Software', 'Network' // Retained old ones for backward compatibility
    ] 
  },
  // ⚡ New APDCL Domain Fields
  consumerNumber: { 
    type: String, 
    required: false,
    match: [/^\d{12}$/, 'Consumer ID must be exactly 12 digits'] // Validates 12-digit format
  },
  circle: { type: String, default: 'Tezpur Circle' },
  esd: { type: String, default: 'Chariali ESD' },

  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Resolved'], 
    default: 'Pending' 
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

export default mongoose.model('Complaint', complaintSchema);