import db from '../config/db.js';

class WorkshopModel {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM workshops ORDER BY display_order ASC');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM workshops WHERE id = ?', [id]);
    return rows[0];
  }

  static async create({ thumbnail, youtube_url, display_order }) {
    const [result] = await db.query(
      'INSERT INTO workshops (thumbnail, youtube_url, display_order) VALUES (?, ?, ?)',
      [thumbnail, youtube_url, display_order]
    );
    return { id: result.insertId, thumbnail, youtube_url, display_order };
  }

  static async update(id, { thumbnail, youtube_url, display_order }) {
    await db.query(
      'UPDATE workshops SET thumbnail = ?, youtube_url = ?, display_order = ? WHERE id = ?',
      [thumbnail, youtube_url, display_order, id]
    );
    return { id, thumbnail, youtube_url, display_order };
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM workshops WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getMaxOrder() {
    const [rows] = await db.query('SELECT MAX(display_order) as maxOrder FROM workshops');
    return rows[0].maxOrder || 0;
  }
}

export default WorkshopModel;
