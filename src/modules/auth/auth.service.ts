import { LoginDTO, SignUpDTO } from "./auth.dto";
import { IUser } from "../../common/interfaces/index";
import  { userModel }  from "../../database/models/index";
import { HydratedDocument, Model } from "mongoose";
import { BadRequestException, conflictException, NotFoundException, UnAuthorizedException } from "../../common/exceptions";
import { DatabaseRepository } from './../../database/repository/base.repository';
import { SecurityService } from './../../common/services/security.service';
import { createOTP, event , sendEmail } from "../../common/utils/email/index";
import { RedisService } from "../../common/services";

class AuthService{
    private userModel : Model<IUser>;
    private userRepository: DatabaseRepository<IUser>
    private SecurityService: SecurityService
    private redisService: RedisService
    constructor(){
        this.userModel = userModel;
        this.userRepository = new DatabaseRepository(this.userModel);
        this.SecurityService = new SecurityService;
        this.redisService = new RedisService;
    }

    async signup(data: SignUpDTO) : Promise<IUser> {
        const existUser = await this.userRepository.findOne({email : data.email});
        if (existUser)   throw new conflictException("user already exists");

        data.password = await this.SecurityService.generateHash({plainText: data.password});
        let userData : HydratedDocument<IUser> = await this.userRepository.create(data);
        if (!userData) {
            throw new BadRequestException("can't create user");
        }
         
        let code = createOTP();
        let hashedOTP = await this.SecurityService.generateHash({plainText:code})
        await this.redisService.set({
            key: `OTP::${userData._id}`,
            value: hashedOTP,
            ttl: 5 * 60 // 5 minutes
        })
        await sendEmail({
            to: data.email,
            subject: "user registerd successfully please verify your email" ,
            html: `<h1>Hello: ${data.userName}</h1>
                <p> your otp is: ${code} </p>
                <p>Note: this otp is valid for 5 minutes</p>
            `
        });
        return userData;
    }

    async verifyEmail ({code, email}:{code:string,email:string}){
    let user = await this.userRepository.findOne({
        email
    })
    if (!user) { 
        
    }

    if(user?.confirmEmail) { 
        throw new BadRequestException('user is already verified');
    }
    
    let redisCode = await this.redisService.get(redisKey("OTP",user));

    let compared = await this.SecurityService.compareHash(code, redisCode);
    if (!compared) { 
        throw new UnAuthorizedException('Incorrect OTP')
    }

    user = await this.userRepository.findOneAndUpdate({
        model: userModel,
        filter: {_id: user._id},
        update: {isVerified: true},
        options: {returnDocument: 'after'}
    })


    if (!user) { 
        throw new BadRequestException('unexpected error');
    }
    event.emit("Confirmation", { email: user.email, userName: user.userName});
    return {user}
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

        await event.emit("Login",userData);
        return userData; 
    }
}


export default new AuthService