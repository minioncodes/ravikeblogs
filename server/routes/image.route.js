import express from 'express'
import { uploadImage,getUserImages, getSingleImage, uploadImagesFromPc, getImagesByCategory } from '../controllers/image.controller.js'
import { userMiddleware } from '../middleware/user.middleware.js';
import { upload } from '../middleware/multer.middleware.js';

const imagerouter=express.Router();

imagerouter.post('/post',userMiddleware,uploadImage);
imagerouter.get('/getimages',getUserImages);
imagerouter.post('/uploadmany',userMiddleware,upload.array('images'),uploadImagesFromPc);
imagerouter.get('/singleimage/:id',userMiddleware,getSingleImage);
imagerouter.get('/getimage-category',getImagesByCategory)

export default imagerouter;

