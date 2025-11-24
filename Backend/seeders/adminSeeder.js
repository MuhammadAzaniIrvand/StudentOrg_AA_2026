const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load env vars
dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    // Check if admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (adminExists) {
      console.log('❌ Admin already exists!');
      console.log('Email:', adminExists.email);
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      nim: 'ADMIN001',
      nama: 'Administrator',
      email: 'admin@studentorg.com',
      password: 'admin123', // Will be hashed automatically by pre-save hook
      role: 'admin',
      status: 'approved',
      // Admin doesn't need these fields
      fakultas: undefined,
      jurusan: undefined,
      ktmFile: undefined,
      berkasFile: undefined,
      fotoProfile: undefined
    });

    console.log('✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Login Credentials:');
    console.log('Email:', admin.email);
    console.log('Password: admin123');
    console.log('Role:', admin.role);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

// Run seeder
seedAdmin();
