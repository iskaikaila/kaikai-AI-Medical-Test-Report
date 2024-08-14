const express = require('express');
const { createReport, getReports } = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createReport);
router.get('/', authMiddleware, getReports);

module.exports = router;
