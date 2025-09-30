const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (file.fieldname === 'ktm') {
      cb(null, 'uploads/ktm/');
    } else if (file.fieldname === 'berkas') {
      cb(null, 'uploads/berkas/');
    } else if (file.fieldname === 'foto') {
      cb(null, 'uploads/foto/');
    } else if (file.fieldname === 'poster') {
      cb(null, 'uploads/berkas/');
    }
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|pdf/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Hanya file gambar (JPEG, JPG, PNG) dan PDF yang diperbolehkan!');
  }
}

// Initialize upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000, // 5MB limit
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});

module.exports = upload;