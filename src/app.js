import express from 'express';
import {usersRouter }from './modules/users/index.js';
const app= express();
// Middleware
app.use(express.json());
//user routes
app.use('/api/users', usersRouter);
// health check route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running!' });
}); 

export default app;