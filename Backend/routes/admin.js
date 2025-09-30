const express = require('express');
const {
  getPendingApplications,
  getAllApplications,
  getApplicationDetails,
  approveApplication,
  rejectApplication,
  getStats,
  getAllUsers,
  changeUserRole,
  getActivityLogs,
  getStaffActivityLogs
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protect all routes and authorize only admin
router.use(protect);
router.use(authorize('admin'));

// Statistics (admin)
router.get('/stats', getStats);

// User management (admin only)
router.get('/users', getAllUsers);
router.put('/users/:id/role', changeUserRole);

// Activity logs (admin only)
router.get('/activity-logs', getActivityLogs);
router.get('/staff-activity-logs', getStaffActivityLogs);

module.exports = router;