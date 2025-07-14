import express from 'express'
import { changePassword, usignin,usignup } from '../controllers/user.controllers.js';
import { userMiddleware } from '../middleware/user.middleware.js';

const userrouter=express.Router();
userrouter.post('/signup',usignup)
userrouter.post('/signin',usignin)
userrouter.put('/update',userMiddleware,changePassword)

export default userrouter;