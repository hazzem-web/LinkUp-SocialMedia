import { LoginDTO, SignUpDTO } from "./auth.dto";
import { IUser } from "../../common/interfaces/index";
import  { userModel }  from "../../database/models/index";
import { HydratedDocument, Model } from "mongoose";
import { BadRequestException, conflictException, NotFoundException, UnAuthorizedException } from "../../common/exceptions";
import { DatabaseRepository } from './../../database/repository/base.repository';
import { compareHash, generateHash } from "../../common/utils/security/index";
import { SecurityService } from './../../common/services/security.service';

class AuthService{
    private userModel : Model<IUser>;
    private userRepository: DatabaseRepository<IUser>
    private SecurityService: SecurityService
    constructor(){
        this.userModel = userModel;
        this.userRepository = new DatabaseRepository(this.userModel);
        this.SecurityService = new SecurityService;
    }

    async signup(data: SignUpDTO) : Promise<IUser> {
        const existUser = await this.userRepository.findOne({email : data.email});
        if (existUser)   throw new conflictException("user already exists");
        
        data.password = await this.SecurityService.generateHash({plainText: data.password});
        let result : HydratedDocument<IUser> = await this.userRepository.create(data);
        if (!result) {
            throw new BadRequestException("can't create user");
        }
        return result;
    }

    async login(data: LoginDTO) : Promise<HydratedDocument<IUser> | null> {
        let userData = await this.userRepository.findOne({ email: data.email}, "-__v");
        if (!userData) { 
            throw new NotFoundException("User Not Found");
        }
        let matched = await this.SecurityService.compareHash({plainText: data.password , cypherText: userData.password});

        if (!matched) { 
            throw new UnAuthorizedException("Wrong Password");
        }

        return userData;        
    }

}


export default new AuthService