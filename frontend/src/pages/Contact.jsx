import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">Contact St Mary's Clinic</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-md space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-6">Our Location & Hours</h2>
              <div className="flex items-start gap-4">
                <div className="text-2xl text-primary">📍</div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 text-sm uppercase">Clinic Address</h3>
                  <p className="text-slate-600">1 Hospital Road, Marianhill</p>
                  <p className="text-slate-600">Pinetown, 3605</p>
                  <p className="text-slate-600">South Africa</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl text-primary">📞</div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 text-sm uppercase">Phone Numbers</h3>
                  <p className="text-slate-600">General Enquiries: (555) 123-4567</p>
                  <p className="text-red-600 font-bold">Emergency Hotline: (555) 911-0000 (24/7)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl text-primary">✉️</div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 text-sm uppercase">Email</h3>
                  <p className="text-slate-600">info@stmarysclinic.com</p>
                  <p className="text-slate-600">bookings@stmarysclinic.com</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-slate-200 h-64 rounded-2xl flex items-center justify-center text-slate-500 font-bold relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-100 flex items-center justify-center text-center p-8">
                <div>
                  <div className="text-4xl mb-4">🗺️</div>
                  <p className="text-blue-900">Map View: St Mary's Clinic</p>
                  <p className="text-xs text-blue-700 mt-2 italic">1 Hospital Road, Marianhill, Pinetown 3605</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your Full Name</label>
                  <input type="text" className="w-full p-3 border rounded-lg focus:ring-primary focus:border-primary" placeholder="Enter your name..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input type="email" className="w-full p-3 border rounded-lg focus:ring-primary focus:border-primary" placeholder="e.g. john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                <select className="w-full p-3 border rounded-lg focus:ring-primary focus:border-primary">
                  <option>General Enquiry</option>
                  <option>Appointment Inquiry</option>
                  <option>Medication Delivery Query</option>
                  <option>Feedback / Suggestion</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Your Message</label>
                <textarea className="w-full p-3 border rounded-lg h-40 focus:ring-primary focus:border-primary" placeholder="How can we help you today?"></textarea>
              </div>
              <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all">
                Submit Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
