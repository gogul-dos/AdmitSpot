const express = require("express");
const {
  addContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const { uploadContacts, upload } = require("../controllers/fileController");
const { authenticate } = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(authenticate); // Protect routes with authentication

router.post("/contacts", addContact);
router.get("/contacts", getContacts);
router.put("/contacts/:id", updateContact);
router.delete("/contacts/:id", deleteContact);
router.post("/upload", upload, uploadContacts); // Handle file upload

module.exports = router;
