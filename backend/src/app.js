import express from 'express';
import {usersRouter }from './modules/users/index.js';
import authRouter from './modules/auth/index.js';
import {clerkMiddleware} from '@clerk/express';
import requireUserAuth from './modules/auth/middleware/requireAuth.js';
import cors from 'cors';
const app= express();
// Middleware

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(clerkMiddleware());
app.use(express.json());
//user routes
app.use('/api/users', requireUserAuth, usersRouter);
//auth routes
app.use('/api/auth', authRouter);
// health check route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running!' });
}); 

export default app;