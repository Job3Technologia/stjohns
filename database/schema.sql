-- St Mary's Clinic CRM - Database Schema (SQLite)

-- 1. Users Table (Authentication & Roles)
CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('admin', 'staff', 'patient')) DEFAULT 'patient',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. PatientProfiles Table (Personal & Medical Info)
CREATE TABLE IF NOT EXISTS PatientProfiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date_of_birth DATE,
    gender TEXT,
    phone_number TEXT,
    address TEXT,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    allergies TEXT,
    medical_aid_provider TEXT,
    medical_aid_number TEXT,
    medical_aid_status TEXT DEFAULT 'Pending', -- Approved, Not Approved, Pending
    medical_history TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- 3. Appointments Table
CREATE TABLE IF NOT EXISTS Appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    doctor_type TEXT NOT NULL, -- Paediatrician, GP, etc.
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status TEXT CHECK(status IN ('scheduled', 'completed', 'cancelled')) DEFAULT 'scheduled',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- 4. MedicalRecords Table (EMR)
CREATE TABLE IF NOT EXISTS MedicalRecords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    staff_id INTEGER NOT NULL,
    visit_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    diagnosis TEXT,
    treatment_plan TEXT,
    notes TEXT,
    FOREIGN KEY (patient_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (staff_id) REFERENCES Users(id) ON DELETE SET NULL
);

-- 5. Medications Table (Prescriptions)
CREATE TABLE IF NOT EXISTS Medications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    record_id INTEGER,
    patient_id INTEGER NOT NULL,
    medication_name TEXT NOT NULL,
    dosage TEXT,
    frequency TEXT,
    prescribed_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (record_id) REFERENCES MedicalRecords(id) ON DELETE SET NULL,
    FOREIGN KEY (patient_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- 6. Deliveries Table (Medication Delivery)
CREATE TABLE IF NOT EXISTS Deliveries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    medication_id INTEGER NOT NULL,
    delivery_address TEXT NOT NULL,
    contact_number TEXT NOT NULL,
    status TEXT CHECK(status IN ('Pending', 'Out for delivery', 'Delivered')) DEFAULT 'Pending',
    requested_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    delivered_at DATETIME,
    FOREIGN KEY (patient_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (medication_id) REFERENCES Medications(id) ON DELETE CASCADE
);

-- 7. Feedback Table
CREATE TABLE IF NOT EXISTS Feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    rating INTEGER CHECK(rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES Users(id) ON DELETE SET NULL
);

-- 8. Announcements Table
CREATE TABLE IF NOT EXISTS Announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_emergency BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME
);
