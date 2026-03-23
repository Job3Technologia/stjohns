const BaseModel = require('./BaseModel');

class Medication extends BaseModel {
  static async create(medicationData) {
    const { record_id, patient_id, medication_name, dosage, frequency } = medicationData;
    return await this.run(
      'INSERT INTO Medications (record_id, patient_id, medication_name, dosage, frequency) VALUES (?, ?, ?, ?, ?)',
      [record_id, patient_id, medication_name, dosage, frequency]
    );
  }

  static async findByPatientId(patientId) {
    return await this.all('SELECT * FROM Medications WHERE patient_id = ? ORDER BY prescribed_date DESC', [patientId]);
  }
}

module.exports = Medication;
