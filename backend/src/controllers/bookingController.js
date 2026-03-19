const ServiceBooking = require('../models/ServiceBooking');
const { sendSuccess, sendError } = require('../utils/response');

// Get user bookings
const getUserBookings = async (req, res) => {
  try {
    const bookings = await ServiceBooking.findAll({
      where: { userId: req.user.id },
      order: [['bookingDate', 'ASC']],
    });

    sendSuccess(res, bookings, 'Bookings retrieved');
  } catch (error) {
    sendError(res, 'Failed to fetch bookings', 500, error.message);
  }
};

// Create booking
const createBooking = async (req, res) => {
  try {
    const { serviceId, bookingDate, duration, petName, petBreed, petAge, notes } = req.body;

    if (!serviceId || !bookingDate) {
      return sendError(res, 'Service ID and booking date are required', 400);
    }

    // Get service to calculate price
    const Service = require('../models/Service');
    const service = await Service.findByPk(serviceId);

    if (!service) {
      return sendError(res, 'Service not found', 404);
    }

    const totalPrice = service.price * (duration || 1);

    const booking = await ServiceBooking.create({
      userId: req.user.id,
      serviceId,
      bookingDate,
      duration: duration || 1,
      totalPrice,
      petName,
      petBreed,
      petAge,
      notes,
    });

    sendSuccess(res, booking, 'Booking created successfully', 201);
  } catch (error) {
    sendError(res, 'Failed to create booking', 500, error.message);
  }
};

// Update booking status (Vendor/Admin)
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await ServiceBooking.findByPk(req.params.id);

    if (!booking) {
      return sendError(res, 'Booking not found', 404);
    }

    if (booking.userId !== req.user.id && req.user.userType !== 'admin') {
      return sendError(res, 'Unauthorized', 403);
    }

    await booking.update({ status: req.body.status });
    sendSuccess(res, booking, 'Booking updated');
  } catch (error) {
    sendError(res, 'Failed to update booking', 500, error.message);
  }
};

module.exports = {
  getUserBookings,
  createBooking,
  updateBookingStatus,
};
