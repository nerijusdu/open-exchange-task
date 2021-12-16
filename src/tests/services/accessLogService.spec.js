const accessLogService = require('../../services/accessLogService');

describe('accessLogService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
  });

  describe('getLogs', () => {
    it('should return grouped logs', async () => {
      const logs = [
        { id: 1, ip: 'ip1', date: '2021-12-01', time: 't1' },
        { id: 2, ip: 'ip1', date: '2021-12-01', time: 't2' },
        { id: 3, ip: 'ip2', date: '2021-12-01', time: 't3' },
        { id: 4, ip: 'ip2', date: '2021-12-02', time: 't4' },
      ];
      const expectedResult = [
        { ip: 'ip1', date: '2021-12-1', times: ['t1', 't2'] },
        { ip: 'ip2', date: '2021-12-1', times: ['t3'] },
        { ip: 'ip2', date: '2021-12-2', times: ['t4'] },
      ];
      const sql = 'SELECT * FROM access_logs ';
      const spy = jest.spyOn(accessLogService._pool, 'query').mockResolvedValue([logs]);

      const response = await accessLogService.getLogs();

      expect(spy).toHaveBeenCalledWith(sql, []);
      expect(response).toEqual(expectedResult);
    });

    [
      { startDate: '2021-12-01', endDate: '2021-12-02', filter: ' WHERE date >= ? AND date <= ?', params: ['2021-12-1', '2021-12-2'] },
      { startDate: '2021-12-01', filter: ' WHERE date >= ?', params: ['2021-12-1'] },
      { endDate: '2021-12-02', filter: ' WHERE date <= ?', params: ['2021-12-2'] },
      { filter: '', params: [] },
    ]
    .forEach(({ startDate, endDate, filter, params }) => {
      it('should construct correct date filter parameters', async () => {
        const spy = jest.spyOn(accessLogService._pool, 'query');

        await accessLogService.getLogs({ startDate, endDate });

        expect(spy).toHaveBeenCalledWith(`SELECT * FROM access_logs ${filter}`, params);
      });
    });
  });
});