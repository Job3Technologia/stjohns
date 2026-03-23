import api from './api';

export const patientService = {
  getProfile: async () => {
    const response = await api.get('/patients/profile');
    return response.data;
  },
  updateProfile: async (profileData) => {
    const response = await api.put('/patients/profile', profileData);
    return response.data;
  },
  getMyAppointments: async () => {
    const response = await api.get('/patients/my-appointments');
    return response.data;
  },
  bookAppointment: async (appointmentData) => {
    const response = await api.post('/patients/appointments', appointmentData);
    return response.data;
  },
  getMyRecords: async () => {
    const response = await api.get('/patients/my-records');
    return response.data;
  },
  getMyMedications: async () => {
    const response = await api.get('/patients/my-medications');
    return response.data;
  },
  requestDelivery: async (deliveryData) => {
    const response = await api.post('/patients/request-delivery', deliveryData);
    return response.data;
  },
  getMyDeliveries: async () => {
    const response = await api.get('/patients/my-deliveries');
    return response.data;
  },
  submitFeedback: async (feedbackData) => {
    const response = await api.post('/patients/feedback', feedbackData);
    return response.data;
  },
  getAnnouncements: async () => {
    const response = await api.get('/patients/announcements');
    return response.data;
  },
};

export const staffService = {
  getAllPatients: async () => {
    const response = await api.get('/staff/patients');
    return response.data;
  },
  getDashboardStats: async () => {
    const response = await api.get('/staff/dashboard-stats');
    return response.data;
  },
  addMedicalRecord: async (recordData) => {
    const response = await api.post('/staff/medical-records', recordData);
    return response.data;
  },
  prescribeMedication: async (medicationData) => {
    const response = await api.post('/staff/prescriptions', medicationData);
    return response.data;
  },
  updateAppointmentStatus: async (id, status) => {
    const response = await api.put('/staff/update-appointment-status', { id, status });
    return response.data;
  },
  updateDeliveryStatus: async (id, status) => {
    const response = await api.put('/staff/update-delivery-status', { id, status });
    return response.data;
  },
  createAnnouncement: async (announcementData) => {
    const response = await api.post('/staff/create-announcement', announcementData);
    return response.data;
  },
};
