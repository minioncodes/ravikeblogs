import express from 'express';
import Connect from './config/Dbcon.js'
import cors from 'cors'
import dotenv from 'dotenv'
import userrouter from './routes/user.routes.js';
import imagerouter from './routes/image.route.js';
dotenv.config();
Connect();
const app = express();
app.use(express.json());
app.use(cors())
app.use('/api/user', userrouter)
app.use('/api/image',imagerouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})



// devs 1hoFnWn0WAfPzhEh