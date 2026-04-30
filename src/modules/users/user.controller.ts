import { Router , Request , Response } from 'express';
import { userService } from './user.service';
import { auth } from '../../middleware/auth.middleware';
import { NotFoundException, SuccessResponse } from '../../common/exceptions';
import { Types } from 'mongoose';

const router: Router = Router();

router.get('/get-user-profile', auth ,async (req:Request,res:Response)=>{
    let userData = await userService.getUserProfile(req.userId as string);
    return SuccessResponse({res, message: "user data retrieved successfully", status: 200, data:userData});
})

export default router ;