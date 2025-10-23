const express = require('express');
const router = express.Router();
const { login, register, currentUser } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/whoami', protect, currentUser);

module.exports = router;
