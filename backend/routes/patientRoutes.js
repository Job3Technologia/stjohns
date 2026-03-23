const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Apply auth middleware to all patient routes
router.use(authMiddleware);

// Patient routes
router.get('/profile', roleMiddleware(['patient']), patientController.getPatientProfile);
router.put('/profile', roleMiddleware(['patient']), patientController.updatePatientProfile);

router.post('/appointments', roleMiddleware(['patient']), patientController.createAppointment);
router.get('/my-appointments', roleMiddleware(['patient']), patientController.getMyAppointments);

router.get('/my-records', roleMiddleware(['patient']), patientController.getMyMedicalRecords);
router.get('/my-medications', roleMiddleware(['patient']), patientController.getMyMedications);

router.post('/request-delivery', roleMiddleware(['patient']), patientController.requestDelivery);
router.get('/my-deliveries', roleMiddleware(['patient']), patientController.getMyDeliveries);

router.post('/feedback', roleMiddleware(['patient']), patientController.submitFeedback);
router.get('/announcements', patientController.getAnnouncements);

module.exports = router;
