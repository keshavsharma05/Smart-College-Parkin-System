const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSlot', required: true },
  vehicleNumber: { type: String, required: true },
  bookingTime: { type: Date, default: Date.now },
  checkInTime: { type: Date },
  checkOutTime: { type: Date },
  status: { type: String, enum: ['BOOKED', 'ACTIVE', 'COMPLETED', 'CANCELLED'], default: 'BOOKED' }
});

module.exports = mongoose.model('Booking', bookingSchema);
