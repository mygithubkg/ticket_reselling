import express from 'express';
import {getUsers, getTickets, getEvents, deleteUser, deleteTicket,deleteEvent, addEvent, editEvent,resetPassword} from '../controllers/adminController.js';

const router = express.Router();

router.post('/users', getUsers);
router.post('/tickets', getTickets);
router.post('/events', getEvents);
router.delete('/users/:id', deleteUser);
router.delete('/tickets/:id', deleteTicket);
router.delete('/events/:id', deleteEvent);
router.delete('/admin/events/add', addEvent);
router.delete('/admin/events/edit/:id', editEvent);
router.delete('/admin/users/reset-password', resetPassword);
export default router;