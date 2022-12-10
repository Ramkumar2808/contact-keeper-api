import express from 'express';
import { login, register, forgotPassword, getallUsers } from '../controllers/user.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/get-users', getallUsers);

export default router;
