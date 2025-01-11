import { io } from 'socket.io-client';
import env from "process";
env.config();

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';

export const socket = io(URL);