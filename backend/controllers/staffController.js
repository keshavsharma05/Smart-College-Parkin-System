const Booking = require('../models/Booking');
const ParkingSlot = require('../models/ParkingSlot');

exports.getTodayBookings = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const bookings = await Booking.find({
      bookingTime: { $gte: startOfDay, $lte: endOfDay }
    }).populate('userId', 'name').populate('slotId', 'slotNumber slotType');

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkIn = async (req, res) => {
  const { bookingId, vehicleNumber } = req.body;
  try {
    const booking = await Booking.findById(bookingId).populate('slotId');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.status !== 'BOOKED') {
      return res.status(400).json({ message: 'Booking is not in BOOKED state' });
    }

    if (booking.vehicleNumber !== vehicleNumber) {
      return res.status(400).json({ message: 'Vehicle number mismatch' });
    }

    booking.status = 'ACTIVE';
    booking.checkInTime = Date.now();
    await booking.save();

    const slot = await ParkingSlot.findById(booking.slotId._id);
    slot.status = 'OCCUPIED';
    await slot.save();

    res.json({ message: 'Check-in successful', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkOut = async (req, res) => {
  const { bookingId } = req.body;
  try {
    const booking = await Booking.findById(bookingId).populate('slotId');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.status !== 'ACTIVE') {
      return res.status(400).json({ message: 'Booking is not ACTIVE currently' });
    }

    booking.status = 'COMPLETED';
    booking.checkOutTime = Date.now();
    await booking.save();

    const slot = await ParkingSlot.findById(booking.slotId._id);
    slot.status = 'AVAILABLE';
    await slot.save();

    res.json({ message: 'Check-out successful', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
