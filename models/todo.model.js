const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'completed', 'archive'],
    default: 'pending',
    required: true
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Todo', TodoSchema);
