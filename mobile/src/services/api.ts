import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

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

export const authService = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getProfile: () => API.get('/auth/profile'),
};

export const productService = {
  getAll: (params) => API.get('/products', { params }),
  getById: (id) => API.get(`/products/${id}`),
  create: (data) => API.post('/products', data),
  update: (id, data) => API.put(`/products/${id}`, data),
};

export const serviceService = {
  getAll: (params) => API.get('/services', { params }),
  getById: (id) => API.get(`/services/${id}`),
  bookService: (data) => API.post('/services/book', data),
};

export const orderService = {
  getAll: () => API.get('/orders'),
  create: (data) => API.post('/orders', data),
  getById: (id) => API.get(`/orders/${id}`),
};

export default API;
