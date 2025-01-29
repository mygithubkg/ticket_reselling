import express from 'express';
import {getUsers, getTickets, getEvents, deleteUser, deleteTicket,deleteEvent, addEvent, editEvent,resetPassword} from '../controllers/adminController.js';

const router_admin = express.Router();

router_admin.post('/users', getUsers);
router_admin.post('/tickets', getTickets);
router_admin.post('/events', getEvents);
router_admin.delete('/users/:id', deleteUser);
router_admin.delete('/tickets/:id', deleteTicket);
router_admin.delete('/events/:id', deleteEvent);
router_admin.post('/admin/events/add', addEvent);
router_admin.patch('/admin/events/edit/:id', editEvent);
router_admin.post('/admin/users/reset-password', resetPassword);

export default router_admin;