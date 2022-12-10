import express from 'express';
import { getAllContacts, removeContact, storeContact, updateContact } from '../controllers/contact.js';

const router = express.Router();

router.get('/', getAllContacts);
router.post('/store', storeContact);
router.put('/update/:id', updateContact);
router.delete('/remove/:id', removeContact);

export default router;
