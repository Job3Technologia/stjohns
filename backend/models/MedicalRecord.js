const BaseModel = require('./BaseModel');

class MedicalRecord extends BaseModel {
  static async create(recordData) {
    const { patient_id, staff_id, diagnosis, treatment_plan, notes } = recordData;
    return await this.run(
      'INSERT INTO MedicalRecords (patient_id, staff_id, diagnosis, treatment_plan, notes) VALUES (?, ?, ?, ?, ?)',
      [patient_id, staff_id, diagnosis, treatment_plan, notes]
    );
  }

  static async findByPatientId(patientId) {
    return await this.all(`
      SELECT MedicalRecords.*, Users.full_name as staff_name 
      FROM MedicalRecords 
      JOIN Users ON Users.id = MedicalRecords.staff_id
      WHERE patient_id = ? 
      ORDER BY visit_date DESC`, 
      [patientId]
    );
  }

  static async getAll() {
    return await this.all(`
      SELECT MedicalRecords.*, Patients.full_name as patient_name, Staff.full_name as staff_name 
      FROM MedicalRecords 
      JOIN Users as Patients ON Patients.id = MedicalRecords.patient_id
      JOIN Users as Staff ON Staff.id = MedicalRecords.staff_id
      ORDER BY visit_date DESC
    `);
  }
}

module.exports = MedicalRecord;
