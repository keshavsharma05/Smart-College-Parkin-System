const Booking = require('../models/Booking');
const ParkingSlot = require('../models/ParkingSlot');

exports.getAvailableSlots = async (req, res) => {
  try {
    const userType = req.user.userType;
    
    const availableSlots = await ParkingSlot.find({ 
      status: 'AVAILABLE',
      slotType: userType
    });
    
    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBooking = async (req, res) => {
  const { slotId } = req.body;
  try {
    const activeBooking = await Booking.findOne({
      userId: req.user._id,
      status: { $in: ['BOOKED', 'ACTIVE'] }
    });
    
    if (activeBooking) {
      return res.status(400).json({ message: 'You already have an active booking' });
    }

    const slot = await ParkingSlot.findById(slotId);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });
    
    if (slot.status !== 'AVAILABLE') {
      return res.status(400).json({ message: 'Slot is not available' });
    }
    
    if (slot.slotType !== req.user.userType) {
      return res.status(403).json({ message: `You can only book ${slot.slotType} slots` });
    }
    
    const booking = await Booking.create({
      userId: req.user._id,
      slotId: slot._id,
      vehicleNumber: req.user.vehicleNumber || req.body.vehicleNumber,
      status: 'BOOKED'
    });

    slot.status = 'RESERVED'; 
    await slot.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    if (booking.status !== 'BOOKED') {
      return res.status(400).json({ message: 'Only un-checked-in (BOOKED) slots can be cancelled' });
    }

    booking.status = 'CANCELLED';
    await booking.save();

    const slot = await ParkingSlot.findById(booking.slotId);
    if (slot) {
      slot.status = 'AVAILABLE';
      await slot.save();
    }

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('slotId')
      .sort({ bookingTime: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
