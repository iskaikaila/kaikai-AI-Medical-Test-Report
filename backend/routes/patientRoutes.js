const express = require('express');
const { getPatients, addPatient } = require('../controllers/patientController');

const router = express.Router();

router.get('/', getPatients);
router.post('/', addPatient);

module.exports = router;
