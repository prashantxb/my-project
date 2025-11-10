const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ✅ LOGIN ROUTE
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // ✅ Find user ONLY by email (no tenant check yet)
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid email or password" });

  // ✅ Compare password
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Invalid email or password" });

  // ✅ Create token with tenantId + role
  const token = jwt.sign(
    {
      userId: user._id,
      tenantId: user.tenantId.toString(),
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, role: user.role });
});

module.exports = router;
