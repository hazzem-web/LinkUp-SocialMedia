import express from 'express';

import type {Express , Request , Response} from 'express';

export const boostrap = (): void=>{
    const app: Express = express();

    app.get('/',(req:Request,res:Response)=>{
        res.json({message: 'hello from social media app'});
    })
    app.listen(3000, ()=> console.log(`server is running on port 3000`));
}



