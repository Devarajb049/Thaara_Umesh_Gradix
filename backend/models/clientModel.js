import db from '../config/db.js';

class ClientModel {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM clients ORDER BY display_order ASC');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM clients WHERE id = ?', [id]);
    return rows[0];
  }

  static async create({ logo, display_order }) {
    const [result] = await db.query(
      'INSERT INTO clients (logo, display_order) VALUES (?, ?)',
      [logo, display_order]
    );
    return { id: result.insertId, logo, display_order };
  }

  static async update(id, { logo, display_order }) {
    await db.query(
      'UPDATE clients SET logo = ?, display_order = ? WHERE id = ?',
      [logo, display_order, id]
    );
    return { id, logo, display_order };
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM clients WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getMaxOrder() {
    const [rows] = await db.query('SELECT MAX(display_order) as maxOrder FROM clients');
    return rows[0].maxOrder || 0;
  }
}

export default ClientModel;
