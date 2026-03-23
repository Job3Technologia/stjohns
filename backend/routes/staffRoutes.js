const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Apply auth middleware and staff role to all routes
router.use(authMiddleware);
router.use(roleMiddleware(['staff', 'admin']));

// Staff routes
router.get('/patients', staffController.getAllPatients);
router.post('/medical-records', staffController.addMedicalRecord);
router.post('/prescriptions', staffController.prescribeMedication);

router.put('/update-appointment-status', staffController.updateAppointmentStatus);
router.put('/update-delivery-status', staffController.updateDeliveryStatus);

router.post('/create-announcement', staffController.createAnnouncement);

// Dashboard (CRM Overview)
router.get('/dashboard-stats', staffController.getDashboardStats);

module.exports = router;
