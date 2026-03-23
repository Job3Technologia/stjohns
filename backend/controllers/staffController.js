const PatientProfile = require('../models/PatientProfile');
const Appointment = require('../models/Appointment');
const MedicalRecord = require('../models/MedicalRecord');
const Medication = require('../models/Medication');
const Delivery = require('../models/Delivery');
const { Feedback, Announcement } = require('../models/Extra');

// Staff Controllers (Manage patients, records, etc.)
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await PatientProfile.getAll();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};

exports.addMedicalRecord = async (req, res) => {
  try {
    const recordData = { ...req.body, staff_id: req.user.id };
    const result = await MedicalRecord.create(recordData);
    res.status(201).json({ message: 'Medical record added successfully', id: result.id });
  } catch (error) {
    res.status(500).json({ message: 'Error adding medical record', error: error.message });
  }
};

exports.prescribeMedication = async (req, res) => {
  try {
    const result = await Medication.create(req.body);
    res.status(201).json({ message: 'Medication prescribed successfully', id: result.id });
  } catch (error) {
    res.status(500).json({ message: 'Error prescribing medication', error: error.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    await Appointment.updateStatus(id, status);
    res.json({ message: 'Appointment status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment status', error: error.message });
  }
};

exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    await Delivery.updateStatus(id, status);
    res.json({ message: 'Delivery status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating delivery status', error: error.message });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const result = await Announcement.create(req.body);
    res.status(201).json({ message: 'Announcement created successfully', id: result.id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating announcement', error: error.message });
  }
};

// CRM Dashboard (Analytics)
exports.getDashboardStats = async (req, res) => {
  try {
    const totalPatients = await PatientProfile.getAll();
    const totalAppointments = await Appointment.getAll();
    const totalDeliveries = await Delivery.getAll();
    const feedbacks = await Feedback.getAll();

    res.json({
      totalPatientsCount: totalPatients.length,
      totalAppointmentsCount: totalAppointments.length,
      totalDeliveriesCount: totalDeliveries.length,
      recentFeedback: feedbacks.slice(0, 5)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};
