# Authentication Setup

## Environment Variables

Create a `.env` file in the frontend directory with the following content:

```
VITE_API_URL=http://localhost:3000/api/v1
```

## Features Implemented

### 1. Authentication System
- **Register Page**: Complete registration form with file uploads (KTM, berkas pendukung, foto profil)
- **Login Page**: NIM and password authentication
- **Protected Routes**: Automatic redirection based on authentication status
- **Auth Context**: Global state management for user authentication

### 2. Pages Created
- `/register` - User registration with file uploads
- `/login` - User login
- `/dashboard` - Protected dashboard for authenticated users
- `/pending-approval` - Page for users waiting for admin approval
- `/unauthorized` - Error page for unauthorized access

### 3. Backend Integration
- API client with proper error handling
- JWT token management
- File upload support for registration
- Automatic token refresh and validation

### 4. Form Validation
- Zod schema validation for all forms
- Real-time error display
- File upload validation
- Password confirmation matching

## How to Run

1. **Backend**: Make sure the backend server is running on port 3000
2. **Frontend**: Run the development server:
   ```bash
   npm run dev
   ```
3. **Environment**: Set the `VITE_API_URL` environment variable to point to your backend

## User Flow

1. **Registration**: Users fill out the registration form and upload required documents
2. **Pending Approval**: After registration, users are redirected to a pending approval page
3. **Admin Approval**: Admin approves/rejects the registration through the backend
4. **Login**: Approved users can log in with their NIM and password
5. **Dashboard**: Authenticated users can access the protected dashboard

## File Upload Requirements

The registration form requires three file uploads:
- **KTM**: Kartu Tanda Mahasiswa (Student ID card)
- **Berkas Pendukung**: Supporting documents
- **Foto Profil**: Profile photo

All files must be image formats (PNG, JPG, JPEG).

## Security Features

- JWT token-based authentication
- Protected routes with role-based access
- Automatic token validation
- Secure file upload handling
- Form validation and sanitization
