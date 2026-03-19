const Product = require('../models/Product');
const { sendSuccess, sendError } = require('../utils/response');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const { category, petType, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = { isActive: true };
    if (category) whereClause.category = category;
    if (petType) whereClause.petType = petType;

    const products = await Product.findAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    const total = await Product.count({ where: whereClause });

    sendSuccess(res, {
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    }, 'Products retrieved');
  } catch (error) {
    sendError(res, 'Failed to fetch products', 500, error.message);
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product || !product.isActive) {
      return sendError(res, 'Product not found', 404);
    }

    sendSuccess(res, product, 'Product retrieved');
  } catch (error) {
    sendError(res, 'Failed to fetch product', 500, error.message);
  }
};

// Create product (Admin/Vendor)
const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, quantity, petType } = req.body;

    if (!name || !price) {
      return sendError(res, 'Name and price are required', 400);
    }

    const product = await Product.create({
      name,
      description,
      category,
      price,
      quantity,
      petType,
      vendorId: req.user.id,
    });

    sendSuccess(res, product, 'Product created successfully', 201);
  } catch (error) {
    sendError(res, 'Failed to create product', 500, error.message);
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return sendError(res, 'Product not found', 404);
    }

    if (product.vendorId !== req.user.id && req.user.userType !== 'admin') {
      return sendError(res, 'Unauthorized', 403);
    }

    await product.update(req.body);
    sendSuccess(res, product, 'Product updated');
  } catch (error) {
    sendError(res, 'Failed to update product', 500, error.message);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};
