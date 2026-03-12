const bcrypt = require("bcryptjs");
const User = require("../models/User");
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
router.post('/create-staff', async(req,res)=>{

  
  const {name,email,password} = req.body;
  
  const existing = await User.findOne({email});
  if(existing) return res.status(400).json({message:"User exists"});
  const hashed = await bcrypt.hash(password,10);

 const staff = await User.create({
  name,
  email,
  password:hashed,
  role:"STAFF"
 });

 res.json(staff);

});


router.get('/dashboard', getDashboardStats);
router.post('/create-slot', createSlot);
router.get('/all-slots', getAllSlots);
router.delete('/delete-slot/:id', deleteSlot);
router.get('/all-users', getAllUsers);
router.get('/all-bookings', getAllBookings);

module.exports = router;
