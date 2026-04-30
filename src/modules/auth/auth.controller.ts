import { Router } from 'express';

import type { Request , Response } from 'express';
import AuthService from './auth.service';
import { SuccessResponse } from '../../common/exceptions/success.response';
import { LoginSchema, SignUpSchema } from './auth.validation';
import { valiation } from '../../middleware/validation.middleware';
import { auth } from '../../middleware/auth.middleware';


const router: Router = Router()


router.post('/signup', valiation(SignUpSchema) , async(req: Request,res: Response)=>{
    const data = await AuthService.signup(req.body);
    return SuccessResponse({res, message: "user signup successfully", status:201, data});
})

router.post('/login', valiation(LoginSchema) , async(req: Request,res: Response)=>{
    const data = await AuthService.login(req.body);
    return SuccessResponse({res, message: "user login successfully", status:200, data}); 
})

router.put('/verify-email', async(req:Request , res:Response)=>{
    const data = await AuthService.verifyEmail(req.body);
    return SuccessResponse({res, message: 'verify email' , status:201 , data});
})


router.get('/test', auth , async(req:Request , res:Response)=>{
    res.json({message: 'test'})
})


router.post('/signup/gmail', async (req,res)=>{
    const data = await AuthService.signupGoogle(req.body);
    return SuccessResponse({res, message: 'user signup successfully', status:200, data});
})

export default router ; 