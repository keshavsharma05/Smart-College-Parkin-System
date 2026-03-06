const express = require('express');
const router = express.Router();
const { getTodayBookings, checkIn, checkOut } = require('../controllers/staffController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);
router.use(authorizeRoles('STAFF'));

router.get('/today-bookings', getTodayBookings);
router.post('/checkin', checkIn);
router.post('/checkout', checkOut);

module.exports = router;
