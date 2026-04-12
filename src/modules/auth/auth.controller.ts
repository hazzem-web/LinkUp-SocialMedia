import { Router } from 'express';

import type { Request , Response } from 'express';
import AuthService from './auth.service';
import { SuccessResponse } from '../../common/exceptions/success.response';
import { SignUpSchema } from './auth.validation';
import { valiation } from '../../middleware/validation.middleware';


const router: Router = Router()


router.post('/signup', valiation(SignUpSchema) , async(req: Request,res: Response)=>{
    const data = AuthService.signup(req.body);
    console.log(data);
    return SuccessResponse({res, message: "user signup successfully", status:201, data});
})

router.post('/login', async(req: Request,res: Response)=>{
    let data = AuthService.login(req.body);
    return SuccessResponse({res, message: "user login successfully", status:200, data}); 
})



export default router ;