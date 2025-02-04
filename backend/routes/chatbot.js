import express from 'express';
import { chat_system, reply_1, reply_2, reply_3, reply_4 ,chat_userinfo, chat_noti, chat_nego} from '../controllers/chatbotcontroller.js';

const chat_router = express.Router();

chat_router.get('/chat', chat_system);
chat_router.post('/chat/reply1', reply_1);
chat_router.post('/chat/reply2', reply_2);
chat_router.post('/chat/reply3', reply_3);
chat_router.post('/chat/reply4', reply_4);
chat_router.post('/userinfo', chat_userinfo);
chat_router.post('/notification', chat_noti);
chat_router.post('/savenegotiation', chat_nego);

export default chat_router;
