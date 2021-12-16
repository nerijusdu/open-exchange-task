const supertest = require('supertest');
const app = require('../../app');
const accessLogService = require('../../services/accessLogService');

const server = supertest(app);

describe('GET /logs', () => {
  it('should return logs', async () => {
    const logs = [{ip: 'test', date: 'test', times: ['test']}];
    jest.spyOn(accessLogService, 'getLogs').mockResolvedValue(logs);

    const response = await server.get('/logs');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(logs);
  });

  it('shoud pass query parameters', async () => {
    const spy = jest.spyOn(accessLogService, 'getLogs');

    const response = await server.get('/logs?startDate=2021-12-1&endDate=2021-12-30');

    expect(response.status).toBe(200);
    expect(spy).toHaveBeenCalledWith({startDate: '2021-12-1', endDate: '2021-12-30'});
  });
});