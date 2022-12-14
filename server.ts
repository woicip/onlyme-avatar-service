import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import createID from 'create-simple-id';
import multer from 'multer';
const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, '/home/JuanStore/dev/onlyme-avatar-service/media');
    },
    filename(req, file, callback){
        const format = file.originalname.split('.');
        callback(null, `${createID()}.${format[1]}`);
    }
});
const upload = multer({ storage });

// Types
import { Avatar, Welcome } from './types';

const app: Express = express();
app.use('/media', express.static('media'));
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    const result: Welcome = {
        code: 200, 
        message: "Welcome to OnlyMe Avatar Service"
    }
    res.send(result);
});

app.post('/olav', upload.single('avatar'), (req: Request, res: Response) => {
    const result: Avatar = {
        code: 200, 
        message: "SUCCESS",
        url: `http://${process.env.ADDRESS}/media/${req.file?.filename}`
    };

    res.send(result);
});

app.listen(port, () => console.log(`OnlyMe Avatar Service is running on http://${process.env.ADDRESS}/`));
