const accessLogService = require('../../services/accessLogService');

describe('accessLogService', () => {
  describe('addLog', () => {
    it('should create a new log entry', async () => {
      const now = new Date();
      const ip = '::ffff:127:0:0:1';
      const time = now.toLocaleTimeString();
      const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      const sql = 'INSERT INTO access_logs (ip, date, time) VALUES (?, ?, ?)';
      const spy = jest.spyOn(accessLogService._pool, 'query').mockResolvedValue({});

      await accessLogService.addLog(ip);

      expect(spy).toHaveBeenCalledWith(sql, [ip, date, time]);
    });
  })
});