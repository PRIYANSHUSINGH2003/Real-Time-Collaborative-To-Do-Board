const mongoose = require('mongoose');

const ActionLogSchema = new mongoose.Schema({
  user: { type: String, required: true },
  action: { type: String, required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  taskTitle: { type: String },
  details: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ActionLog', ActionLogSchema);
