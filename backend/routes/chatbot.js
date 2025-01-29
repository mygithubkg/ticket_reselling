import express from 'express';
import { chat_system, reply_1, reply_2, reply_3, reply_4 } from '../controllers/chatbotcontroller.js';

const router = express.Router();

router.get('/chat', chat_system);
router.post('/chat/reply1', reply_1);
router.post('/chat/reply2', reply_2);
router.post('/chat/reply3', reply_3);
router.post('/chat/reply4', reply_4);

export default router;
