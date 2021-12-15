
const promiseResponse = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);

module.exports = promiseResponse;
