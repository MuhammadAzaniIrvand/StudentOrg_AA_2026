const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Judul acara wajib diisi'],
    trim: true
  },
  category: {
    type: String,
    default: 'Workshop',
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    required: [true, 'Tanggal acara wajib diisi']
  },
  time: {
    type: String,
    default: ''
  },
  startTime: {
    type: String,
    default: ''
  },
  endTime: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    required: [true, 'Lokasi acara wajib diisi']
  },
  poster: {
    type: String,
    default: null
  },
  enableAttendance: {
    type: Boolean,
    default: true
  },
  attendance: [{
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    nim: String,
    nama: String,
    attendedAt: { type: Date, default: Date.now }
  }],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtuals
eventSchema.virtual('attendeeCount').get(function() {
  return Array.isArray(this.attendance) ? this.attendance.length : 0;
});

module.exports = mongoose.model('Event', eventSchema);


