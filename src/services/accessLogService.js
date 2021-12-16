const mysql = require('mysql2');
const { database } = require('../configuration');

class AccessLogService {
  constructor() {
    this._pool = mysql.createPool({ connectionLimit: 5, ...database }).promise();
  }

  async addLog(ip) {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const sql = 'INSERT INTO access_logs (ip, date, time) VALUES (?, ?, ?)';
    await this._pool.query(sql, [ip, date, time]);
  }
}

module.exports = new AccessLogService();
