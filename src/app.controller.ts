import express from 'express';
import type {Express , Request , Response} from 'express';
import cors from 'cors';
import { authRouter } from './modules/auth/index';
import { userRouter } from './modules/users/index';
import { messageRouter } from './modules/messages/index';
import { postRouter } from './modules/posts/index'; 
import { globalErrorHandler } from './middleware/index';

import { env } from './config/env.service';
import { databaseConnection } from './database/connection';
let origin = env.BASE_URL;
let allowedOrigins = [...origin];

export const boostrap = async()=>{
    const app: Express = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: false}))
    app.use(cors({
        origin: function(origin, callback){
            if (!origin || allowedOrigins.includes(origin)) { 
                return callback(null , true)
            }
            return callback(new Error("this origin is not allowed to send request (unauthorized)"))
        },
        credentials: true   
    }));
    await databaseConnection();

    app.use('/auth', authRouter);
    app.use('/users', userRouter);
    app.use('/messages', messageRouter);
    app.use('/posts', postRouter);

    app.get('/',(req:Request,res:Response)=>{
        res.json({message: 'hello from social media app'});
    })
    app.use('{*dummy}', (req,res)=> res.status(404).json('Page Not Found'));
    app.use(globalErrorHandler);
    
    app.listen(env.Port, ()=> console.log(`server is running on port ${env.Port}`));
}



