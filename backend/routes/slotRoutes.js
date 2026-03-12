const express = require('express');
const router = express.Router();
const { getAvailableSlots } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);
router.use(authorizeRoles('USER'));

router.get('/available', getAvailableSlots);
module.exports = router;
