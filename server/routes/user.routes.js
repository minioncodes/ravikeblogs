import express from 'express'
import { changePassword, usignin,usignup } from '../controllers/user.controllers.js';

const userrouter=express.Router();
userrouter.post('/signup',usignup)
userrouter.post('/signin',usignin)
userrouter.put('/update',changePassword)

export default userrouter;