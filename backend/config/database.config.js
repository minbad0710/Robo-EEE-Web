const mongoose = require('mongoose');

const connectDB =  async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // the API can't work without the database, so stop instead of running half-broken
  }
}

module.exports = connectDB;