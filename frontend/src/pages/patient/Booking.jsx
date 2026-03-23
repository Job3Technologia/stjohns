import React, { useState } from 'react';
import { patientService } from '../../services/patientService';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const [formData, setFormData] = useState({
    doctor_type: '',
    appointment_date: '',
    appointment_time: '',
    notes: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const doctorTypes = [
    'General Practitioner',
    'Paediatrician',
    'Nurse',
    'Specialist',
    'Emergency Care'
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await patientService.bookAppointment(formData);
      setMessage('Appointment booked successfully!');
      setTimeout(() => navigate('/patient/dashboard'), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error booking appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-900">Book an Appointment</h1>
      
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Select Healthcare Provider</label>
          <select 
            name="doctor_type" 
            required 
            value={formData.doctor_type} 
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-primary focus:border-primary"
          >
            <option value="">-- Choose a Provider --</option>
            {doctorTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Select Date</label>
            <input 
              type="date" 
              name="appointment_date" 
              required 
              min={new Date().toISOString().split('T')[0]}
              value={formData.appointment_date} 
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Select Time</label>
            <select 
              name="appointment_time" 
              required 
              value={formData.appointment_time} 
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-primary focus:border-primary"
            >
              <option value="">-- Select a Time --</option>
              {timeSlots.map(time => <option key={time} value={time}>{time}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes / Symptoms</label>
          <textarea 
            name="notes" 
            value={formData.notes} 
            onChange={handleChange}
            className="w-full p-3 border rounded-lg h-32 focus:ring-primary focus:border-primary"
            placeholder="Briefly describe your symptoms or any specific requirements..."
          ></textarea>
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
              loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark shadow-lg'
            }`}
          >
            {loading ? 'Processing...' : 'Confirm Booking'}
          </button>
        </div>
      </form>

      <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
          <span>ℹ️</span> Booking Information
        </h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• Appointments can be booked up to 30 days in advance.</li>
          <li>• Please arrive 15 minutes before your scheduled time.</li>
          <li>• Cancellation must be done at least 24 hours in advance.</li>
          <li>• Emergency cases are handled on priority basis at the clinic.</li>
        </ul>
      </div>
    </div>
  );
};

export default Booking;
