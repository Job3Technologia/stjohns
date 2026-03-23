import React, { useState, useEffect } from 'react';
import { staffService } from '../../services/patientService';
import { useNavigate } from 'react-router-dom';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await staffService.getAllPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(p => 
    p.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.phone_number && p.phone_number.includes(searchTerm))
  );

  if (loading) return <div className="p-8">Loading patient data...</div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Patient CRM Database</h1>
        <div className="relative w-1/3">
          <input 
            type="text" 
            placeholder="Search patients by name, email, or phone..." 
            className="w-full p-3 border rounded-lg pl-10 focus:ring-primary focus:border-primary shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-3.5 text-slate-400">🔍</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 border-b">
            <tr>
              <th className="px-6 py-4 font-bold text-slate-700">Patient Name</th>
              <th className="px-6 py-4 font-bold text-slate-700">Contact</th>
              <th className="px-6 py-4 font-bold text-slate-700">Medical Aid Status</th>
              <th className="px-6 py-4 font-bold text-slate-700">Allergies</th>
              <th className="px-6 py-4 font-bold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-900">{patient.full_name}</div>
                  <div className="text-xs text-slate-500">UID: {patient.user_id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-700">{patient.email}</div>
                  <div className="text-sm text-slate-500">{patient.phone_number || 'No phone'}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    patient.medical_aid_status === 'Approved' ? 'bg-green-100 text-green-700' : 
                    patient.medical_aid_status === 'Not Approved' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {patient.medical_aid_status || 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-red-600 font-medium">
                  {patient.allergies || 'None'}
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => navigate(`/staff/add-record/${patient.user_id}`)}
                    className="text-primary hover:text-primary-dark font-semibold mr-4"
                  >
                    Add Record
                  </button>
                  <button className="text-slate-600 hover:text-slate-900 font-semibold">View History</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPatients.length === 0 && (
          <div className="p-8 text-center text-slate-500">No patients found.</div>
        )}
      </div>
    </div>
  );
};

export default PatientList;
