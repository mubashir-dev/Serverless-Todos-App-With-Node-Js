const mongoose = require('mongoose');
const env = require('./env');

let isConnected;

const connectDB = async () => {
  try {
    if (isConnected) {
      console.log('✅ Using existing DB connection');
      return;
    }

    console.log('🔌 Connecting to DB...');
    await mongoose.connect(env.mongoURI);

    isConnected = mongoose.connection.readyState;
  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1);
  }
};

module.exports = { connectDB };
