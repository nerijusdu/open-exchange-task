const mysql = require('mysql2');
const { database } = require('../configuration');

const getDateString = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const isValidDate = date => date instanceof Date && !isNaN(date.getTime());

class AccessLogService {
  constructor() {
    this._pool = mysql.createPool({ connectionLimit: 5, ...database }).promise();
  }

  async addLog(ip) {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = getDateString(now);
    const sql = 'INSERT INTO access_logs (ip, date, time) VALUES (?, ?, ?)';
    await this._pool.query(sql, [ip, date, time]);
  }

  async getLogs(filters) {
    const { filterQuery, params } = this._getLogsFilterQueryAndParams(filters);
    const sql = `SELECT * FROM access_logs ${filterQuery}`;
    const [rows] = await this._pool.query(sql, params);

    const groups = rows.reduce((acc, row) => {
      const { ip, date, time } = row;
      const group = acc[ip + date] || { ip, date: getDateString(new Date(date)), times: [] };
      group.times.push(time);
      acc[ip + date] = group;
      return acc;
    }, {});

    return Object.values(groups);
  }

  _getLogsFilterQueryAndParams({ startDate, endDate } = {}) {
    let filterQuery = '';
    const params = [];
    const hasStartDate = startDate && isValidDate(new Date(startDate));
    const hasEndDate = endDate && isValidDate(new Date(endDate));

    if (hasStartDate) {
      filterQuery += ' WHERE date >= ?';
      params.push(getDateString(new Date(startDate)));
    }

    if (hasEndDate) {
      filterQuery += hasStartDate ? ' AND date <= ?' : ' WHERE date <= ?';
      params.push(getDateString(new Date(endDate)));
    }

    return { filterQuery, params };
  }
}

module.exports = new AccessLogService();
