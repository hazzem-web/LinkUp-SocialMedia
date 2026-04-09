import { Router } from 'express';

import type { Request , Response } from 'express';
import AuthService from './auth.service';


const router: Router = Router()

router.post('/login', async(req: Request,res: Response)=>{
    let data = AuthService.login(req.body);
    console.log(data);
    res.json({message: 'user login successfully', data});
})


router.post('/signup', async(req: Request,res: Response)=>{
    let data = AuthService.signup(req.body);
    console.log(data);
    res.json({message: 'user signup successfully', data});
})


export default router ;