const express = require('express');
const {
    getPatients,
    addPatient,
    getPatientInfo,
    getPatientInfoById,
    addPatientInfo
} = require('../controllers/patientController');


const router = express.Router();

router.get('/', getPatients);
router.post('/', addPatient);



router.get('/patient-info', getPatientInfo); // Get all patient info
router.get('/patient-info/:patientlist_id', getPatientInfoById); // Get patient info by patientlist_id
router.post('/patient-info', addPatientInfo); // Add patient info
router.get('/:patientId', getPatientById);

module.exports = router;

<<<<<<< HEAD
=======


>>>>>>> 087bad4e (test)
