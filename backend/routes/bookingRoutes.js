const express = require('express');
const router = express.Router();
const { createBooking, cancelBooking, getMyBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);
router.use(authorizeRoles('USER'));
router.post('/create', createBooking);
router.post('/cancel/:id', cancelBooking);
router.get('/my-bookings', getMyBookings);

module.exports = router;
