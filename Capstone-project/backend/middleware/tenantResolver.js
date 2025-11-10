module.exports = function (req, res, next) {
  const tenantId = req.headers["x-tenant-id"];

  if (!tenantId) {
    return res.status(400).json({ message: "Tenant not provided" });
  }

  req.tenantId = tenantId;
  next();
};
