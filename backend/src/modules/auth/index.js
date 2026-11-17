import express from 'express';
import { getCurrentUser,syncCurrentUser } from './controller.js';

const authRouter = express.Router();

authRouter.get('/me', getCurrentUser);
authRouter.post('/sync', syncCurrentUser);

export default authRouter;