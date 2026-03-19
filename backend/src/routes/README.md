# API Routes Structure

## Authentication Routes
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- GET /api/auth/profile - Get user profile

## Products Routes
- GET /api/products - Get all products
- GET /api/products/:id - Get product details
- POST /api/products - Create product
- PUT /api/products/:id - Update product

## Services Routes
- GET /api/services - Get all services
- GET /api/services/:id - Get service details
- POST /api/services - Create service
- POST /api/services/book - Book service

## Orders Routes
- GET /api/orders - Get user orders
- POST /api/orders - Create order

## Service Bookings Routes
- GET /api/bookings - Get user bookings
- POST /api/bookings - Create booking
