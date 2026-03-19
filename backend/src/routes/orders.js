const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

// Protected routes
router.get('/', authMiddleware, orderController.getUserOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);
router.post('/', authMiddleware, orderController.createOrder);
router.put('/:id/status', authMiddleware, orderController.updateOrderStatus);

module.exports = router;
