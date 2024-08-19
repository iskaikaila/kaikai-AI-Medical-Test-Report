const express = require('express');
const {
    getPatients,
    addPatient,
    getPatientInfo,
    getPatientInfoById,
    addPatientInfo,
    getPatientById,
    getPatientFiles, // Ensure this is imported correctly
    addPatientFile
} = require('../controllers/patientController');


// const {
//     getPatientFiles, // Ensure this is imported correctly
//     addPatientFile
// } = require('../controllers/patientFilesController');

const router = express.Router();

router.get('/', getPatients);
router.post('/', addPatient);



router.get('/patient-info', getPatientInfo); // Get all patient info
router.get('/patient-info/:patientlist_id', getPatientInfoById); // Get patient info by patientlist_id
router.post('/patient-info', addPatientInfo); // Add patient info


// Ensure the GET route is set up correctly
router.get('/files', getPatientFiles);

// Ensure the POST route is set up correctly
router.post('/files', addPatientFile);



router.get('/:patientId', getPatientById);
module.exports = router;

