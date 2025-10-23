const bcrypt = require('bcryptjs');


async function hashPassword(password) {
  try {
    return bcrypt.hash(password, 10);
  } catch (err) {
    console.error('Password hashing failed', err);
  }
};

async function comparePassword(password, hash) {
  try {
    return bcrypt.compare(password, hash);
  } catch (err) {
    console.error('Password Compare hashing failed', err);
    process.exit(1);
  }
};

module.exports = { hashPassword, comparePassword };