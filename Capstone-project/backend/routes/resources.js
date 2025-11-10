const router = require("express").Router();
const Resource = require("../models/Resource");

// CREATE Resource
router.post("/", async (req, res) => {
  try {
    const tenantId = req.tenantId;
    const { title, link } = req.body;

    const resource = await Resource.create({
      title,
      link,
      tenantId
    });

    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET all resources for tenant
router.get("/", async (req, res) => {
  try {
    const tenantId = req.tenantId;
    const resources = await Resource.find({ tenantId });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
