import React, { useState, useEffect } from 'react';
import { patientService } from '../../services/patientService';

const MedicationDelivery = () => {
  const [medications, setMedications] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMed, setSelectedMed] = useState('');
  const [deliveryData, setDeliveryData] = useState({
    delivery_address: '',
    contact_number: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [meds, delivs] = await Promise.all([
        patientService.getMyMedications(),
        patientService.getMyDeliveries()
      ]);
      setMedications(meds);
      setDeliveries(delivs);
    } catch (error) {
      console.error('Error fetching delivery data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    if (!selectedMed) return setMessage('Please select a medication');
    
    try {
      await patientService.requestDelivery({
        medication_id: selectedMed,
        ...deliveryData
      });
      setMessage('Delivery requested successfully!');
      fetchData(); // Refresh list
      setSelectedMed('');
    } catch (error) {
      setMessage('Error requesting delivery');
    }
  };

  if (loading) return <div className="p-8">Loading delivery options...</div>;

  return (
    <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Request Section */}
      <div>
        <h1 className="text-3xl font-bold mb-8 text-slate-900">Request Medication Delivery</h1>
        <p className="text-slate-500 mb-8 italic">Dedicated service for our elderly and disabled patients at St Mary's.</p>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleRequest} className="bg-white p-8 rounded-xl shadow-md space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Select Prescribed Medication</label>
            <select 
              className="w-full p-3 border rounded-lg"
              value={selectedMed}
              onChange={(e) => setSelectedMed(e.target.value)}
              required
            >
              <option value="">-- Choose Medication --</option>
              {medications.map(med => (
                <option key={med.id} value={med.id}>
                  {med.medication_name} ({med.dosage}) - Prescribed on {new Date(med.prescribed_date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Delivery Address</label>
            <textarea 
              required
              className="w-full p-3 border rounded-lg h-24"
              placeholder="Enter full delivery address..."
              value={deliveryData.delivery_address}
              onChange={(e) => setDeliveryData({...deliveryData, delivery_address: e.target.value})}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Contact Number for Delivery</label>
            <input 
              type="text" 
              required
              className="w-full p-3 border rounded-lg"
              placeholder="e.g. 081 234 5678"
              value={deliveryData.contact_number}
              onChange={(e) => setDeliveryData({...deliveryData, contact_number: e.target.value})}
            />
          </div>

          <button type="submit" className="w-full bg-secondary hover:bg-emerald-600 text-white py-3 rounded-lg font-bold shadow-lg transition-colors">
            Request Home Delivery 🚚
          </button>
        </form>
      </div>

      {/* Tracking Section */}
      <div>
        <h2 className="text-2xl font-bold mb-8 text-slate-900">Delivery Tracking</h2>
        <div className="space-y-4">
          {deliveries.map(delivery => (
            <div key={delivery.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  delivery.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                  delivery.status === 'Out for delivery' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {delivery.status}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{delivery.medication_name}</h3>
              <p className="text-sm text-slate-600 mb-1">📍 {delivery.delivery_address}</p>
              <p className="text-xs text-slate-400">Requested on: {new Date(delivery.requested_at).toLocaleString()}</p>
              
              {/* Progress Bar Visual */}
              <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div className={`h-full ${delivery.status !== 'Pending' ? 'bg-secondary' : 'bg-slate-200'} w-1/3 border-r border-white`}></div>
                <div className={`h-full ${delivery.status === 'Out for delivery' || delivery.status === 'Delivered' ? 'bg-secondary' : 'bg-slate-200'} w-1/3 border-r border-white`}></div>
                <div className={`h-full ${delivery.status === 'Delivered' ? 'bg-secondary' : 'bg-slate-200'} w-1/3`}></div>
              </div>
              <div className="flex justify-between mt-1 text-[10px] font-bold text-slate-400 uppercase">
                <span>Pending</span>
                <span>In Transit</span>
                <span>Delivered</span>
              </div>
            </div>
          ))}

          {deliveries.length === 0 && (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-12 text-center rounded-xl">
              <p className="text-slate-400">No active delivery requests found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicationDelivery;
