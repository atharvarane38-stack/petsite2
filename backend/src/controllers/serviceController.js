const Service = require('../models/Service');
const { sendSuccess, sendError } = require('../utils/response');

// Get all services
const getAllServices = async (req, res) => {
  try {
    const { serviceType, city, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = { isAvailable: true };
    if (serviceType) whereClause.serviceType = serviceType;
    if (city) whereClause.city = city;

    const services = await Service.findAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['rating', 'DESC']],
    });

    const total = await Service.count({ where: whereClause });

    sendSuccess(res, {
      services,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    }, 'Services retrieved');
  } catch (error) {
    sendError(res, 'Failed to fetch services', 500, error.message);
  }
};

// Get service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service || !service.isAvailable) {
      return sendError(res, 'Service not found', 404);
    }

    sendSuccess(res, service, 'Service retrieved');
  } catch (error) {
    sendError(res, 'Failed to fetch service', 500, error.message);
  }
};

// Create service (Vendor only)
const createService = async (req, res) => {
  try {
    if (req.user.userType !== 'vendor' && req.user.userType !== 'admin') {
      return sendError(res, 'Only vendors can create services', 403);
    }

    const { name, description, serviceType, price, vendorName, phone, email, address, city } = req.body;

    if (!name || !serviceType || !price) {
      return sendError(res, 'Name, service type, and price are required', 400);
    }

    const service = await Service.create({
      name,
      description,
      serviceType,
      price,
      vendorId: req.user.id,
      vendorName: vendorName || req.user.name,
      vendorPhone: phone,
      vendorEmail: email,
      address,
      city,
    });

    sendSuccess(res, service, 'Service created successfully', 201);
  } catch (error) {
    sendError(res, 'Failed to create service', 500, error.message);
  }
};

// Update service
const updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return sendError(res, 'Service not found', 404);
    }

    if (service.vendorId !== req.user.id && req.user.userType !== 'admin') {
      return sendError(res, 'Unauthorized', 403);
    }

    await service.update(req.body);
    sendSuccess(res, service, 'Service updated');
  } catch (error) {
    sendError(res, 'Failed to update service', 500, error.message);
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
};
