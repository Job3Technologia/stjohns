import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { staffService } from '../../services/patientService';

const AddMedicalRecord = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [formData, setFormData] = useState({
    diagnosis: '',
    treatment_plan: '',
    notes: '',
  });
  const [medication, setMedication] = useState({
    medication_name: '',
    dosage: '',
    frequency: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patients = await staffService.getAllPatients();
        const p = patients.find(p => String(p.user_id) === String(patientId));
        setPatient(p);
      } catch (error) {
        console.error('Error fetching patient info', error);
      }
    };
    fetchPatient();
  }, [patientId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMedChange = (e) => {
    setMedication({ ...medication, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // 1. Add Medical Record
      const recordResponse = await staffService.addMedicalRecord({
        patient_id: patientId,
        ...formData
      });

      // 2. If medication is provided, add prescription
      if (medication.medication_name) {
        await staffService.prescribeMedication({
          patient_id: patientId,
          record_id: recordResponse.id,
          ...medication
        });
      }

      setMessage('Medical record and prescription added successfully!');
      setTimeout(() => navigate('/staff/patients'), 2000);
    } catch (error) {
      setMessage('Error adding medical record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-900">Add Medical Record</h1>
      
      {patient && patient.allergies && (
        <div className="mb-8 bg-red-600 text-white p-6 rounded-xl shadow-xl animate-pulse flex items-center gap-6">
          <div className="text-5xl">⚠️</div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-widest">Critical Allergy Alert</h2>
            <p className="text-lg font-bold">Patient is allergic to: {patient.allergies}</p>
          </div>
        </div>
      )}

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Diagnosis Section */}
        <section className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-6 text-primary border-b pb-2">Diagnosis & Treatment</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Diagnosis</label>
              <textarea 
                name="diagnosis" 
                required 
                value={formData.diagnosis} 
                onChange={handleChange}
                className="w-full p-3 border rounded-lg h-24 focus:ring-primary focus:border-primary"
                placeholder="Enter patient diagnosis..."
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Treatment Plan</label>
              <textarea 
                name="treatment_plan" 
                required 
                value={formData.treatment_plan} 
                onChange={handleChange}
                className="w-full p-3 border rounded-lg h-24 focus:ring-primary focus:border-primary"
                placeholder="Describe the treatment plan..."
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Clinical Notes</label>
              <textarea 
                name="notes" 
                value={formData.notes} 
                onChange={handleChange}
                className="w-full p-3 border rounded-lg h-24 focus:ring-primary focus:border-primary"
                placeholder="Additional observations..."
              ></textarea>
            </div>
          </div>
        </section>

        {/* Prescription Section */}
        <section className="bg-white p-8 rounded-xl shadow-md border-l-4 border-secondary">
          <h2 className="text-xl font-semibold mb-6 text-secondary border-b pb-2">Prescription (Optional)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Medication Name</label>
              <input 
                type="text" 
                name="medication_name" 
                value={medication.medication_name} 
                onChange={handleMedChange}
                className="w-full p-3 border rounded-lg focus:ring-secondary focus:border-secondary"
                placeholder="e.g. Paracetamol"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Dosage</label>
              <input 
                type="text" 
                name="dosage" 
                value={medication.dosage} 
                onChange={handleMedChange}
                className="w-full p-3 border rounded-lg focus:ring-secondary focus:border-secondary"
                placeholder="e.g. 500mg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Frequency</label>
              <input 
                type="text" 
                name="frequency" 
                value={medication.frequency} 
                onChange={handleMedChange}
                className="w-full p-3 border rounded-lg focus:ring-secondary focus:border-secondary"
                placeholder="e.g. Twice daily"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <button 
            type="button" 
            onClick={() => navigate('/staff/patients')}
            className="px-6 py-3 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className={`px-8 py-3 rounded-lg font-bold text-white shadow-lg ${
              loading ? 'bg-slate-400' : 'bg-primary hover:bg-primary-dark'
            }`}
          >
            {loading ? 'Saving...' : 'Save Medical Record'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMedicalRecord;
