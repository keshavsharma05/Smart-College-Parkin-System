const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['ADMIN', 'STAFF', 'USER'], default: 'USER' },
  userType: { type: String, enum: ['STUDENT', 'TEACHER', 'NONE'], default: 'STUDENT' },
  vehicleNumber: { type: String },
  department: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
