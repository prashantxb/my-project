require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const tenantResolver = require("./middleware/tenantResolver");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Resolve tenant for all requests based on subdomain / headers
app.use(tenantResolver);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));   // login route (public)
app.use("/api/tenant", require("./routes/tenant"));     // tenant settings (protected internally)
app.use("/api/resources", require("./routes/resources"));//other protected routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
