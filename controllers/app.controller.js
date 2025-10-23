function getHealthStatus(req, res, next) {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
}


module.exports = {
  getHealthStatus,
}