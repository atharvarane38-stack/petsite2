const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/auth');

// Protected routes
router.get('/', authMiddleware, bookingController.getUserBookings);
router.post('/', authMiddleware, bookingController.createBooking);
router.put('/:id/status', authMiddleware, bookingController.updateBookingStatus);

module.exports = router;
