const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
} = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(protect, createBooking);
router.get('/mybookings', protect, getMyBookings);

module.exports = router;