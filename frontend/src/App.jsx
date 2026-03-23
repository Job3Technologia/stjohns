import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/patient/Profile';
import Booking from './pages/patient/Booking';
import MedicalHistory from './pages/patient/MedicalHistory';
import MedicationDelivery from './pages/patient/MedicationDelivery';
import PatientDashboard from './pages/patient/PatientDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Announcements from './pages/Announcements';
import Directions from './pages/Directions';
import Dashboard from './pages/staff/Dashboard';
import PatientList from './pages/staff/PatientList';
import AddMedicalRecord from './pages/staff/AddMedicalRecord';
import DeliveryManagement from './pages/staff/DeliveryManagement';
import Chatbot from './components/Chatbot';

// Simple PrivateRoute component
const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;

  return children;
};

const HomePage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="logo flex items-center gap-2">
            <span className="text-3xl">🏥</span>
            <span className="text-xl font-bold text-primary">St Mary's Clinic</span>
          </Link>
          <nav>
            <ul className="flex items-center gap-6 text-sm font-bold uppercase tracking-wider">
              <li><Link to="/" className="text-slate-600 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-slate-600 hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/announcements" className="text-slate-600 hover:text-primary transition-colors">Announcements</Link></li>
              <li><Link to="/contact" className="text-slate-600 hover:text-primary transition-colors">Contact</Link></li>
              {user ? (
                <>
                  <li>
                    <Link 
                      to={user.role === 'patient' ? '/patient/dashboard' : '/staff/dashboard'} 
                      className="text-slate-600 hover:text-primary font-medium"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={logout}
                      className="btn bg-slate-100 text-slate-700 hover:bg-slate-200 px-4 py-2 rounded-md font-semibold"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login" className="btn btn-primary px-6 py-2 rounded-md font-semibold text-white bg-primary hover:bg-primary-dark transition-colors">
                    Login / Register
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-to-br from-sky-50 to-blue-100 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Compassionate Care for <br /> <span className="text-primary">St Mary's Community</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Experience world-class healthcare at 1 Hospital Road, Marianhill. 
            From paediatric care to chronic medication delivery, we are here for you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/patient/book" className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg transition-all">
              Book Appointment
            </Link>
            <a href="#services" className="bg-white border-2 border-primary text-primary hover:bg-sky-50 px-8 py-3 rounded-lg font-bold text-lg transition-all">
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <div className="bg-white border-y border-slate-200 py-6">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full text-primary">📍</div>
            <div>
              <p className="font-bold text-slate-900">Our Location</p>
              <p className="text-sm text-slate-500">1 Hospital Rd, Marianhill, Pinetown</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-x border-slate-100 px-8">
            <div className="bg-green-100 p-3 rounded-full text-secondary">📞</div>
            <div>
              <p className="font-bold text-slate-900">Emergency Contact</p>
              <p className="text-sm text-slate-500">(555) 123-4567 (24/7)</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-full text-orange-500">⏰</div>
            <div>
              <p className="font-bold text-slate-900">Clinic Hours</p>
              <p className="text-sm text-slate-500">Mon - Fri: 08:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Core Services</h2>
          <p className="text-slate-500 mb-16 max-w-xl mx-auto">Modern healthcare solutions integrated with our advanced Patient CRM system for better service delivery.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 bg-slate-50 rounded-2xl hover:shadow-xl transition-shadow border border-slate-100 text-left">
              <div className="text-4xl mb-6">👶</div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Paediatrics</h3>
              <p className="text-slate-600">Specialized child healthcare and immunization programs.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-2xl hover:shadow-xl transition-shadow border border-slate-100 text-left">
              <div className="text-4xl mb-6">🩺</div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">GP Consultation</h3>
              <p className="text-slate-600">General medical checkups and primary health services.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-2xl hover:shadow-xl transition-shadow border border-slate-100 text-left">
              <div className="text-4xl mb-6">🚚</div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Meds Delivery</h3>
              <p className="text-slate-600">Home delivery of chronic medication for elderly patients.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-2xl hover:shadow-xl transition-shadow border border-slate-100 text-left">
              <div className="text-4xl mb-6">🤖</div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">24/7 Chatbot</h3>
              <p className="text-slate-600">Instant answers to FAQs and booking assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span>🏥</span> St Mary's Clinic
            </h4>
            <p className="text-slate-400 max-w-sm mb-8">
              Revolutionizing healthcare delivery through digital transformation and patient-centric CRM systems.
            </p>
            <div className="flex gap-4">
              <span className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">f</span>
              <span className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">t</span>
              <span className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">i</span>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-sm tracking-widest text-slate-500">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><Link to="/login" className="hover:text-white">Bookings</Link></li>
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-sm tracking-widest text-slate-500">Contact</h4>
            <p className="text-slate-400 mb-2">1 Hospital Road, Marianhill</p>
            <p className="text-slate-400 mb-2">Pinetown, 3605</p>
            <p className="text-slate-400 mb-2">South Africa</p>
            <p className="text-primary mt-4 font-bold">info@stmarysclinic.com</p>
          </div>
        </div>
        <div className="container mx-auto px-4 border-t border-slate-800 mt-16 pt-8 text-center text-slate-500 text-sm">
          &copy; 2026 St Mary's Clinic CRM System. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Chatbot />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/directions" element={<Directions />} />
          <Route 
            path="/patient/dashboard" 
            element={
              <PrivateRoute roles={['patient']}>
                <PatientDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/patient/profile" 
            element={
              <PrivateRoute roles={['patient']}>
                <Profile />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/patient/book" 
            element={
              <PrivateRoute roles={['patient']}>
                <Booking />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/patient/records" 
            element={
              <PrivateRoute roles={['patient']}>
                <MedicalHistory />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/patient/delivery" 
            element={
              <PrivateRoute roles={['patient']}>
                <MedicationDelivery />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/staff/dashboard" 
            element={
              <PrivateRoute roles={['staff', 'admin']}>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/staff/patients" 
            element={
              <PrivateRoute roles={['staff', 'admin']}>
                <PatientList />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/staff/deliveries" 
            element={
              <PrivateRoute roles={['staff', 'admin']}>
                <DeliveryManagement />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/staff/add-record/:patientId" 
            element={
              <PrivateRoute roles={['staff', 'admin']}>
                <AddMedicalRecord />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
