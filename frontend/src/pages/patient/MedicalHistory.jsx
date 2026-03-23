import React, { useState, useEffect } from 'react';
import { patientService } from '../../services/patientService';

const MedicalHistory = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const data = await patientService.getMyRecords();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">Loading medical history...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-900">My Medical History</h1>
      
      <div className="space-y-6">
        {records.map((record) => (
          <div key={record.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-primary">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Visit Date</span>
                <p className="text-lg font-semibold text-slate-900">
                  {new Date(record.visit_date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Attending Staff</span>
                <p className="text-slate-900 font-medium">{record.staff_name}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div>
                <h3 className="text-sm font-bold text-primary uppercase mb-2">Diagnosis</h3>
                <p className="text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
                  "{record.diagnosis}"
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-primary uppercase mb-2">Treatment Plan</h3>
                <p className="text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {record.treatment_plan}
                </p>
              </div>
            </div>

            {record.notes && (
              <div className="mt-6 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-500 uppercase mb-2">Clinical Notes</h3>
                <p className="text-slate-600 text-sm">{record.notes}</p>
              </div>
            )}
          </div>
        ))}

        {records.length === 0 && (
          <div className="bg-white p-12 text-center rounded-xl shadow-md border border-slate-100">
            <div className="text-4xl mb-4 text-slate-300">📁</div>
            <p className="text-slate-500 font-medium">No medical records found in your history.</p>
            <p className="text-sm text-slate-400 mt-2">Visit records will appear here after your consultations.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;
