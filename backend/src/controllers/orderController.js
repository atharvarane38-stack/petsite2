const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const { sendSuccess, sendError } = require('../utils/response');

// Get user orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });

    sendSuccess(res, orders, 'Orders retrieved');
  } catch (error) {
    sendError(res, 'Failed to fetch orders', 500, error.message);
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order || order.userId !== req.user.id) {
      return sendError(res, 'Order not found', 404);
    }

    sendSuccess(res, order, 'Order retrieved');
  } catch (error) {
    sendError(res, 'Failed to fetch order', 500, error.message);
  }
};

// Create order
const createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, city, zipcode } = req.body;

    if (!items || items.length === 0) {
      return sendError(res, 'Order must have items', 400);
    }

    // Calculate total amount
    let totalAmount = 0;
    items.forEach(item => {
      totalAmount += item.price * item.quantity;
    });

    const order = await Order.create({
      userId: req.user.id,
      totalAmount,
      deliveryAddress,
      city,
      zipcode,
      status: 'pending',
      paymentStatus: 'pending',
    });

    // Create order items
    for (const item of items) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    sendSuccess(res, order, 'Order created successfully', 201);
  } catch (error) {
    sendError(res, 'Failed to create order', 500, error.message);
  }
};

// Update order status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
      return sendError(res, 'Unauthorized', 403);
    }

    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return sendError(res, 'Order not found', 404);
    }

    await order.update({ status: req.body.status });
    sendSuccess(res, order, 'Order updated');
  } catch (error) {
    sendError(res, 'Failed to update order', 500, error.message);
  }
};

module.exports = {
  getUserOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
};
