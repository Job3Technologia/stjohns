const BaseModel = require('./BaseModel');

class Feedback extends BaseModel {
  static async create(feedbackData) {
    const { patient_id, rating, comment } = feedbackData;
    return await this.run(
      'INSERT INTO Feedback (patient_id, rating, comment) VALUES (?, ?, ?)',
      [patient_id, rating, comment]
    );
  }

  static async getAll() {
    return await this.all(`
      SELECT Feedback.*, Users.full_name as patient_name 
      FROM Feedback 
      LEFT JOIN Users ON Users.id = Feedback.patient_id
      ORDER BY created_at DESC
    `);
  }
}

class Announcement extends BaseModel {
  static async create(announcementData) {
    const { title, content, is_emergency, expires_at } = announcementData;
    return await this.run(
      'INSERT INTO Announcements (title, content, is_emergency, expires_at) VALUES (?, ?, ?, ?)',
      [title, content, is_emergency || 0, expires_at]
    );
  }

  static async getAllActive() {
    return await this.all(`
      SELECT * FROM Announcements 
      WHERE expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP 
      ORDER BY is_emergency DESC, created_at DESC
    `);
  }
}

module.exports = { Feedback, Announcement };
