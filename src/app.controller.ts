import express from 'express';

import type {Express , Request , Response} from 'express';

import { authRouter } from './modules';

export const boostrap = (): void=>{
    const app: Express = express();
    app.use('/auth', authRouter);
    app.get('/',(req:Request,res:Response)=>{
        res.json({message: 'hello from social media app'});
    })
    app.listen(3000, ()=> console.log(`server is running on port 3000`));
}



