const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ServiceBooking = sequelize.define('ServiceBooking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  serviceId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  bookingDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER, // in hours
    defaultValue: 1,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'in-progress', 'completed', 'cancelled'),
    defaultValue: 'pending',
  },
  notes: DataTypes.TEXT,
  petName: DataTypes.STRING,
  petBreed: DataTypes.STRING,
  petAge: DataTypes.STRING,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'service_bookings',
  timestamps: true,
});

module.exports = ServiceBooking;
