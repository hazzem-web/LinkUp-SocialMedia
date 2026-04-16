import { LoginDTO, SignUpDTO } from "./auth.dto";
import { IUser } from "../../common/interfaces/index";
import  { userModel }  from "../../database/models/index";
import { HydratedDocument, Model } from "mongoose";
import { BadRequestException, NotFoundException } from "../../common/exceptions";
import { DatabaseRepository } from './../../database/repository/base.repository';

class AuthService{
    private userModel : Model<IUser>;
    private userRepository: DatabaseRepository<IUser>
    constructor(){
        this.userModel = userModel;
        this.userRepository = new DatabaseRepository(this.userModel);
    }

    async signup(data: SignUpDTO) : Promise<IUser> {
        let result : HydratedDocument<IUser> = await this.userRepository.create(data);
        if (!result) {
            throw new BadRequestException("can't create user");
        }
        return result;
    }

    async login(data: LoginDTO) : Promise<HydratedDocument<IUser> | null> {
        let userData = await this.userRepository.findOne({ email: data.email , password: data.password}, "-password -__v");
        if (!userData) { 
            throw new NotFoundException("User Not Found");
        }
        return userData;        
    }
}


export default new AuthService