const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../config/multer');
const Event = require('../models/Event');
const {
  getPendingApplications,
  getAllApplications,
  getApplicationDetails,
  approveApplication,
  rejectApplication,
  getStats,
} = require('../controllers/adminController');

const router = express.Router();

// Public endpoints: list and get events (no auth)
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json({ success: true, data: { events } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event tidak ditemukan' });
    res.json({ success: true, data: { event } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Authenticated user endpoints (no role restriction)
router.post('/events/:id/rsvp', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event tidak ditemukan' });

    const already = event.attendance.find(a => String(a.user) === String(req.user._id));
    if (already) {
      return res.status(400).json({ success: false, message: 'Anda sudah terdaftar pada event ini' });
    }

    event.attendance.push({ user: req.user._id, nim: req.user.nim, nama: req.user.nama });
    await event.save();

    res.json({ success: true, message: 'Pendaftaran event berhasil' });
  } catch (error) {
    console.error('RSVP event error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Protect and authorize PSDA only for management endpoints
router.use(protect);
router.use(authorize('psda'));

// PSDA controls applications approval/review
router.get('/applications/pending', getPendingApplications);
router.get('/applications', getAllApplications);
router.get('/applications/:id', getApplicationDetails);
router.put('/applications/:id/approve', approveApplication);
router.put('/applications/:id/reject', rejectApplication);

// Create event
router.post('/events', upload.single('poster'), async (req, res) => {
  try {
    const { title, description, date, time, startTime, endTime, location, enableAttendance, category } = req.body;
    const event = await Event.create({
      title,
      description,
      date,
      time,
      startTime,
      endTime,
      location,
      category,
      poster: req.file ? req.file.filename : null,
      enableAttendance: enableAttendance !== 'false',
      createdBy: req.user._id
    });
    res.status(201).json({ success: true, data: { event } });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// (list/get moved to public section above)

// Update event
router.put('/events/:id', upload.single('poster'), async (req, res) => {
  try {
    const { title, description, date, time, startTime, endTime, location, enableAttendance, category } = req.body;
    const update = { title, description, date, time, startTime, endTime, location, category };
    if (typeof enableAttendance !== 'undefined') update.enableAttendance = enableAttendance !== 'false';
    if (req.file) update.poster = req.file.filename;

    const event = await Event.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!event) return res.status(404).json({ success: false, message: 'Event tidak ditemukan' });
    res.json({ success: true, data: { event } });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete event
router.delete('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event tidak ditemukan' });
    res.json({ success: true, message: 'Event dihapus' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;


