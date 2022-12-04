import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register Function
export const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const passwordMatch = password === confirmPassword;
  if (!passwordMatch) return res.status(400).json({ message: 'Password and confirm password does not match' });
  const userExist = await User.findOne({ email });
  if (userExist) return res.status(400).json({ message: 'User already exist' });

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
};
