const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assigned: { type: String, required: true }, // username
  status: { type: String, enum: ['Todo', 'In Progress', 'Done'], default: 'Todo' },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: String }, // username
  version: { type: Number, default: 1 }
});

TaskSchema.index({ title: 1 }, { unique: true });

module.exports = mongoose.model('Task', TaskSchema);
