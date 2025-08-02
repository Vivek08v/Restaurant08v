# JWT Implementation Guide

## Overview
This Spring Boot application implements JWT (JSON Web Token) authentication with role-based authorization. The implementation includes user registration, login, and protected endpoints.

## Key Components

### 1. JWT Utilities (`JwtUtil.java`)
- **Token Generation**: Creates JWT tokens with user email, ID, and role
- **Token Validation**: Validates token signature and expiration
- **Claims Extraction**: Extracts user information from tokens
- **Expiration Check**: Validates if tokens are expired

### 2. JWT Filter (`JwtFilter.java`)
- **Request Filtering**: Intercepts all requests to validate JWT tokens
- **Authentication Setup**: Sets up Spring Security context with user details
- **Error Handling**: Returns proper HTTP status codes for invalid tokens
- **Debug Logging**: Provides detailed logging for troubleshooting

### 3. Custom User Details (`CustomUserDetails.java`)
- **User Information**: Stores user ID, email, and role
- **Authority Management**: Converts roles to Spring Security authorities
- **Security Integration**: Implements UserDetails interface for Spring Security

### 4. Security Configuration (`SecurityConfig.java`)
- **CORS Configuration**: Handles cross-origin requests
- **Endpoint Protection**: Defines which endpoints require authentication
- **Role-Based Access**: Implements role-based authorization
- **Stateless Sessions**: Configures stateless JWT-based sessions

## API Endpoints

### Authentication Endpoints (Public)
```
POST /api/v1/auth/signup
POST /api/v1/auth/login
```

### Protected Endpoints
```
POST /api/v1/booking          (CUST, ADMIN roles)
GET  /api/v1/all-bookings     (ADMIN role only)
GET  /api/v1/test/auth        (Any authenticated user)
GET  /api/v1/test/admin       (ADMIN role only)
GET  /api/v1/test/customer    (CUST role only)
```

## Database Schema

The `user` table should have the following columns:
```sql
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    role VARCHAR(50) DEFAULT 'CUST'
);
```

## Usage Examples

### 1. User Registration
```bash
curl -X POST http://localhost:8080/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "address": "123 Main St"
  }'
```

### 2. User Login
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Accessing Protected Endpoints
```bash
curl -X GET http://localhost:8080/api/v1/test/auth \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Token Structure

JWT tokens contain the following claims:
- **Subject**: User email
- **userId**: User ID from database
- **role**: User role (CUST, ADMIN)
- **Issued At**: Token creation timestamp
- **Expiration**: Token expiration (1 hour from creation)

## Security Features

### 1. Token Validation
- Signature verification using HMAC-SHA256
- Expiration time validation
- Proper error handling for invalid tokens

### 2. Role-Based Authorization
- **CUST**: Customer role for basic operations
- **ADMIN**: Administrator role for all operations
- Role-based endpoint protection

### 3. Error Handling
- Proper HTTP status codes (401 for unauthorized)
- Detailed error messages for debugging
- Graceful handling of malformed tokens

## Debugging

### Enable Debug Logging
The JWT filter includes comprehensive logging:
- Request URI and method
- Authorization header presence
- Token validation results
- User authentication details

### Common Issues

1. **Token Expired**: Check token expiration time
2. **Invalid Signature**: Verify secret key consistency
3. **Missing Authorization Header**: Ensure Bearer token is included
4. **Role Access Denied**: Verify user has required role

## Configuration

### JWT Secret Key
The secret key is configured in `JwtUtil.java`:
```java
private final String SECRET_KEY = "this_is_a_very_secure_secret_key_123456";
```

### Token Expiration
Token expiration is set to 1 hour:
```java
.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
```

### CORS Configuration
CORS is configured for `http://localhost:5173` (frontend origin).

## Testing

### Test Endpoints
Use the test endpoints to verify JWT functionality:
- `/api/v1/test/auth`: Verify authentication
- `/api/v1/test/admin`: Test admin role access
- `/api/v1/test/customer`: Test customer role access

### Manual Testing
1. Register a new user
2. Login to get JWT token
3. Use token to access protected endpoints
4. Verify role-based access control

## Best Practices

1. **Secure Secret Key**: Use environment variables for production
2. **Token Refresh**: Implement token refresh mechanism
3. **Password Hashing**: Use BCrypt for password storage
4. **HTTPS**: Always use HTTPS in production
5. **Token Storage**: Store tokens securely on client side
6. **Logout**: Implement proper logout with token invalidation

## Troubleshooting

### Common Error Messages
- "Authorization header required": Missing Bearer token
- "Invalid token": Token signature or format is invalid
- "Token processing error": General JWT processing error
- "Access denied": User lacks required role

### Debug Steps
1. Check server logs for JWT filter messages
2. Verify token format and expiration
3. Confirm user role in database
4. Test with Postman or curl
5. Check CORS configuration

## Future Enhancements

1. **Token Refresh**: Implement refresh token mechanism
2. **Password Hashing**: Add BCrypt password hashing
3. **Token Blacklisting**: Implement logout with token invalidation
4. **Rate Limiting**: Add rate limiting for auth endpoints
5. **Audit Logging**: Add comprehensive audit logging
6. **Multi-factor Authentication**: Implement 2FA support 