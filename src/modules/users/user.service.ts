import { HydratedDocument, Types } from "mongoose";
import { IUser } from "../../common/interfaces";
import { userModel } from "../../database/models";
import { DatabaseRepository } from "../../database/repository/base.repository";
import { NotFoundException, UnAuthorizedException } from "../../common/exceptions";
import { s3service } from "../../common/services";
import { MulterEnum } from "../../common/enums/multer.enum";

 export class UserService {
    private userRepository : DatabaseRepository<IUser>
    constructor(){
        this.userRepository = new DatabaseRepository<IUser>(userModel)
    }

    async getUserProfile(userId:string): Promise<HydratedDocument<IUser>>{
        if (!userId) { 
            throw new UnAuthorizedException("user id not found");
        }
        let userData = await this.userRepository.findById(userId , "-password")
        if (!userData) { 
            throw new NotFoundException("User Not Found");
        }
        return userData;
    }

    async updateProfile(userId:string , file?: Express.Multer.File) {
        if (!userId) { 
            throw new UnAuthorizedException("user id not found");
        }
        let userData = await this.userRepository.findById(userId);
        if (!userData) { 
            throw new NotFoundException("User Not Found");
        }
        
        if (file) { 
            userData.profilePic = await s3service.uploadAsset({
                storageKey: MulterEnum.diskStorage,
                path: `${userData._id}/profile-pic`,
                file
            }) as unknown as string
            await userData.save();
        }   
        return userData;
    }
}


export const userService = new UserService();