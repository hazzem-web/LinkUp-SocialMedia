import express from 'express';
import type {Express , Request , Response} from 'express';
import cors from 'cors';
import { authRouter } from './modules';
import { globalErrorHandler } from './middleware/error.middleware';

import { env } from './config/env.service';
import { databaseConnection } from './database/connection';
let origin = env.BASE_URL;
let allowedOrigins = [...origin];

export const boostrap = async(){
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
    app.get('/',(req:Request,res:Response)=>{
        res.json({message: 'hello from social media app'});
    })
    app.use('{*dummy}', (req,res)=> res.status(404).json('Page Not Found'));
    app.use(globalErrorHandler);
    app.listen(env.Port, ()=> console.log(`server is running on port ${env.Port}`));
}



