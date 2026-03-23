import React, { useState, useEffect } from 'react';
import { patientService } from '../services/patientService';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const data = await patientService.getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">Loading announcements...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">Clinic Announcements</h1>
        
        <div className="space-y-8">
          {announcements.map((ann) => (
            <div key={ann.id} className={`bg-white p-8 rounded-2xl shadow-md border-l-8 ${ann.is_emergency ? 'border-red-600' : 'border-primary'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${ann.is_emergency ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-primary'}`}>
                    {ann.is_emergency ? 'Emergency' : 'General Update'}
                  </span>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{new Date(ann.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{ann.title}</h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">
                {ann.content}
              </p>
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button className="text-primary font-bold text-sm hover:underline">Read More →</button>
                <span className="text-xs text-slate-400 font-medium italic italic">Issued by: Clinic Management</span>
              </div>
            </div>
          ))}

          {announcements.length === 0 && (
            <div className="bg-white p-20 text-center rounded-2xl shadow-md border border-slate-100">
              <div className="text-6xl mb-6 opacity-30">📢</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No Active Announcements</h3>
              <p className="text-slate-500 max-w-sm mx-auto leading-relaxed italic">Check back later for clinic updates, health campaigns, and public notices.</p>
            </div>
          )}
        </div>

        {/* Health Campaigns Card */}
        <div className="mt-16 bg-gradient-to-br from-primary to-primary-dark text-white p-12 rounded-2xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-8xl opacity-10 group-hover:rotate-12 transition-transform">💉</div>
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-bold mb-4 italic italic">Join Our Vaccination Drive</h2>
            <p className="text-blue-100 text-lg mb-8">We are running a free seasonal flu vaccination program for elderly patients in the Marianhill area. Contact us to schedule your visit.</p>
            <button className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:bg-sky-50 shadow-lg transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
