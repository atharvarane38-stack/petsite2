const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  serviceType: {
    type: DataTypes.ENUM('veterinary', 'babysitting', 'grooming', 'training', 'other'),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  vendorId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  vendorName: DataTypes.STRING,
  vendorPhone: DataTypes.STRING,
  vendorEmail: DataTypes.STRING,
  address: DataTypes.TEXT,
  city: DataTypes.STRING,
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'services',
  timestamps: true,
});

module.exports = Service;
