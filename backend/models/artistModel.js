import db from '../config/db.js';

class ArtistModel {
  static async getAll({ search = '', status = '', category = '', limit = 100, offset = 0 }) {
    let query = 'SELECT * FROM artists WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (fullName LIKE ? OR email LIKE ? OR phone LIKE ? OR city LIKE ? OR skills LIKE ?)';
      const searchWild = `%${search}%`;
      params.push(searchWild, searchWild, searchWild, searchWild, searchWild);
    }

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (category) {
      query += ' AND categories LIKE ?';
      params.push(`%${category}%`);
    }

    query += ' ORDER BY created_at DESC';

    if (limit) {
      query += ' LIMIT ? OFFSET ?';
      params.push(parseInt(limit), parseInt(offset));
    }

    const [rows] = await db.query(query, params);
    return rows.map(row => {
      try {
        if (row.portfolioImages) {
          row.portfolioImages = JSON.parse(row.portfolioImages);
        } else {
          row.portfolioImages = [];
        }
      } catch (e) {
        row.portfolioImages = [];
      }
      return row;
    });
  }

  static async getCount({ search = '', status = '', category = '' }) {
    let query = 'SELECT COUNT(*) as count FROM artists WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (fullName LIKE ? OR email LIKE ? OR phone LIKE ? OR city LIKE ? OR skills LIKE ?)';
      const searchWild = `%${search}%`;
      params.push(searchWild, searchWild, searchWild, searchWild, searchWild);
    }

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (category) {
      query += ' AND categories LIKE ?';
      params.push(`%${category}%`);
    }

    const [rows] = await db.query(query, params);
    return rows[0].count;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM artists WHERE id = ?', [id]);
    if (!rows[0]) return null;
    const row = rows[0];
    try {
      if (row.portfolioImages) {
        row.portfolioImages = JSON.parse(row.portfolioImages);
      } else {
        row.portfolioImages = [];
      }
    } catch (e) {
      row.portfolioImages = [];
    }
    return row;
  }

  static async create(data) {
    const portfolioImagesStr = Array.isArray(data.portfolioImages) 
      ? JSON.stringify(data.portfolioImages) 
      : JSON.stringify([]);

    const [result] = await db.query(
      `INSERT INTO artists (
        fullName, email, phone, dob, gender, address, city, state, country, 
        height, weight, languages, experience, skills, categories, 
        instagram, facebook, portfolioWebsite, profileDescription, 
        profilePhoto, portfolioImages, resumeUrl, introVideoUrl, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        data.fullName, data.email, data.phone, data.dob, data.gender, data.address, data.city, data.state, data.country,
        data.height, data.weight, data.languages, data.experience, data.skills, data.categories,
        data.instagram, data.facebook, data.portfolioWebsite, data.profileDescription,
        data.profilePhoto, portfolioImagesStr, data.resumeUrl, data.introVideoUrl
      ]
    );

    return { id: result.insertId, ...data, status: 'pending' };
  }

  static async updateStatus(id, status) {
    await db.query('UPDATE artists SET status = ? WHERE id = ?', [status, id]);
    return { id, status };
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM artists WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

export default ArtistModel;
