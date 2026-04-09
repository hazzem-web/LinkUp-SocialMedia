import express from 'express';
import type {Express , Request , Response} from 'express';
import cors from 'cors';
import { authRouter } from './modules';
let origin = "http://localhost:3000";
let allowedOrigins = [...origin];

export const boostrap = (): void=>{
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
    app.use('/auth', authRouter);
    app.get('/',(req:Request,res:Response)=>{
        res.json({message: 'hello from social media app'});
    })
    app.use('{*dummy}', (req,res)=> res.status(404).json('Page Not Found'));
    app.listen(3000, ()=> console.log(`server is running on port 3000`));
}



