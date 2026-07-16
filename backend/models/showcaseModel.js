import db from '../config/db.js';

class ShowcaseModel {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM showcases ORDER BY display_order ASC');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM showcases WHERE id = ?', [id]);
    return rows[0];
  }

  static async create({ title, thumbnail, youtube_url, display_order }) {
    const [result] = await db.query(
      'INSERT INTO showcases (title, thumbnail, youtube_url, display_order) VALUES (?, ?, ?, ?)',
      [title, thumbnail, youtube_url, display_order]
    );
    return { id: result.insertId, title, thumbnail, youtube_url, display_order };
  }

  static async update(id, { title, thumbnail, youtube_url, display_order }) {
    await db.query(
      'UPDATE showcases SET title = ?, thumbnail = ?, youtube_url = ?, display_order = ? WHERE id = ?',
      [title, thumbnail, youtube_url, display_order, id]
    );
    return { id, title, thumbnail, youtube_url, display_order };
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM showcases WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getMaxOrder() {
    const [rows] = await db.query('SELECT MAX(display_order) as maxOrder FROM showcases');
    return rows[0].maxOrder || 0;
  }
}

export default ShowcaseModel;
