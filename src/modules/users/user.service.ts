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

    async saveAndReturnData(userData: HydratedDocument<IUser> , url: string = "") : Promise<{userData: HydratedDocument<IUser> , url: string}>{
        await userData.save();
        return {userData ,url};
    }

    async updateProfile(userId:string ,data: any , file?: Express.Multer.File) : Promise<{userData: HydratedDocument<IUser> , url: string}> {
        let { phone } = data
        if (!userId) { 
            throw new UnAuthorizedException("user id not found");
        }
        let userData = await this.userRepository.findById(userId);
        if (!userData) { 
            throw new NotFoundException("User Not Found");
        }
        if (file) { 
            let {url,key} = await s3service.createPreSignUrl({
                path: `${userData._id}/profile-pic`
            }) 
            if (!key) { 
                throw new NotFoundException("asset key not found");
            }
            userData.profilePic = key as string;
            return await this.saveAndReturnData(userData , url)
        }
        else { 
            userData.phone = phone;
            return await this.saveAndReturnData(userData)
        }
    }

    async updateCoverPic(userId:string , files: Express.Multer.File[]) : Promise<HydratedDocument<IUser>> {
        if (!userId) { 
            throw new UnAuthorizedException("user id not found");
        }
        let userData = await this.userRepository.findById(userId);
        if (!userData) { 
            throw new NotFoundException("User Not Found");
        }

        if (files.length > 0) { 
            let {key , result} = await s3service.uploadAssets({
                path: `${userData._id}/cover-pic`,
                files
            })
            userData.profileCoverPic = result as string[];
        }
        await userData.save();
        return userData;
 }
}


export const userService = new UserService();