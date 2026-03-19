# 🐾 PetSite - Pet Marketplace Platform

A comprehensive full-stack pet marketplace application for Mumbai offering pet products, veterinary services, pet babysitting, and instant medicine delivery. Built with modern web and mobile technologies.

## ✨ Features

### 🛍️ Pet Products Marketplace
- Browse dogs, cats, birds, and exotic pet products
- Filter by category, pet type, and price
- Instant delivery across Mumbai
- Product search and recommendations

### 👨‍⚕️ Veterinary Services
- Book online vet consultations
- Find certified veterinarians in your area
- Service ratings and reviews
- Appointment management

### 👶 Pet Babysitting & Care
- Professional pet care services
- Babysitting and dog walking
- Grooming services
- Training sessions

### 💊 Pet Medicines & Health
- Prescription and OTC medicines
- Health supplements
- Instant delivery
- Pharmacist support

### 🔐 Secure Platform
- JWT-based authentication
- Encrypted passwords
- Multi-role support (customer, vendor, admin)
- Secure payment integration ready

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT
- **Payment**: Stripe integration ready

### Frontend (Web)
- **Framework**: React.js 18
- **Routing**: React Router v6
- **UI Library**: Ant Design
- **HTTP Client**: Axios

### Mobile (Cross-platform)
- **Framework**: React Native
- **Navigation**: React Navigation
- **HTTP Client**: Axios
- **Type Safety**: TypeScript

## 📁 Project Structure

```
petsite2/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/     # Business logic
│   │   ├── models/         # Database models
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/      # Auth & validation
│   │   ├── utils/          # Utilities & helpers
│   │   └── server.js       # Entry point
│   ├── .env.example
│   ├── .env.local          # Dev environment
│   └── package.json
│
├── web/                     # React web frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public/
│   └── package.json
│
├── mobile/                  # React Native app
│   ├── src/
│   │   ├── screens/        # App screens
│   │   ├── components/     # Reusable components
│   │   ├── services/       # API services
│   │   └── App.tsx
│   └── package.json
│
├── SETUP.md                # Setup & installation guide
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ and npm/yarn
- PostgreSQL 12+
- Git

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your PostgreSQL credentials
npm run dev
```

Backend runs on `http://localhost:3001`

### 2. Web Frontend Setup

```bash
cd web
npm install
npm start
```

Web app runs on `http://localhost:3000`

### 3. Mobile App Setup

```bash
cd mobile
npm install

# iOS (macOS only)
npm run ios

# Android
npm run android
```

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/register      # Create account
POST   /api/auth/login         # Login user
GET    /api/auth/profile       # Get profile (protected)
```

### Products
```
GET    /api/products           # List products (paginated)
GET    /api/products/:id       # Product details
POST   /api/products           # Create product (vendor)
PUT    /api/products/:id       # Update product
```

### Services
```
GET    /api/services           # List services (filterable)
GET    /api/services/:id       # Service details
POST   /api/services           # Create service (vendor)
PUT    /api/services/:id       # Update service
```

### Orders
```
GET    /api/orders             # User's orders
POST   /api/orders             # Create order
GET    /api/orders/:id         # Order details
PUT    /api/orders/:id/status  # Update status (admin)
```

### Service Bookings
```
GET    /api/bookings           # User's bookings
POST   /api/bookings           # Create booking
PUT    /api/bookings/:id/status # Update status
```

## 🗄️ Database Schema

**Users Table**
- Handles customers, vendors, and admins
- Secure password hashing with bcryptjs
- User roles and permissions

**Products Table**
- Pet product catalog
- Categories: food, toys, accessories, grooming, health
- Inventory management
- Vendor association

**Services Table**
- Veterinary, babysitting, grooming services
- Vendor profiles with ratings
- Service pricing and availability

**Orders Table**
- Order management with status tracking
- Payment status monitoring
- Delivery tracking

**Service Bookings Table**
- Service reservations with dates
- Pet information storage
- Booking status management

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing with bcryptjs
- ✅ CORS protection
- ✅ Environment variable management
- ✅ Role-based access control
- ✅ Input validation ready
- ✅ Stripe payment integration ready

## 🛠️ Development Workflow

### Backend Development
```bash
cd backend
npm run dev          # Start with nodemon auto-reload
npm test             # Run tests
npm run seed         # Seed database (if available)
```

### Web Development
```bash
cd web
npm start            # Start dev server with hot reload
npm run build        # Production build
```

### Mobile Development
```bash
cd mobile
npm start            # Start Metro bundler
npm run ios          # Run iOS simulator
npm run android      # Run Android emulator
```

## 📋 Implementation Checklist

### Phase 1 - Foundation ✅
- [x] Project scaffolding
- [x] Database models
- [x] API structure
- [x] Authentication system
- [ ] Test suite setup

### Phase 2 - Core Features
- [ ] Product management system
- [ ] Service booking system
- [ ] Order processing
- [ ] Payment integration
- [ ] Email notifications

### Phase 3 - Advanced Features
- [ ] Real-time order tracking with Maps
- [ ] Admin dashboard
- [ ] Vendor analytics
- [ ] Review & rating system
- [ ] Recommendation engine

### Phase 4 - Optimization
- [ ] Performance optimization
- [ ] Caching strategies
- [ ] Search optimization
- [ ] Mobile app optimization
- [ ] CI/CD pipeline

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
brew services list

# Create database if missing
createdb petsite_db
```

### Port Already in Use
```bash
# Kill process using port 3001
lsof -i :3001
kill -9 <PID>
```

### Dependencies Issue
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📖 Documentation

- [Backend Documentation](./backend/README.md)
- [Web Frontend Documentation](./web/README.md)
- [Mobile App Documentation](./mobile/README.md)
- [Setup & Installation Guide](./SETUP.md)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📝 Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=petsite_db
DB_USER=postgres
DB_PASSWORD=your_password
PORT=3001
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=sk_test_key
```

### Web Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3001/api
```

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: support@petsite.in

## 🙏 Acknowledgments

Built with ❤️ for pet lovers in Mumbai

---

**PetSite © 2024** - Your complete pet marketplace solution
