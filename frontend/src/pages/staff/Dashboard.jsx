import React, { useState, useEffect } from 'react';
import { staffService } from '../../services/patientService';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatientsCount: 0,
    totalAppointmentsCount: 0,
    totalDeliveriesCount: 0,
    recentFeedback: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await staffService.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard stats', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">Loading analytics...</div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">St Mary's Clinic CRM Dashboard</h1>
        <p className="text-slate-500">Overview of clinic performance and patient activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
          <div className="bg-blue-100 p-4 rounded-xl text-primary text-2xl">👥</div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase">Total Patients</p>
            <p className="text-3xl font-extrabold text-slate-900">{stats.totalPatientsCount}</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
          <div className="bg-green-100 p-4 rounded-xl text-secondary text-2xl">📅</div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase">Total Bookings</p>
            <p className="text-3xl font-extrabold text-slate-900">{stats.totalAppointmentsCount}</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
          <div className="bg-orange-100 p-4 rounded-xl text-orange-500 text-2xl">🚚</div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase">Deliveries</p>
            <p className="text-3xl font-extrabold text-slate-900">{stats.totalDeliveriesCount}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Quick Actions */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Staff Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/staff/patients" className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl hover:bg-blue-50 hover:text-primary transition-all group">
              <span className="text-3xl mb-2">📋</span>
              <span className="font-bold">Manage Patients</span>
            </Link>
            <Link to="/staff/deliveries" className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl hover:bg-emerald-50 hover:text-secondary transition-all group">
              <span className="text-3xl mb-2">🚚</span>
              <span className="font-bold">Track Deliveries</span>
            </Link>
            <button className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl hover:bg-orange-50 hover:text-orange-500 transition-all group">
              <span className="text-3xl mb-2">📢</span>
              <span className="font-bold">Announcements</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl hover:bg-purple-50 hover:text-purple-500 transition-all group">
              <span className="text-3xl mb-2">📊</span>
              <span className="font-bold">Generate Reports</span>
            </button>
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Patient Feedback</h2>
          <div className="space-y-4">
            {stats.recentFeedback.map((fb) => (
              <div key={fb.id} className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-900 text-sm">{fb.patient_name || 'Anonymous'}</span>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}
                  </div>
                </div>
                <p className="text-sm text-slate-600 italic">"{fb.comment}"</p>
                <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest">{new Date(fb.created_at).toLocaleDateString()}</p>
              </div>
            ))}
            {stats.recentFeedback.length === 0 && (
              <p className="text-slate-500 text-center py-8 italic">No feedback received yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
