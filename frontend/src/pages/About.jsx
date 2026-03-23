import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">About St Mary's Clinic</h1>
        
        <div className="bg-white p-10 rounded-2xl shadow-md space-y-12">
          {/* Background */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <span>🏥</span> Our Heritage
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Located at the heart of Marianhill in Pinetown, St Mary's Clinic has been a beacon of hope and health for the local community for over two decades. 
              Our roots are deeply embedded in the mission of providing accessible, compassionate, and professional healthcare to all residents of South Africa.
            </p>
          </section>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2">Our Mission</h3>
              <p className="text-sm text-blue-800">To deliver high-quality primary healthcare through modern technology and compassionate service, ensuring every patient feels valued and cared for.</p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <h3 className="font-bold text-emerald-900 mb-2">Our Vision</h3>
              <p className="text-sm text-emerald-800">To be the leading digitally-integrated community clinic in KwaZulu-Natal, setting the standard for patient-centric care and operational excellence.</p>
            </div>
          </div>

          {/* Role in Community */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Role in Community Healthcare</h2>
            <p className="text-slate-600 leading-relaxed">
              Beyond just consultations, we serve as a vital link in the public health chain. We specialize in paediatric care, chronic disease management, and elderly support through our dedicated medication delivery programs.
            </p>
          </section>

          {/* CRM & Service Delivery */}
          <section className="bg-slate-900 text-white p-8 rounded-xl">
            <h2 className="text-xl font-bold mb-4 text-primary">Why Digital Transformation?</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              St Mary's Clinic has transitioned to a fully digital Patient Management System (CRM) to solve long-standing issues like lost paper files and slow service delivery. 
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Reduced Waiting Times</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Accurate Data Management</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Secure Medical Records</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Automated Patient Reminders</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
