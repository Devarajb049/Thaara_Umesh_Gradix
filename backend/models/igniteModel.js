import db from '../config/db.js';

class IgniteModel {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM ignite_images ORDER BY display_order ASC');
    return rows;
  }

  static async create({ image_url, display_order }) {
    const [result] = await db.query(
      'INSERT INTO ignite_images (image_url, display_order) VALUES (?, ?)',
      [image_url, display_order]
    );
    return { id: result.insertId, image_url, display_order };
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM ignite_images WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getMaxOrder() {
    const [rows] = await db.query('SELECT MAX(display_order) as maxOrder FROM ignite_images');
    return rows[0].maxOrder || 0;
  }
}

export default IgniteModel;
