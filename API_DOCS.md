# PetSite - Complete API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

Tokens are obtained via the login endpoint and expire after 7 days (configurable).

---

## Authentication Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "SecurePassword123",
  "userType": "customer"  // customer, vendor, or admin
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "userType": "customer"
    },
    "token": "eyJhbGc..."
  }
}
```

### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "userType": "customer"
    },
    "token": "eyJhbGc..."
  }
}
```

### Get User Profile
```http
GET /auth/profile
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile retrieved",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main St",
    "city": "Mumbai",
    "userType": "customer"
  }
}
```

---

## Products Endpoints

### Get All Products
```http
GET /products?category=food&petType=dog&page=1&limit=20
```

**Query Parameters:**
- `category`: food, toys, accessories, grooming, health, other
- `petType`: dog, cat, bird, fish, exotic, all
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**Response (200):**
```json
{
  "success": true,
  "message": "Products retrieved",
  "data": {
    "products": [
      {
        "id": "uuid",
        "name": "Premium Dog Food",
        "price": 899.99,
        "category": "food",
        "petType": "dog",
        "image": "url",
        "quantity": 100,
        "description": "High-quality nutrition"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "pages": 3
    }
  }
}
```

### Get Product by ID
```http
GET /products/:id
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Premium Dog Food",
    "description": "Details...",
    "price": 899.99,
    "category": "food",
    "petType": "dog",
    "quantity": 100,
    "image": "url",
    "vendorId": "uuid",
    "isActive": true
  }
}
```

### Create Product (Vendor)
```http
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Premium Dog Food",
  "description": "High-quality nutrition",
  "category": "food",
  "price": 899.99,
  "quantity": 100,
  "petType": "dog",
  "image": "url"
}
```

**Response (201):** Product object

---

## Services Endpoints

### Get All Services
```http
GET /services?serviceType=veterinary&city=Mumbai&page=1&limit=20
```

**Query Parameters:**
- `serviceType`: veterinary, babysitting, grooming, training, other
- `city`: City filter
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**Response (200):**
```json
{
  "success": true,
  "message": "Services retrieved",
  "data": {
    "services": [
      {
        "id": "uuid",
        "name": "Veterinary Consultation",
        "serviceType": "veterinary",
        "price": 299.99,
        "vendorName": "Dr. Raj Clinic",
        "rating": 4.8,
        "city": "Mumbai",
        "isAvailable": true
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 15,
      "pages": 1
    }
  }
}
```

### Create Service (Vendor)
```http
POST /services
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Veterinary Consultation",
  "description": "Online vet consultation",
  "serviceType": "veterinary",
  "price": 299.99,
  "vendorName": "Dr. Raj Clinic",
  "phone": "9876543210",
  "email": "dr.raj@clinic.com",
  "address": "Fort, Mumbai",
  "city": "Mumbai"
}
```

---

## Orders Endpoints

### Get User Orders
```http
GET /orders
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "totalAmount": 2499.99,
      "status": "delivered",
      "paymentStatus": "completed",
      "deliveryAddress": "123 Main St",
      "city": "Mumbai",
      "estimatedDelivery": "2024-03-25T00:00:00.000Z",
      "createdAt": "2024-03-20T10:30:00.000Z"
    }
  ]
}
```

### Create Order
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "uuid",
      "quantity": 2,
      "price": 899.99
    },
    {
      "productId": "uuid",
      "quantity": 1,
      "price": 599.99
    }
  ],
  "deliveryAddress": "123 Main St",
  "city": "Mumbai",
  "zipcode": "400001"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": "uuid",
    "totalAmount": 2399.97,
    "status": "pending",
    "paymentStatus": "pending",
    "deliveryAddress": "123 Main St",
    "city": "Mumbai"
  }
}
```

---

## Service Bookings Endpoints

### Get User Bookings
```http
GET /bookings
Authorization: Bearer <token>
```

### Create Service Booking
```http
POST /bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "serviceId": "uuid",
  "bookingDate": "2024-03-25T10:00:00Z",
  "duration": 1,
  "petName": "Max",
  "petBreed": "Golden Retriever",
  "petAge": "3 years",
  "notes": "Friendly dog, needs grooming"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": "uuid",
    "serviceId": "uuid",
    "bookingDate": "2024-03-25T10:00:00Z",
    "status": "pending",
    "totalPrice": 299.99,
    "petName": "Max",
    "petBreed": "Golden Retriever"
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": {}  // Only in development
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Server Error

---

## Rate Limiting

Currently no rate limits, but may be added in future versions.

## Version

Current API Version: **v1**

---

## Support

For API issues or questions, please contact: support@petsite.in
