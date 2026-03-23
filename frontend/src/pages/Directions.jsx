import React from 'react';

const Directions = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Internal Clinic Directions</h1>
        <p className="text-slate-500 mb-12 max-w-2xl mx-auto">Helping you navigate St Mary's Clinic with ease. Find your way to our various departments below.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-primary group hover:shadow-xl transition-all">
            <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">🏢</div>
            <h3 className="text-xl font-bold mb-2 text-slate-900">Reception & Triage</h3>
            <p className="text-slate-600 text-sm">Main Entrance, Ground Floor. Check-in here for all appointments.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-secondary group hover:shadow-xl transition-all">
            <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">🩺</div>
            <h3 className="text-xl font-bold mb-2 text-slate-900">Consultation Rooms</h3>
            <p className="text-slate-600 text-sm">Follow the Blue Line from Reception. Rooms 1-12 on the 1st Floor.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-orange-500 group hover:shadow-xl transition-all">
            <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">💊</div>
            <h3 className="text-xl font-bold mb-2 text-slate-900">Dispensary / Pharmacy</h3>
            <p className="text-slate-600 text-sm">Ground Floor, Wing B. Next to the main exit for easy medication pickup.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-red-500 group hover:shadow-xl transition-all">
            <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">🧪</div>
            <h3 className="text-xl font-bold mb-2 text-slate-900">Diagnostic Lab</h3>
            <p className="text-slate-600 text-sm">Basement Level. Accessible via the main elevator.</p>
          </div>
        </div>

        {/* Map Placeholder Card */}
        <div className="bg-white p-12 rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2 italic">Simplified Clinic Layout</h2>
            <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">Floor Plan Overview</p>
          </div>
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 h-96 rounded-2xl flex items-center justify-center p-12 group">
            <div className="text-center">
              <div className="text-6xl mb-6 opacity-20 group-hover:opacity-100 transition-opacity">🗺️</div>
              <p className="text-slate-300 font-bold text-lg group-hover:text-primary transition-colors italic">3D Internal Map Coming Soon...</p>
              <p className="text-xs text-slate-300 mt-2 max-w-xs mx-auto italic">We are currently mapping the new facility extensions at St Mary's Clinic.</p>
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-12 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <span className="flex items-center gap-2"><span className="w-3 h-3 bg-primary rounded-full"></span> 1st Floor</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 bg-secondary rounded-full"></span> Ground Floor</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 bg-red-500 rounded-full"></span> Basement</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directions;
