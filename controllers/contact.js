import Contact from '../models/Contact.js';

// Get all contacts
export const getAllContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

// store contact
export const storeContact = async (req, res) => {
  const { name, email, phone, contactType } = req.body;
  try {
    const contact = await Contact.create({
      name,
      email,
      phone,
      contactType,
    });
    res.status(201).json({
      data: contact,
      message: 'Contact stored successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

// update contact
export const updateContact = async (req, res) => {
  //   const contact = await Contact.findById(req.params.id);
  const { name, email, phone, contactType } = req.body;

  const filter = { id: req.params.id };
  const update = { name, email, phone, contactType };
  const contact = await Contact.findOneAndUpdate(filter, update, { new: true });

  res.status(200).json({
    data: contact,
    message: 'Contact updated successfully',
  });
};

// delete contact
export const removeContact = async (req, res) => {
  const filter = { id: req.params.id };
  const contact = await Contact.findOneAndDelete(filter);

  res.status(200).json({
    data: contact,
    message: 'Contact deleted successfully',
  });
};
