const BaseModel = require('./BaseModel');

class User extends BaseModel {
  static async create(userData) {
    const { full_name, email, password, role } = userData;
    return await this.run(
      'INSERT INTO Users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
      [full_name, email, password, role || 'patient']
    );
  }

  static async findByEmail(email) {
    return await this.get('SELECT * FROM Users WHERE email = ?', [email]);
  }

  static async findById(id) {
    return await this.get('SELECT * FROM Users WHERE id = ?', [id]);
  }
}

module.exports = User;
