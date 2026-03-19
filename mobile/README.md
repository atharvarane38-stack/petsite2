## Mobile App Documentation

### Project Structure

```
mobile/
├── src/
│   ├── screens/        # Screen components
│   ├── components/     # Reusable components
│   ├── services/       # API services
│   └── App.tsx         # Main app component
├── package.json        # Dependencies
└── .gitignore
```

### Key Features

- **Bottom Tab Navigation** for main app sections
- **Screen-based routing** using React Navigation
- **TypeScript** support for better code quality
- **API integration** with backend

### Screens

- **HomeScreen** - App home with category overview
- **ProductsScreen** - Product browsing
- **ServicesScreen** - Service browsing and booking
- **CartScreen** - Shopping cart
- **ProfileScreen** - User profile

### Getting Started

```bash
npm install

# For iOS (macOS only)
npm run ios

# For Android
npm run android

# Start Metro bundler (if needed)
npm start
```

### Platform-Specific Setup

#### iOS
- Requires macOS
- Requires Xcode (iOS simulator)
- Pod dependencies installed automatically

#### Android
- Requires Android Studio
- Emulator or connected device needed
- Android SDK configured

### Navigation Structure

```
BottomTabNavigator
├─ Home
├─ Products
├─ Services
├─ Cart
└─ Profile
```

### API Integration

```typescript
import { authService } from '../services/api';

// Using async/await
const login = async (email: string, password: string) => {
  const response = await authService.login({ email, password });
  return response.data;
};
```

### TODO Features

- [ ] Authentication screens (login/register)
- [ ] Product detail view
- [ ] Shopping cart functionality
- [ ] Order tracking
- [ ] Maps integration
- [ ] Push notifications
- [ ] Offline support
- [ ] Dark mode
- [ ] Multi-language support
