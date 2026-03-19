# Setup & Installation Guide

## Quick Start

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
# Edit .env.local with your database credentials

# Start development server
npm run dev
```

Backend will be available at `http://localhost:3001`

### 2. Database Setup

```bash
# Create PostgreSQL database
psql postgres

postgres=# CREATE DATABASE petsite_db;
postgres=# \c petsite_db;
postgres=# \q
```

### 3. Web Frontend Setup

```bash
# Navigate to web
cd web

# Install dependencies
npm install

# Start development server
npm start
```

Web app will be available at `http://localhost:3000`

### 4. Mobile App Setup

```bash
# Navigate to mobile
cd mobile

# Install dependencies
npm install

# For iOS (requires macOS)
npm run ios

# For Android (requires Android Studio/Emulator)
npm run android
```

## Database Schema

The following tables will be created:

- **users** - User accounts (customers, vendors, admins)
- **products** - Pet products catalog
- **services** - Pet services (vet, babysitting, grooming)
- **orders** - Customer orders
- **order_items** - Items within orders
- **service_bookings** - Service reservations

## API Endpoints Overview

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Log in user
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - List all products (paginated, filterable)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Add new product (vendors)
- `PUT /api/products/:id` - Update product

### Services
- `GET /api/services` - List services (filterable by type/city)
- `GET /api/services/:id` - Get service details
- `POST /api/services` - Create service (vendors)
- `PUT /api/services/:id` - Update service

### Orders
- `GET /api/orders` - User's orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Order details
- `PUT /api/orders/:id/status` - Update status (admin)

### Service Bookings
- `GET /api/bookings` - User's bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id/status` - Update status

## Features Ready to Implement

- [ ] Payment processing with Stripe
- [ ] Real-time order tracking with maps
- [ ] Email notifications
- [ ] SMS alerts (Twilio integration)
- [ ] Admin dashboard
- [ ] Vendor analytics
- [ ] Reviews and ratings system
- [ ] Wishlist functionality
- [ ] Push notifications (mobile)
- [ ] Search with Elasticsearch

## Tech Stack Summary

| Component | Technology |
|-----------|-----------|
| Backend | Node.js + Express |
| Database | PostgreSQL |
| ORM | Sequelize |
| Authentication | JWT |
| Web Frontend | React |
| Mobile App | React Native |
| UI Components (Web) | Ant Design |
| HTTP Client | Axios |

## Environment Variables

### Backend (.env)
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_NAME` - Database name
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `PORT` - Server port (default: 3001)
- `JWT_SECRET` - JWT signing secret
- `STRIPE_SECRET_KEY` - Stripe API key

### Web Frontend (.env)
- `REACT_APP_API_URL` - Backend API URL

## Troubleshooting

**Port already in use?**
```bash
# Find process using port 3001
lsof -i :3001

# Kill process
kill -9 <PID>
```

**Database connection error?**
- Ensure PostgreSQL is running
- Check DB credentials in .env
- Verify database exists

**Dependencies issues?**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Set up PostgreSQL database
2. Configure environment variables
3. Install backend dependencies
4. Start backend server
5. Install web frontend dependencies
6. Start web development server
7. (Optional) Set up mobile development environment

For more details, see individual README files in each folder.
