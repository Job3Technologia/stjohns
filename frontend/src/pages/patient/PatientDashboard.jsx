import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { patientService } from '../../services/patientService';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appts, delivs] = await Promise.all([
          patientService.getMyAppointments(),
          patientService.getMyDeliveries()
        ]);
        setAppointments(appts.slice(0, 3));
        setDeliveries(delivs.slice(0, 3));
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8">Loading your health portal...</div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Patient Health Portal</h1>
        <p className="text-slate-500">Welcome back to St Mary's Clinic online services.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Link to="/patient/book" className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
          <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">📅</div>
          <h3 className="font-bold text-slate-900">Book Appointment</h3>
          <p className="text-xs text-slate-500 mt-1">Schedule a visit with our doctors.</p>
        </Link>
        <Link to="/patient/records" className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
          <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">📁</div>
          <h3 className="font-bold text-slate-900">Medical Records</h3>
          <p className="text-xs text-slate-500 mt-1">View your diagnoses & history.</p>
        </Link>
        <Link to="/patient/delivery" className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
          <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🚚</div>
          <h3 className="font-bold text-slate-900">Medication Delivery</h3>
          <p className="text-xs text-slate-500 mt-1">Request home delivery for meds.</p>
        </Link>
        <Link to="/patient/profile" className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
          <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">👤</div>
          <h3 className="font-bold text-slate-900">My Profile</h3>
          <p className="text-xs text-slate-500 mt-1">Update your medical aid & info.</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Appointments */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">Upcoming Appointments</h2>
            <Link to="/patient/book" className="text-primary text-xs font-bold uppercase hover:underline">New Booking</Link>
          </div>
          <div className="space-y-4">
            {appointments.map(appt => (
              <div key={appt.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900">{appt.doctor_type}</p>
                  <p className="text-xs text-slate-500">{new Date(appt.appointment_date).toLocaleDateString()} at {appt.appointment_time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                  appt.status === 'scheduled' ? 'bg-blue-100 text-primary' : 'bg-slate-100 text-slate-500'
                }`}>
                  {appt.status}
                </span>
              </div>
            ))}
            {appointments.length === 0 && <p className="text-center text-slate-400 py-8 italic">No upcoming appointments.</p>}
          </div>
        </div>

        {/* Recent Deliveries */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">Recent Deliveries</h2>
            <Link to="/patient/delivery" className="text-secondary text-xs font-bold uppercase hover:underline">Request Delivery</Link>
          </div>
          <div className="space-y-4">
            {deliveries.map(del => (
              <div key={del.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900">{del.medication_name}</p>
                  <p className="text-xs text-slate-500">📍 {del.delivery_address}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                  del.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {del.status}
                </span>
              </div>
            ))}
            {deliveries.length === 0 && <p className="text-center text-slate-400 py-8 italic">No active delivery requests.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
