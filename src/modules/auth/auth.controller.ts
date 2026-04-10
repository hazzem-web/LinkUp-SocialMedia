import { Router } from 'express';

import type { Request , Response } from 'express';
import AuthService from './auth.service';
import { SuccessResponse } from '../../common/exceptions/success.response';


const router: Router = Router()


router.post('/signup', async(req: Request,res: Response)=>{
    let data = AuthService.signup(req.body);
    return SuccessResponse({res, message: "user signup successfully", status:201, data});
})

router.post('/login', async(req: Request,res: Response)=>{
    let data = AuthService.login(req.body);
    return SuccessResponse({res, message: "user login successfully", status:200, data});
})



export default router ;