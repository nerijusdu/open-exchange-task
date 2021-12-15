const mysql = require('mysql2');
const { database } = require('../configuration');

const pool = mysql.createPool({ connectionLimit: 5, ...database }).promise();

class AccessLogService {
  async addLog(ip) {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const sql = 'INSERT INTO access_logs (ip, date, time) VALUES (?, ?, ?)';
    await pool.query(sql, [ip, date, time]);
  }
}

module.exports = new AccessLogService();
