const express = require('express');
const router = express.Router();
const { 
  getDashboardStats, 
  createSlot, 
  getAllSlots, 
  deleteSlot, 
  getAllUsers, 
  getAllBookings 
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);
router.use(authorizeRoles('ADMIN'));

router.get('/dashboard', getDashboardStats);
router.post('/create-slot', createSlot);
router.get('/all-slots', getAllSlots);
router.delete('/delete-slot/:id', deleteSlot);
router.get('/all-users', getAllUsers);
router.get('/all-bookings', getAllBookings);

module.exports = router;
