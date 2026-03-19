// Seed database with initial data
const User = require('../models/User');
const Product = require('../models/Product');
const Service = require('../models/Service');
const { hashPassword } = require('../utils/auth');
const sequelize = require('../config/database');

const seedDatabase = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('✓ Database tables created');

    // Create admin user
    const adminPassword = await hashPassword('admin123');
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@petsite.com',
      phone: '9876543210',
      password: adminPassword,
      userType: 'admin',
    });
    console.log('✓ Admin user created');

    // Create vendor users
    const vendorPassword = await hashPassword('vendor123');
    const vendor1 = await User.create({
      name: 'Dr. Raj Veterinary Clinic',
      email: 'dr.raj@petsite.com',
      phone: '9876543211',
      password: vendorPassword,
      userType: 'vendor',
      address: 'Fort, Mumbai',
      city: 'Mumbai',
    });
    console.log('✓ Vendor user created');

    // Create sample products
    const products = [
      {
        name: 'Dog Food - Premium',
        description: 'High-quality nutritious dog food',
        category: 'food',
        price: 899.99,
        quantity: 100,
        petType: 'dog',
        isActive: true,
      },
      {
        name: 'Cat Toys Set',
        description: 'Interactive toys for cats',
        category: 'toys',
        price: 499.99,
        quantity: 50,
        petType: 'cat',
        isActive: true,
      },
      {
        name: 'Pet Grooming Kit',
        description: 'Complete grooming tools for pets',
        category: 'grooming',
        price: 1299.99,
        quantity: 30,
        petType: 'all',
        isActive: true,
      },
      {
        name: 'Dog Collar & Leash',
        description: 'Comfortable and durable collar',
        category: 'accessories',
        price: 399.99,
        quantity: 75,
        petType: 'dog',
        isActive: true,
      },
      {
        name: 'Pet Health Vitamins',
        description: 'Essential vitamins for pet health',
        category: 'health',
        price: 599.99,
        quantity: 60,
        petType: 'all',
        isActive: true,
      },
    ];

    await Product.bulkCreate(products);
    console.log('✓ Sample products created');

    // Create sample services
    const services = [
      {
        name: 'Veterinary Consultation',
        description: 'Professional vet consultation for your pets',
        serviceType: 'veterinary',
        price: 299.99,
        vendorId: vendor1.id,
        vendorName: 'Dr. Raj Veterinary Clinic',
        vendorPhone: '9876543211',
        vendorEmail: 'dr.raj@petsite.com',
        address: 'Fort, Mumbai',
        city: 'Mumbai',
        rating: 4.8,
        isAvailable: true,
      },
      {
        name: 'Pet Babysitting',
        description: 'Professional pet care while you are away',
        serviceType: 'babysitting',
        price: 199.99,
        vendorId: vendor1.id,
        vendorName: 'Dr. Raj Veterinary Clinic',
        vendorPhone: '9876543211',
        vendorEmail: 'dr.raj@petsite.com',
        address: 'Fort, Mumbai',
        city: 'Mumbai',
        rating: 4.7,
        isAvailable: true,
      },
      {
        name: 'Pet Grooming',
        description: 'Professional grooming services',
        serviceType: 'grooming',
        price: 399.99,
        vendorId: vendor1.id,
        vendorName: 'Dr. Raj Veterinary Clinic',
        vendorPhone: '9876543211',
        vendorEmail: 'dr.raj@petsite.com',
        address: 'Fort, Mumbai',
        city: 'Mumbai',
        rating: 4.6,
        isAvailable: true,
      },
    ];

    await Service.bulkCreate(services);
    console.log('✓ Sample services created');

    console.log('\n✅ Database seeding completed successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
