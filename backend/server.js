const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
// Load env vars
dotenv.config();
// Connect to database
connectDB();

const app = express();

// Security middleware
app.use(helmet());

// Rate limiter
const limiter = rateLimit({
 windowMs: 15 * 60 * 1000,
 max: 100,
 message: "Too many requests from this IP, please try again later."
});

app.use("/api", limiter);

app.use("/api/bookings", rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
  message: "Too many booking attempts, slow down."
}));

app.use(mongoSanitize());
// CORS
app.use(cors({
  origin: [
    "https://your-landing-page.vercel.app",
    "https://parkflow-app-rho.vercel.app",
        "http://localhost:5173"
  ],
  credentials: true
}));
// Body parser
app.use(express.json());
// Route files
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const staffRoutes = require('./routes/staffRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const slotRoutes = require('./routes/slotRoutes');

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/slots', slotRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Smart Campus Parking Management System API is running...');
});

// Error handling basic
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
