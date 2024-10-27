const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const sequelize = require("./db");

const app = express();
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection failed:", err));
