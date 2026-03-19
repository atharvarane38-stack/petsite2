#!/bin/bash

# Development environment setup script
echo "🐾 PetSite - Development Environment Setup"
echo "==========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16+"
    exit 1
fi

echo "✓ Node.js is installed: $(node -v)"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed. You'll need to install it."
    echo "   macOS: brew install postgresql"
    echo "   Ubuntu: sudo apt-get install postgresql"
else
    echo "✓ PostgreSQL is installed"
fi

echo ""
echo "Setting up backend..."
cd backend
npm install
cp .env.example .env
echo "✓ Backend setup complete. Edit .env with your configuration."

echo ""
echo "Setting up web frontend..."
cd ../web
npm install
echo "✓ Web frontend setup complete."

echo ""
echo "Setting up mobile app..."
cd ../mobile
npm install
echo "✓ Mobile app setup complete."

echo ""
echo "==========================================="
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure backend/.env with your database credentials"
echo "2. Create PostgreSQL database: createdb petsite_db"
echo "3. Start backend: cd backend && npm run dev"
echo "4. Start web: cd web && npm start"
echo "5. Start mobile: cd mobile && npm run ios (or android)"
echo ""
echo "For more help, see SETUP.md"
