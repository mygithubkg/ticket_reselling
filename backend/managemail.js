import express from 'express';
import { sendEmail, sendOTP } from './mail.js';

const router_mail = express.Router();

router_mail.post('/verify/sendotp',sendOTP);
router_mail.post('/sendmail',sendEmail);

export default router_mail;