const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const Contact = require("../models/Contact");

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Parse CSV file
exports.uploadContacts = (req, res) => {
  const contacts = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => contacts.push(data))
    .on("end", () => {
      // Add validation and bulk create here
      Contact.bulkCreate(contacts)
        .then(() =>
          res.status(201).json({ message: "Contacts uploaded successfully" })
        )
        .catch((error) => res.status(400).json({ error }));
    });
};

exports.upload = upload.single("file");
