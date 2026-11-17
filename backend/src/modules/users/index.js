import express from 'express';
const usersRouter = express.Router();

import { getMyProfileController } from './controller.js';

usersRouter.get('/profile', getMyProfileController);

export { usersRouter };