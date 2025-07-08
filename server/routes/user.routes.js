import express from 'express'
import { usignin,usignup } from '../controllers/user.controllers.js';

const userrouter=express.Router();
userrouter.post('/signup',usignup)
userrouter.post('/signin',usignin)

export default userrouter;