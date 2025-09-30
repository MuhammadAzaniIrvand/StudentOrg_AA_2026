const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nim: {
    type: String,
    required: [true, 'NIM wajib diisi'],
    unique: true,
    trim: true
  },
  nama: {
    type: String,
    required: [true, 'Nama lengkap wajib diisi'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email wajib diisi'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Format email tidak valid']
  },
  password: {
    type: String,
    required: [true, 'Password wajib diisi'],
    minlength: 6,
    select: false
  },
  fakultas: {
    type: String,
    required: [function() { return this.role === 'user'; }, 'Fakultas wajib dipilih'],
    enum: [
      'Fakultas Adab dan Humaniora',
      'Fakultas Dakwah dan Komunikasi', 
      'Fakultas Ekonomi dan Bisnis Islam',
      'Fakultas Ilmu Tarbiyah dan Keguruan',
      'Fakultas Psikologi',
      'Fakultas Sains dan Teknologi',
      'Fakultas Syariah dan Hukum',
      'Fakultas Ushuluddin'
    ]
  },
  jurusan: {
    type: String,
    required: [function() { return this.role === 'user'; }, 'Jurusan wajib diisi'],
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'psda'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  ktmFile: {
    type: String,
    required: [function() { return this.role === 'user'; }, 'File KTM wajib diupload']
  },
  berkasFile: {
    type: String,
    required: [function() { return this.role === 'user'; }, 'Berkas pendukung wajib diupload']
  },
  fotoProfile:{
    type: String,
    required:[function() { return this.role === 'user'; }, 'Foto profil wajib diupload'],
  },
  rejectionReason: {
    type: String,
    default: null
  },
  approvedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    default: null
  },
  approvedAt: {
    type: Date,
    default: null
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  otpCode: String,
  otpExpire: Date
}, {
  timestamps: true
});

// Encrypt password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);