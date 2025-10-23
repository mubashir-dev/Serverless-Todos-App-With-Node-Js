const express = require('express');
const router = express.Router();
const { getHealthStatus } = require('../controllers/app.controller');

router.get('/health', getHealthStatus);

module.exports = router;
