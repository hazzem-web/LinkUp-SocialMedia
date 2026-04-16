import { Router } from 'express';

import type { Request , Response } from 'express';
import AuthService from './auth.service';
import { SuccessResponse } from '../../common/exceptions/success.response';
import { LoginSchema, SignUpSchema } from './auth.validation';
import { valiation } from '../../middleware/validation.middleware';


const router: Router = Router()


router.post('/signup', valiation(SignUpSchema) , async(req: Request,res: Response)=>{
    const data = await AuthService.signup(req.body);
    return SuccessResponse({res, message: "user signup successfully", status:201, data});
})

router.post('/login', valiation(LoginSchema) , async(req: Request,res: Response)=>{
    const data = await AuthService.login(req.body);
    return SuccessResponse({res, message: "user login successfully", status:200, data}); 
})



export default router ;