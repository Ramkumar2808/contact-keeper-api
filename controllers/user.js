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

// login Function
export const login = async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (!userExist) return res.status(400).json({ message: "email doesn't exist" });

  if (email && password) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(password, userExist.password);

    if (validPassword) {
      const token = generateToken(userExist._id);
      //   return res.status(200).json({ token });
      return res.status(200).json({ id: userExist._id, name: userExist.name, email: userExist.email, token });
    } else {
      res.status(400).json({ message: 'These credentials do not match our records' });
    }
  }
};

// forgot password Function
export const forgotPassword = async (req, res) => {};

// get authenticated user
export const getMe = (req, res) => {
  res.status(200).json(req.user);
};

// get all users
export const getallUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    // process.env.JWT_SECRET,
    'mysecret',
    // { expiresIn: '1h' }  //hour format
    { expiresIn: '30d' }
  );
};
