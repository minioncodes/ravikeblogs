import express from 'express'
import { uploadImage,getUserImages, getSingleImage, uploadImageFromPC } from '../controllers/image.controller.js'
import { userMiddleware } from '../middleware/user.middleware.js';
import { upload } from '../middleware/multer.middleware.js';

const imagerouter=express.Router();

imagerouter.post('/post',userMiddleware,uploadImage);
imagerouter.get('/getimages',userMiddleware,getUserImages);
imagerouter.post('/upload',upload.single('image'),uploadImageFromPC)
imagerouter.get('/singleimage/:id',userMiddleware,getSingleImage);

export default imagerouter;

