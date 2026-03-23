import React, { useState, useEffect } from 'react';
import { patientService } from '../../services/patientService';

const Profile = () => {
  const [profile, setProfile] = useState({
    date_of_birth: '',
    gender: '',
    phone_number: '',
    address: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    allergies: '',
    medical_aid_provider: '',
    medical_aid_number: '',
    medical_history: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const validateMedicalAid = async () => {
    if (!profile.medical_aid_provider || !profile.medical_aid_number) {
      return setMessage('Please provide medical aid details first.');
    }
    setValidating(true);
    setTimeout(async () => {
      const status = Math.random() > 0.3 ? 'Approved' : 'Not Approved';
      const updatedProfile = { ...profile, medical_aid_status: status };
      setProfile(updatedProfile);
      await patientService.updateProfile(updatedProfile);
      setValidating(false);
      setMessage(`Medical Aid Status: ${status}`);
    }, 2000);
  };

  const fetchProfile = async () => {
    try {
      const data = await patientService.getProfile();
      if (data) setProfile(data);
    } catch (error) {
      console.error('Error fetching profile', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await patientService.updateProfile(profile);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile', error);
      setMessage('Error updating profile');
    }
  };

  if (loading) return <div className="p-8">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-900">My Patient Profile</h1>
      
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md space-y-8">
        {/* Personal Info */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-primary border-b pb-2">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
              <input type="date" name="date_of_birth" value={profile.date_of_birth || ''} onChange={handleChange} className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
              <select name="gender" value={profile.gender || ''} onChange={handleChange} className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <input type="text" name="phone_number" value={profile.phone_number || ''} onChange={handleChange} className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
              <input type="text" name="address" value={profile.address || ''} onChange={handleChange} className="w-full p-2 border rounded-md" />
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-primary border-b pb-2">Emergency Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Name</label>
              <input type="text" name="emergency_contact_name" value={profile.emergency_contact_name || ''} onChange={handleChange} className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Phone</label>
              <input type="text" name="emergency_contact_phone" value={profile.emergency_contact_phone || ''} onChange={handleChange} className="w-full p-2 border rounded-md" />
            </div>
          </div>
        </section>

        {/* Medical Info */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-primary border-b pb-2">Medical & Insurance</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Medical Aid Provider</label>
                <input type="text" name="medical_aid_provider" value={profile.medical_aid_provider || ''} onChange={handleChange} className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Medical Aid Number</label>
                <div className="flex gap-2">
                  <input type="text" name="medical_aid_number" value={profile.medical_aid_number || ''} onChange={handleChange} className="flex-1 p-2 border rounded-md" />
                  <button 
                    type="button" 
                    onClick={validateMedicalAid}
                    disabled={validating}
                    className={`px-4 py-2 rounded-md font-bold text-white text-xs ${validating ? 'bg-slate-400' : 'bg-secondary hover:bg-emerald-600'}`}
                  >
                    {validating ? 'Checking...' : 'Check Funds'}
                  </button>
                </div>
                {profile.medical_aid_status && (
                  <p className={`text-xs font-bold mt-1 ${profile.medical_aid_status === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>
                    Status: {profile.medical_aid_status}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1 font-bold">⚠️ Allergies</label>
              <textarea name="allergies" value={profile.allergies || ''} onChange={handleChange} className="w-full p-2 border rounded-md h-20" placeholder="List any allergies (e.g. Penicillin, Peanuts)"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Medical History</label>
              <textarea name="medical_history" value={profile.medical_history || ''} onChange={handleChange} className="w-full p-2 border rounded-md h-32" placeholder="Previous surgeries, chronic conditions, etc."></textarea>
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button type="submit" className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-bold transition-colors">
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
