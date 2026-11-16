import express from 'express';
const usersRouter=express.Router();
import {getAllUsersController, createUserController }from './controller.js';
usersRouter.get('/', getAllUsersController);
usersRouter.post('/',createUserController);
export {usersRouter};