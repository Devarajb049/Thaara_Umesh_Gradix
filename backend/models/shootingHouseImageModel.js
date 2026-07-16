import db from '../config/db.js';

class ShootingHouseImageModel {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM shooting_house_images ORDER BY display_order ASC');
    return rows;
  }

  static async create({ image_url, display_order }) {
    const [result] = await db.query(
      'INSERT INTO shooting_house_images (image_url, display_order) VALUES (?, ?)',
      [image_url, display_order]
    );
    return { id: result.insertId, image_url, display_order };
  }

  static async update(id, { display_order }) {
    await db.query('UPDATE shooting_house_images SET display_order = ? WHERE id = ?', [display_order, id]);
    return { id, display_order };
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM shooting_house_images WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getMaxOrder() {
    const [rows] = await db.query('SELECT MAX(display_order) as maxOrder FROM shooting_house_images');
    return rows[0].maxOrder || 0;
  }
}

export default ShootingHouseImageModel;
