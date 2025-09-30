const express = require('express');
const { 
  register, 
  login, 
  getMe, 
  forgotPassword, 
  resetPassword, 
  requestLoginToken,
  loginWithToken,
  updateProfile, 
  changePassword, 
  uploadProfilePhoto 
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const upload = require('../config/multer');

const router = express.Router();

// Public routes
router.post('/register', upload.fields([
  { name: 'ktm', maxCount: 1 },
  { name: 'berkas', maxCount: 1 },
  { name: 'foto', maxCount: 1 }
]), register);

router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/request-login-token', requestLoginToken);
router.post('/login-with-token', loginWithToken);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.put('/profile-photo', protect, upload.single('foto'), uploadProfilePhoto);

module.exports = router;