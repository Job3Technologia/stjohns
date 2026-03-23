const BaseModel = require('./BaseModel');

class Appointment extends BaseModel {
  static async create(appointmentData) {
    const { patient_id, doctor_type, appointment_date, appointment_time, notes } = appointmentData;
    
    // Check for double booking
    const existing = await this.get(
      'SELECT id FROM Appointments WHERE doctor_type = ? AND appointment_date = ? AND appointment_time = ? AND status != "cancelled"',
      [doctor_type, appointment_date, appointment_time]
    );
    
    if (existing) {
      throw new Error('This time slot is already booked for the selected doctor type.');
    }

    return await this.run(
      'INSERT INTO Appointments (patient_id, doctor_type, appointment_date, appointment_time, notes) VALUES (?, ?, ?, ?, ?)',
      [patient_id, doctor_type, appointment_date, appointment_time, notes]
    );
  }

  static async findByPatientId(patientId) {
    return await this.all('SELECT * FROM Appointments WHERE patient_id = ? ORDER BY appointment_date DESC', [patientId]);
  }

  static async getAll() {
    return await this.all(`
      SELECT Appointments.*, Users.full_name as patient_name 
      FROM Appointments 
      JOIN Users ON Users.id = Appointments.patient_id
      ORDER BY appointment_date DESC
    `);
  }

  static async updateStatus(id, status) {
    return await this.run('UPDATE Appointments SET status = ? WHERE id = ?', [status, id]);
  }
}

module.exports = Appointment;
