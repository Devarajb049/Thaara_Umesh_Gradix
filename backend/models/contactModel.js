import db from '../config/db.js';

class ContactModel {
  static async getAll({ search = '', isRead = null, limit = 100, offset = 0, sortBy = 'created_at', order = 'DESC' }) {
    let query = 'SELECT * FROM contacts WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)';
      const searchWild = `%${search}%`;
      params.push(searchWild, searchWild, searchWild, searchWild);
    }

    if (isRead !== null) {
      query += ' AND is_read = ?';
      params.push(isRead ? 1 : 0);
    }

    // Ensure safe column names for sorting
    const allowedSortCols = ['name', 'email', 'subject', 'created_at', 'is_read'];
    const finalSortBy = allowedSortCols.includes(sortBy) ? sortBy : 'created_at';
    const finalOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    query += ` ORDER BY \`${finalSortBy}\` ${finalOrder}`;

    if (limit) {
      query += ' LIMIT ? OFFSET ?';
      params.push(parseInt(limit), parseInt(offset));
    }

    const [rows] = await db.query(query, params);
    return rows;
  }

  static async getCount({ search = '', isRead = null }) {
    let query = 'SELECT COUNT(*) as count FROM contacts WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)';
      const searchWild = `%${search}%`;
      params.push(searchWild, searchWild, searchWild, searchWild);
    }

    if (isRead !== null) {
      query += ' AND is_read = ?';
      params.push(isRead ? 1 : 0);
    }

    const [rows] = await db.query(query, params);
    return rows[0].count;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM contacts WHERE id = ?', [id]);
    return rows[0];
  }

  static async create({ name, email, phone, subject, message }) {
    const [result] = await db.query(
      'INSERT INTO contacts (name, email, phone, subject, message, is_read) VALUES (?, ?, ?, ?, ?, 0)',
      [name, email, phone, subject, message]
    );
    return { id: result.insertId, name, email, phone, subject, message, is_read: 0 };
  }

  static async markAsRead(id, isRead = true) {
    await db.query('UPDATE contacts SET is_read = ? WHERE id = ?', [isRead ? 1 : 0, id]);
    return { id, is_read: isRead ? 1 : 0 };
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM contacts WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

export default ContactModel;
