import React, { useState, useEffect } from 'react';
import { staffService } from '../../services/patientService';

const DeliveryManagement = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const data = await staffService.getDashboardStats();
      // For now, let's assume getDashboardStats includes recent deliveries
      // but let's create a specific getAllDeliveries if needed
      // Actually, I'll update staffService to have getAllDeliveries
    } catch (error) {
      console.error('Error fetching deliveries', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await staffService.updateDeliveryStatus(id, status);
      fetchDeliveries(); // Refresh list
    } catch (error) {
      console.error('Error updating delivery status', error);
    }
  };

  if (loading) return <div className="p-8">Loading delivery tasks...</div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Medication Delivery Management</h1>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 border-b">
            <tr>
              <th className="px-6 py-4 font-bold text-slate-700">Patient</th>
              <th className="px-6 py-4 font-bold text-slate-700">Medication</th>
              <th className="px-6 py-4 font-bold text-slate-700">Address</th>
              <th className="px-6 py-4 font-bold text-slate-700">Status</th>
              <th className="px-6 py-4 font-bold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {deliveries.map((delivery) => (
              <tr key={delivery.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-900">{delivery.patient_name}</td>
                <td className="px-6 py-4 text-sm text-slate-700">{delivery.medication_name}</td>
                <td className="px-6 py-4 text-sm text-slate-500 max-w-xs">{delivery.delivery_address}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    delivery.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                    delivery.status === 'Out for delivery' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {delivery.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select 
                    className="p-2 border rounded-md text-xs font-bold"
                    value={delivery.status}
                    onChange={(e) => handleStatusUpdate(delivery.id, e.target.value)}
                  >
                    <option value="Pending">Set Pending</option>
                    <option value="Out for delivery">Set Out for Delivery</option>
                    <option value="Delivered">Set Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {deliveries.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            <p className="text-4xl mb-4">🚚</p>
            <p>No medication delivery requests to manage.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryManagement;
