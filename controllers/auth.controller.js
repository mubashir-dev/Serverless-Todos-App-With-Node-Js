const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { hashPassword, comparePassword } = require('../config/utils');

async function register(req, res) {
  const { email, name } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User exists' });

    const password = await hashPassword(req.body.password);
    user = new User({ email, name, password });
    await user.save();

    const payload = { userId: user._id };
    const token = jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { userId: user._id };
    const token = jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

async function currentUser(req, res) {
  try {
    const user = await User.findById(req.user.id).select(['-password', '-__v']);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  currentUser
}
