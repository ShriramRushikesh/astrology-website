const { createBooking, getAllBookings } = require('../controllers/bookingController');

router.post('/', createBooking);
router.get('/', getAllBookings);
