const promiseResponse = require('../../utils/promiseResponse');

describe('promiseResponse', () => {
  it('should pass all arguments', async () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    const handler = jest.fn();
    handler.mockResolvedValue({});

    await promiseResponse(handler)(req, res, next);

    expect(handler).toHaveBeenCalledWith(req, res, next);
  });

  it('should call next if handler throws', async () => {
    const next = jest.fn();
    const handler = jest.fn();
    handler.mockRejectedValue(new Error('error'));

    await promiseResponse(handler)({}, {}, next);

    expect(next).toHaveBeenCalledWith(new Error('error'));
  });
});