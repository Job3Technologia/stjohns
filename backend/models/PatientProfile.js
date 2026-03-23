const BaseModel = require('./BaseModel');

class PatientProfile extends BaseModel {
  static async create(profileData) {
    const { user_id, date_of_birth, gender, phone_number, address, emergency_contact_name, emergency_contact_phone, allergies, medical_aid_provider, medical_aid_number, medical_aid_status, medical_history } = profileData;
    return await this.run(
      'INSERT INTO PatientProfiles (user_id, date_of_birth, gender, phone_number, address, emergency_contact_name, emergency_contact_phone, allergies, medical_aid_provider, medical_aid_number, medical_aid_status, medical_history) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [user_id, date_of_birth, gender, phone_number, address, emergency_contact_name, emergency_contact_phone, allergies, medical_aid_provider, medical_aid_number, medical_aid_status || 'Pending', medical_history]
    );
  }

  static async findByUserId(userId) {
    return await this.get('SELECT * FROM PatientProfiles WHERE user_id = ?', [userId]);
  }

  static async update(userId, profileData) {
    const fields = Object.keys(profileData).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(profileData), userId];
    return await this.run(`UPDATE PatientProfiles SET ${fields} WHERE user_id = ?`, values);
  }

  static async getAll() {
    return await this.all(`
      SELECT Users.full_name, Users.email, PatientProfiles.* 
      FROM PatientProfiles 
      JOIN Users ON Users.id = PatientProfiles.user_id
    `);
  }
}

module.exports = PatientProfile;
