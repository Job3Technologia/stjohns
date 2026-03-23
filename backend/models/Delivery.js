const BaseModel = require('./BaseModel');

class Delivery extends BaseModel {
  static async create(deliveryData) {
    const { patient_id, medication_id, delivery_address, contact_number } = deliveryData;
    return await this.run(
      'INSERT INTO Deliveries (patient_id, medication_id, delivery_address, contact_number) VALUES (?, ?, ?, ?)',
      [patient_id, medication_id, delivery_address, contact_number]
    );
  }

  static async findByPatientId(patientId) {
    return await this.all(`
      SELECT Deliveries.*, Medications.medication_name 
      FROM Deliveries 
      JOIN Medications ON Medications.id = Deliveries.medication_id
      WHERE Deliveries.patient_id = ? 
      ORDER BY requested_at DESC`, 
      [patientId]
    );
  }

  static async getAll() {
    return await this.all(`
      SELECT Deliveries.*, Users.full_name as patient_name, Medications.medication_name 
      FROM Deliveries 
      JOIN Users ON Users.id = Deliveries.patient_id
      JOIN Medications ON Medications.id = Deliveries.medication_id
      ORDER BY requested_at DESC
    `);
  }

  static async updateStatus(id, status) {
    const deliveredAt = status === 'Delivered' ? 'CURRENT_TIMESTAMP' : 'NULL';
    return await this.run(`UPDATE Deliveries SET status = ?, delivered_at = ${deliveredAt} WHERE id = ?`, [status, id]);
  }
}

module.exports = Delivery;
