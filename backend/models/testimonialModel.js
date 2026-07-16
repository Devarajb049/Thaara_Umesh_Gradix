import db from '../config/db.js';

class TestimonialModel {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM testimonials ORDER BY display_order ASC');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM testimonials WHERE id = ?', [id]);
    return rows[0];
  }

  static async create({ person_name, designation, profile_image, review, display_order }) {
    const [result] = await db.query(
      'INSERT INTO testimonials (person_name, designation, profile_image, review, display_order) VALUES (?, ?, ?, ?, ?)',
      [person_name, designation, profile_image, review, display_order]
    );
    return { id: result.insertId, person_name, designation, profile_image, review, display_order };
  }

  static async update(id, { person_name, designation, profile_image, review, display_order }) {
    await db.query(
      'UPDATE testimonials SET person_name = ?, designation = ?, profile_image = ?, review = ?, display_order = ? WHERE id = ?',
      [person_name, designation, profile_image, review, display_order, id]
    );
    return { id, person_name, designation, profile_image, review, display_order };
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM testimonials WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getMaxOrder() {
    const [rows] = await db.query('SELECT MAX(display_order) as maxOrder FROM testimonials');
    return rows[0].maxOrder || 0;
  }
}

export default TestimonialModel;
