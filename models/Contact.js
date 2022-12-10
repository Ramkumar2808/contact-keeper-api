import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone'],
    },
    contactType: {
      type: String,
      required: [true, 'Please add a contact type'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Contact', contactSchema);
