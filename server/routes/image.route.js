import express from 'express'
import { uploadImage,getUserImages, getSingleImage } from '../controllers/image.controller.js'
import { userMiddleware } from '../middleware/user.middleware.js';

const imagerouter=express.Router();

imagerouter.post('/post',userMiddleware,uploadImage);
imagerouter.get('/getimages',userMiddleware,getUserImages);
imagerouter.get('/singleimage/:id',userMiddleware,getSingleImage);

export default imagerouter;

