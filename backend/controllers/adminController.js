const User = require('../models/User');
const ParkingSlot = require('../models/ParkingSlot');
const Booking = require('../models/Booking');

exports.getDashboardStats = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalSlots = await ParkingSlot.countDocuments();

    const availableSlots = await ParkingSlot.countDocuments({
      status: "AVAILABLE"
    });

    // teacher totals
    const teacherTotal = await ParkingSlot.countDocuments({
      slotType: "TEACHER"
    });

    const teacherOccupied = await ParkingSlot.countDocuments({
      slotType: "TEACHER",
      status: { $ne: "AVAILABLE" }
    });

    // student totals
    const studentTotal = await ParkingSlot.countDocuments({
      slotType: "STUDENT"
    });

    const studentOccupied = await ParkingSlot.countDocuments({
      slotType: "STUDENT",
      status: { $ne: "AVAILABLE" }
    });

    res.json({
      totalUsers,
      totalSlots,
      availableSlots,
      teacherTotal,
      teacherOccupied,
      studentTotal,
      studentOccupied
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createSlot = async (req, res) => {
  const { slotNumber, slotType, location } = req.body;
  try {
    const slotExists = await ParkingSlot.findOne({ slotNumber });
    if (slotExists) return res.status(400).json({ message: 'Slot already exists' });
    
    const slot = await ParkingSlot.create({ slotNumber, slotType, location });
    res.status(201).json(slot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSlots = async (req, res) => {
  try {
    const slots = await ParkingSlot.find({});
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSlot = async (req, res) => {
  try {
    const slot = await ParkingSlot.findById(req.params.id);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });
    
    const activeBooking = await Booking.findOne({ slotId: req.params.id, status: { $in: ['BOOKED', 'ACTIVE'] } });
    if (activeBooking) {
      return res.status(400).json({ message: 'Cannot delete slot with active/booked status' });
    }
    
    await ParkingSlot.deleteOne({ _id: req.params.id });
    res.json({ message: 'Slot removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('userId', 'name email')
      .populate('slotId', 'slotNumber slotType location');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
