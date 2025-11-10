const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
  title: String,
  link: String,
  tenantId: String
});

module.exports = mongoose.model("Resource", ResourceSchema);
