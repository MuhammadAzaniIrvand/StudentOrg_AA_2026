const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const path = require('path');
const { sendEmail, emailTemplates } = require('../utils/email');

// Create activity log helper
const createActivityLog = async (userId, action, description, targetUserId = null, details = {}) => {
  try {
    await ActivityLog.create({
      user: userId,
      action,
      description,
      targetUser: targetUserId,
      details
    });
  } catch (error) {
    console.error('Error creating activity log:', error);
  }
};

// Create PSDA or Admin account
exports.createStaffAccount = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;

    if (!['psda', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Role harus salah satu dari: psda, admin'
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Email sudah terdaftar'
      });
    }

    const staff = await User.create({
      nama,
      email,
      password,
      role,
      status: 'approved'
    });

    res.status(201).json({
      success: true,
      message: `Akun ${role.toUpperCase()} berhasil dibuat`,
      data: { id: staff._id, nama: staff.nama, email: staff.email, role: staff.role }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all users with their roles (for admin)
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const role = req.query.role;
    
    let filter = {};
    if (role && role !== 'all') {
      filter.role = role;
    }

    const users = await User.find(filter)
      .select('nim nama email role status fakultas jurusan createdAt')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: { users }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Change user role (admin only)
exports.changeUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const validRoles = ['user', 'psda', 'admin'];
    
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Role tidak valid'
      });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    const oldRole = user.role;
    user.role = role;
    
    // If promoting to staff, auto-approve
    if (role !== 'user') {
      user.status = 'approved';
    }
    
    await user.save();

    // Log role change
    await createActivityLog(
      req.user.id,
      'change_user_role',
      `${req.user.nama} mengubah role ${user.nama} dari ${oldRole} menjadi ${role}`,
      user._id,
      { oldRole, newRole: role }
    );

    res.status(200).json({
      success: true,
      message: `Role ${user.nama} berhasil diubah menjadi ${role}`,
      data: {
        user: {
          id: user._id,
          nim: user.nim,
          nama: user.nama,
          email: user.email,
          role: user.role,
          status: user.status
        }
      }
    });

  } catch (error) {
    console.error('Change user role error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get activity logs
exports.getActivityLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const action = req.query.action;
    const userId = req.query.userId;
    
    let filter = {};
    if (action && action !== 'all') {
      filter.action = action;
    }
    if (userId) {
      filter.user = userId;
    }

    const logs = await ActivityLog.find(filter)
      .populate('user', 'nim nama email role')
      .populate('targetUser', 'nim nama email role')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await ActivityLog.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: logs.length,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: { logs }
    });
  } catch (error) {
    console.error('Get activity logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get activity logs by staff (PSDA)
exports.getStaffActivityLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    // Get logs for PSDA staff only
    const psdaUsers = await User.find({ role: 'psda' }).select('_id');
    const psdaUserIds = psdaUsers.map(user => user._id);
    
    const filter = { user: { $in: psdaUserIds } };
    
    const logs = await ActivityLog.find(filter)
      .populate('user', 'nim nama email role')
      .populate('targetUser', 'nim nama email role')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await ActivityLog.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: logs.length,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: { logs }
    });
  } catch (error) {
    console.error('Get staff activity logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get all pending applications
exports.getPendingApplications = async (req, res) => {
  try {
    const applications = await User.find({ 
      status: 'pending',
      role: 'user' 
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: { applications }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get all applications (pending, approved, rejected)
exports.getAllApplications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    
    let filter = { role: 'user' };
    if (status && status !== 'all') {
      filter.status = status;
    }

    const applications = await User.find(filter)
      .populate('approvedBy', 'nama email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: applications.length,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: { applications }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get application details
exports.getApplicationDetails = async (req, res) => {
  try {
    const application = await User.findById(req.params.id)
      .populate('approvedBy', 'nama email');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Aplikasi tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: { application }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Approve application
exports.approveApplication = async (req, res) => {
  try {
    const application = await User.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Aplikasi tidak ditemukan'
      });
    }

    if (application.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Aplikasi sudah diproses sebelumnya'
      });
    }

    // Update application status
    application.status = 'approved';
    application.approvedBy = req.user.id;
    application.approvedAt = new Date();
    await application.save();

    // Log approval activity
    await createActivityLog(
      req.user.id,
      'approve_application',
      `${req.user.nama} menyetujui pendaftaran ${application.nama}`,
      application._id
    );

    // Send approval email
    try {
      const emailTemplate = emailTemplates.approved(application.nama);
      await sendEmail({
        email: application.email,
        ...emailTemplate
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(200).json({
      success: true,
      message: 'Aplikasi berhasil disetujui dan email notifikasi telah dikirim'
    });

  } catch (error) {
    console.error('Approve application error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Reject application
exports.rejectApplication = async (req, res) => {
  try {
    const { reason } = req.body;
    const application = await User.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Aplikasi tidak ditemukan'
      });
    }

    if (application.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Aplikasi sudah diproses sebelumnya'
      });
    }

    // Update application status
    application.status = 'rejected';
    application.rejectionReason = reason || 'Tidak ada alasan spesifik';
    application.approvedBy = req.user.id;
    await application.save();

    // Log rejection activity
    await createActivityLog(
      req.user.id,
      'reject_application',
      `${req.user.nama} menolak pendaftaran ${application.nama}. Alasan: ${application.rejectionReason}`,
      application._id,
      { reason: application.rejectionReason }
    );

    // Send rejection email
    try {
      const emailTemplate = emailTemplates.rejected(application.nama, application.rejectionReason);
      await sendEmail({
        email: application.email,
        ...emailTemplate
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(200).json({
      success: true,
      message: 'Aplikasi berhasil ditolak dan email notifikasi telah dikirim'
    });

  } catch (error) {
    console.error('Reject application error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get application statistics
exports.getStats = async (req, res) => {
  try {
    const totalApplications = await User.countDocuments({ role: 'user' });
    const pendingApplications = await User.countDocuments({ role: 'user', status: 'pending' });
    const approvedApplications = await User.countDocuments({ role: 'user', status: 'approved' });
    const rejectedApplications = await User.countDocuments({ role: 'user', status: 'rejected' });

    // Get applications by faculty
    const facultyStats = await User.aggregate([
      { $match: { role: 'user' } },
      { $group: { _id: '$fakultas', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get user counts by role
    const roleStats = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          total: totalApplications,
          pending: pendingApplications,
          approved: approvedApplications,
          rejected: rejectedApplications
        },
        facultyStats,
        roleStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};