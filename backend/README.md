## Backend API Documentation

### Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files (database, etc.)
│   ├── controllers/      # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API route definitions
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utility functions
│   └── server.js        # Main server file
├── .env.example         # Environment template
├── package.json         # Dependencies
└── .gitignore
```

### Getting Started

```bash
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Database Models

- **User** - User accounts with roles (customer, vendor, admin)
- **Product** - Pet products with categories and stock
- **Service** - Pet services with vendor info
- **Order** - Customer orders
- **OrderItem** - Individual items in orders
- **ServiceBooking** - Service reservations

### Middleware

- `auth.js` - JWT authentication middleware

### Controllers

- `authController.js` - User registration, login, profile
- `productController.js` - Product CRUD operations
- `serviceController.js` - Service management
- `orderController.js` - Order management
- `bookingController.js` - Service booking management

### API Routes

All routes return JSON with consistent format:
```json
{
  "success": true/false,
  "message": "Description",
  "data": {}
}
```

### Authentication

- Uses JWT tokens
- Token included in `Authorization: Bearer <token>` header
- Tokens expire based on JWT_EXPIRY setting

### TODO Features

- [ ] Database migration system
- [ ] Input validation middleware
- [ ] Error logging
- [ ] Rate limiting
- [ ] Payment processing
- [ ] Email notifications
- [ ] Admin endpoints
- [ ] Vendor analytics
