import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock data
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Dog Food',
    description: 'High-quality nutritious dog food',
    category: 'food',
    price: 899.99,
    quantity: 100,
    petType: 'dog',
    image: 'https://images.unsplash.com/photo-1568152950566-c1bf43f0a86d?w=300',
  },
  {
    id: '2',
    name: 'Cat Toys Set',
    description: 'Interactive toys for cats',
    category: 'toys',
    price: 499.99,
    quantity: 50,
    petType: 'cat',
    image: 'https://images.unsplash.com/photo-1530281335914-ffe53923c3a5?w=300',
  },
  {
    id: '3',
    name: 'Dog Collar & Leash',
    description: 'Comfortable and durable collar',
    category: 'accessories',
    price: 399.99,
    quantity: 75,
    petType: 'dog',
    image: 'https://images.unsplash.com/photo-1587300411107-ec48506850e8?w=300',
  },
  {
    id: '4',
    name: 'Pet Grooming Kit',
    description: 'Complete grooming tools for pets',
    category: 'grooming',
    price: 1299.99,
    quantity: 30,
    petType: 'all',
    image: 'https://images.unsplash.com/photo-1576516927231-7a25138f73de?w=300',
  },
  {
    id: '5',
    name: 'Pet Health Vitamins',
    description: 'Essential vitamins for pet health',
    category: 'health',
    price: 599.99,
    quantity: 60,
    petType: 'all',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300',
  },
  {
    id: '6',
    name: 'Bird Cage Adventure',
    description: 'Spacious bird cage with accessories',
    category: 'accessories',
    price: 2499.99,
    quantity: 20,
    petType: 'bird',
    image: 'https://images.unsplash.com/photo-1549746292-0ed0ee81710e?w=300',
  },
];

const MOCK_SERVICES = [
  {
    id: '1',
    name: 'Veterinary Consultation',
    description: 'Professional vet consultation for your pets',
    serviceType: 'veterinary',
    price: 299.99,
    vendorName: 'Dr. Raj Veterinary Clinic',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5f50f6711?w=300',
  },
  {
    id: '2',
    name: 'Pet Babysitting',
    description: 'Professional pet care while you are away',
    serviceType: 'babysitting',
    price: 199.99,
    vendorName: 'Happy Paws Care',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1558945506-f4dd1dcd1a3d?w=300',
  },
  {
    id: '3',
    name: 'Pet Grooming',
    description: 'Professional grooming services',
    serviceType: 'grooming',
    price: 399.99,
    vendorName: 'Pawfect Grooming',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1576516927231-7a25138f73de?w=300',
  },
];

export const authService = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getProfile: () => API.get('/auth/profile'),
};

export const productService = {
  getAll: (params) => {
    // Return mock data
    const filtered = MOCK_PRODUCTS.filter(p => {
      if (params.category && p.category !== params.category) return false;
      if (params.petType && params.petType !== 'all' && p.petType !== params.petType && p.petType !== 'all') return false;
      return true;
    });
    
    const page = params.page || 1;
    const limit = params.limit || 12;
    const offset = (page - 1) * limit;
    
    return Promise.resolve({
      data: {
        success: true,
        data: {
          products: filtered.slice(offset, offset + limit),
          pagination: {
            page,
            limit,
            total: filtered.length,
            pages: Math.ceil(filtered.length / limit),
          },
        },
      },
    });
  },
  getById: (id) => API.get(`/products/${id}`),
  create: (data) => API.post('/products', data),
  update: (id, data) => API.put(`/products/${id}`, data),
};

export const serviceService = {
  getAll: (params) => {
    // Return mock services
    return Promise.resolve({
      data: {
        success: true,
        data: {
          services: MOCK_SERVICES,
          pagination: {
            page: 1,
            limit: 10,
            total: MOCK_SERVICES.length,
            pages: 1,
          },
        },
      },
    });
  },
  getById: (id) => API.get(`/services/${id}`),
  bookService: (data) => API.post('/services/book', data),
};

export const orderService = {
  getAll: () => API.get('/orders'),
  create: (data) => API.post('/orders', data),
  getById: (id) => API.get(`/orders/${id}`),
};

export default API;
