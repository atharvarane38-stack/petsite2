## Web Frontend Documentation

### Project Structure

```
web/
├── src/
│   ├── components/       # Reusable React components
│   ├── pages/           # Full page components
│   ├── services/        # API service layer
│   ├── App.jsx          # Main app component
│   └── index.js         # Entry point
├── public/              # Static files
├── package.json         # Dependencies
└── .gitignore
```

### Key Features

- **Page-based routing** using React Router
- **Component-based architecture**
- **API service layer** for backend communication
- **Ant Design** for UI components

### Getting Started

```bash
npm install
npm start
```

### Creating New Components

Components should be placed in `src/components/` and should be reusable.

Example:
```jsx
import React from 'react';

function MyComponent({ title }) {
  return <div>{title}</div>;
}

export default MyComponent;
```

### Using API Services

```jsx
import { productService } from '../services/api';

// Inside a component
const products = await productService.getAll();
```

### Available Services

- `authService` - Authentication (register, login, profile)
- `productService` - Pet products (CRUD operations)
- `serviceService` - Pet services
- `orderService` - Orders

### Authentication Flow

1. User registers/logs in
2. Token is stored in localStorage
3. Token is automatically added to API requests
4. Token is cleared on logout

### TODO Features

- [ ] User authentication UI
- [ ] Product listing page
- [ ] Shopping cart
- [ ] Checkout page
- [ ] Order history
- [ ] Service booking
- [ ] User profile
- [ ] Admin dashboard
