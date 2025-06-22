const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const sendEmail = require('../utils/sendEmail');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
  const {
    name,
    dob,
    birthTime,
    timeZone,
    city,
    state,
    email,
    phone,
    consultType,
    message,
  } = req.body;
  
  const booking = await Booking.create({
    user: req.user._id,
    name,
    dob,
    birthTime,
    timeZone,
    city,
    state,
    email,
    phone,
    consultType,
    message,
  });
  
  // Send confirmation email
  const adminMessage = `
    <h2>New Booking Request</h2>
    <p>You have a new booking request from ${name} (${email})</p>
    <h3>Booking Details:</h3>
    <p>Date of Birth: ${new Date(dob).toLocaleDateString()}</p>
    <p>Birth Time: ${birthTime} (${timeZone})</p>
    <p>Location: ${city}, ${state}</p>
    <p>Consultation Type: ${consultType.join(', ')}</p>
    <p>Message: ${message || 'None'}</p>
    <p>Please review and confirm the booking in the admin panel.</p>
  `;
  
  const userMessage = `
    <h2>Booking Confirmation</h2>
    <p>Dear ${name},</p>
    <p>Thank you for booking an astrology session with Astro with Pravin!</p>
    <p>We've received your request for the following consultation types: ${consultType.join(', ')}.</p>
    <p>Our team will review your request and contact you within 24 hours to confirm your session details.</p>
    <p>If you have any immediate questions, please reply to this email.</p>
    <p>Regards,</p>
    <p>The Astro with Pravin Team</p>
  `;
  
  try {
    // Send email to admin
    await sendEmail({
      to: process.env.SMTP_USER,
      subject: 'New Booking Request - Astro with Pravin',
      html: adminMessage,
    });
    
    // Send confirmation to user
    await sendEmail({
      to: email,
      subject: 'Booking Confirmation - Astro with Pravin',
      html: userMessage,
    });
    
    res.status(201).json(booking);
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(201).json({
      ...booking,
      message: 'Booking created, but email confirmation failed'
    });
  }
});

// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(bookings);
});

module.exports = {
  createBooking,
  getMyBookings,
};