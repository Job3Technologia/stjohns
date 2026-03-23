const PatientProfile = require('../models/PatientProfile');
const Appointment = require('../models/Appointment');
const MedicalRecord = require('../models/MedicalRecord');
const Medication = require('../models/Medication');
const Delivery = require('../models/Delivery');
const { Feedback, Announcement } = require('../models/Extra');

// Patient Controllers
exports.getPatientProfile = async (req, res) => {
  try {
    const profile = await PatientProfile.findByUserId(req.user.id);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

exports.updatePatientProfile = async (req, res) => {
  try {
    await PatientProfile.update(req.user.id, req.body);
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

// Appointment Controllers
exports.createAppointment = async (req, res) => {
  try {
    const appointmentData = { ...req.body, patient_id: req.user.id };
    const result = await Appointment.create(appointmentData);
    res.status(201).json({ message: 'Appointment booked successfully', id: result.id });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error: error.message });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findByPatientId(req.user.id);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};

// Medical Record Controllers
exports.getMyMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.findByPatientId(req.user.id);
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records', error: error.message });
  }
};

// Medication & Delivery Controllers
exports.getMyMedications = async (req, res) => {
  try {
    const medications = await Medication.findByPatientId(req.user.id);
    res.json(medications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medications', error: error.message });
  }
};

exports.requestDelivery = async (req, res) => {
  try {
    const deliveryData = { ...req.body, patient_id: req.user.id };
    const result = await Delivery.create(deliveryData);
    res.status(201).json({ message: 'Delivery requested successfully', id: result.id });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting delivery', error: error.message });
  }
};

exports.getMyDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.findByPatientId(req.user.id);
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deliveries', error: error.message });
  }
};

// Extra Controllers
exports.submitFeedback = async (req, res) => {
  try {
    const feedbackData = { ...req.body, patient_id: req.user.id };
    const result = await Feedback.create(feedbackData);
    res.status(201).json({ message: 'Feedback submitted successfully', id: result.id });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error: error.message });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.getAllActive();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching announcements', error: error.message });
  }
};
