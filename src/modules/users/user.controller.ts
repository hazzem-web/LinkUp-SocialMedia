import { Router , Request , Response } from 'express';
import { userService } from './user.service';
import { auth } from '../../middleware/auth.middleware';
import { NotFoundException, SuccessResponse } from '../../common/exceptions';
import { Types } from 'mongoose';
import { uploadFile } from '../../common/utils/multer/cloud';
import { MulterEnum } from '../../common/enums/multer.enum';

const router: Router = Router();

router.get('/get-user-profile', auth ,async (req:Request,res:Response)=>{
    let userData = await userService.getUserProfile(req.userId as string);
    return SuccessResponse({res, message: "user data retrieved successfully", status: 200, data:userData});
})

router.patch('/update-profile', auth , uploadFile({storageKey:MulterEnum.diskStorage}).single("file") ,async(req:Request, res:Response)=>{
    console.log(req.file);
    let userData = await userService.updateProfile(req.userId as string);
    return SuccessResponse({res, message: "user updated successfully", status: 200, data: userData});  
})

export default router ; 