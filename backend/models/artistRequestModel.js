import db from '../config/db.js';

class ArtistRequestModel {
  static async getAll({ search = '', status = '', limit = 100, offset = 0 }) {
    let query = `
      SELECT r.*, a.fullName as artistName, a.profilePhoto as artistPhoto 
      FROM artist_profile_requests r
      LEFT JOIN artists a ON r.artistId = a.id
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      query += ' AND (r.requesterName LIKE ? OR r.requesterEmail LIKE ? OR r.companyName LIKE ? OR a.fullName LIKE ?)';
      const searchWild = `%${search}%`;
      params.push(searchWild, searchWild, searchWild, searchWild);
    }

    if (status) {
      query += ' AND r.status = ?';
      params.push(status);
    }

    query += ' ORDER BY r.created_at DESC';

    if (limit) {
      query += ' LIMIT ? OFFSET ?';
      params.push(parseInt(limit), parseInt(offset));
    }

    const [rows] = await db.query(query, params);
    return rows;
  }

  static async getCount({ search = '', status = '' }) {
    let query = `
      SELECT COUNT(*) as count 
      FROM artist_profile_requests r
      LEFT JOIN artists a ON r.artistId = a.id
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      query += ' AND (r.requesterName LIKE ? OR r.requesterEmail LIKE ? OR r.companyName LIKE ? OR a.fullName LIKE ?)';
      const searchWild = `%${search}%`;
      params.push(searchWild, searchWild, searchWild, searchWild);
    }

    if (status) {
      query += ' AND r.status = ?';
      params.push(status);
    }

    const [rows] = await db.query(query, params);
    return rows[0].count;
  }

  static async getById(id) {
    const query = `
      SELECT r.*, a.fullName as artistName, a.profilePhoto as artistPhoto, a.email as artistEmail
      FROM artist_profile_requests r
      LEFT JOIN artists a ON r.artistId = a.id
      WHERE r.id = ?
    `;
    const [rows] = await db.query(query, [id]);
    return rows[0] || null;
  }

  static async getByToken(token) {
    const query = `
      SELECT r.*, a.fullName as artistName
      FROM artist_profile_requests r
      LEFT JOIN artists a ON r.artistId = a.id
      WHERE r.accessToken = ? AND r.status = 'approved'
    `;
    const [rows] = await db.query(query, [token]);
    return rows[0] || null;
  }

  static async create(data) {
    const [result] = await db.query(
      `INSERT INTO artist_profile_requests (
        requesterName, requesterEmail, companyName, reason, artistId, status
      ) VALUES (?, ?, ?, ?, ?, 'pending')`,
      [
        data.requesterName,
        data.requesterEmail,
        data.companyName,
        data.reason,
        data.artistId
      ]
    );

    return { id: result.insertId, ...data, status: 'pending', accessToken: null };
  }

  static async updateStatus(id, status, accessToken = null) {
    await db.query(
      'UPDATE artist_profile_requests SET status = ?, accessToken = ? WHERE id = ?',
      [status, accessToken, id]
    );
    return { id, status, accessToken };
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM artist_profile_requests WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

export default ArtistRequestModel;
