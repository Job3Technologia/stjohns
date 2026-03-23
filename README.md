# St Mary’s Clinic CRM & Healthcare Platform

A comprehensive full-stack Patient Management System (CRM) and Healthcare Service Platform designed for **St Mary’s Clinic** at 1 Hospital Road, Marianhill, South Africa.

## 🚀 Features

### 🌐 Patient Portal
- **Dashboard**: Overview of upcoming appointments and delivery tracking.
- **Booking System**: Schedule appointments with GP, Paediatrician, or Nurses (includes double-booking prevention).
- **Electronic Medical Records (EMR)**: Securely view personal visit history, diagnoses, and prescriptions.
- **Medication Delivery**: Request home delivery for chronic meds (ideal for elderly/disabled patients).
- **Medical Aid Integration**: Check coverage and fund status directly from the profile.
- **Clinic Assistant**: 24/7 Chatbot for instant answers to FAQs.

### 📋 Staff CRM Dashboard
- **Patient Database**: Searchable records of all clinic patients.
- **EMR Management**: Add new medical records and prescriptions digitally.
- **Critical Allergy Alerts**: Visual warnings to ensure patient safety during treatment.
- **Delivery Management**: Track and update medication delivery statuses.
- **Analytics**: Overview of total patients, bookings, and patient satisfaction ratings.

### 🏢 Clinic Information
- **About Us**: Clinic heritage, mission, and vision.
- **Contact**: Location details, emergency hotlines, and map integration.
- **Announcements**: Broadcaster for health campaigns and public notices.
- **Internal Directions**: Guide for navigating clinic departments (Reception, Lab, Dispensary).

## 🛠️ Tech Stack
- **Frontend**: React, React Router, Axios, Tailwind CSS.
- **Backend**: Node.js, Express, JWT, BcryptJS.
- **Database**: SQLite (Relational, Normalized).
- **Architecture**: MVC (Model-View-Controller) pattern.

## ⚙️ Setup Instructions

### Prerequisites
- Node.js installed.
- Python (for initial database creation).

### 1. Database Initialization
```bash
cd database
python init_db.py
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
*Note: Ensure `.env` is configured (defaults provided in project).*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🧠 Problem-Solution Integration
- **Problem**: Lost paper files & slow retrieval. **Solution**: Digital EMR & Searchable Database.
- **Problem**: Double bookings & wait times. **Solution**: Automated Booking & Scheduling Logic.
- **Problem**: Accessibility for elderly. **Solution**: Medication Delivery & Status Tracking.
- **Problem**: Medical errors. **Solution**: High-visibility Allergy Alert System.

---
© 2026 St Mary's Clinic CRM System. All rights reserved.
