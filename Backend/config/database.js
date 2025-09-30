const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    console.log('Warning: MongoDB not available. Server will start but database features will not work.');
    console.log('To enable database features, please set up MongoDB Atlas or local MongoDB.');
    // Don't exit the process - let the server start without database for demonstration
  }
};

module.exports = connectDB;