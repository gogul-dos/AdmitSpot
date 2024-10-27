const Contact = require("../models/Contact");

// Add new contact
exports.addContact = async (req, res) => {
  const { name, email, phone, address, timezone } = req.body;
  const contact = await Contact.create({
    name,
    email,
    phone,
    address,
    timezone,
  });
  res.status(201).json(contact);
};

// Retrieve contacts with filtering and sorting
exports.getContacts = async (req, res) => {
  const { name, email, timezone } = req.query;
  const contacts = await Contact.findAll({
    where: {
      ...(name && { name }),
      ...(email && { email }),
      ...(timezone && { timezone }),
    },
    order: [["createdAt", "DESC"]],
  });
  res.json(contacts);
};

// Update contact details
exports.updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, timezone } = req.body;

  await Contact.update(
    { name, email, phone, address, timezone },
    { where: { id } }
  );
  res.json({ message: "Contact updated successfully" });
};

// Soft delete contact
exports.deleteContact = async (req, res) => {
  const { id } = req.params;
  await Contact.destroy({ where: { id } });
  res.json({ message: "Contact deleted successfully" });
};
