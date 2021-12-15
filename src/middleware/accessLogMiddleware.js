const accessLogService = require("../services/accessLogService");

const accessLogMiddleware = async (req, res, next) => {
  await accessLogService.addLog(req.connection.remoteAddress).catch(next);
  next();
};

module.exports = accessLogMiddleware;
