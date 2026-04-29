import { LoginDTO, SignUpDTO } from "./auth.dto";
import { IUser } from "../../common/interfaces/index";
import { userModel } from "../../database/models/index";
import { HydratedDocument, Model, Types } from "mongoose";
import {
  BadRequestException,
  conflictException,
  NotFoundException,
  UnAuthorizedException,
} from "../../common/exceptions";
import { DatabaseRepository } from "./../../database/repository/base.repository";
import { SecurityService } from "./../../common/services/security.service";
import { createOTP, event, sendEmail } from "../../common/utils/email/index";
import { redisService } from "../../common/services";
import { RedisService } from "./../../common/services/redis.service";
import { TokenService } from "./../../common/services/token.service";
import { ProviderEnum } from "../../common/enums";
import {OAuth2Client} from 'google-auth-library';
class AuthService {
  private userModel: Model<IUser>;
  private userRepository: DatabaseRepository<IUser>;
  private SecurityService: SecurityService;
  private redisService: RedisService;
  private tokenService: TokenService;
  constructor() {
    this.userModel = userModel;
    this.userRepository = new DatabaseRepository(this.userModel);
    this.SecurityService = new SecurityService();
    this.redisService = new RedisService();
    this.tokenService = new TokenService();
  }

  async signup(data: SignUpDTO): Promise<IUser> {
    const existUser = await this.userRepository.findOne({ email: data.email });
    if (existUser) throw new conflictException("user already exists");

    data.password = await this.SecurityService.generateHash({
      plainText: data.password,
    });
    let userData: HydratedDocument<IUser> =
      await this.userRepository.create(data);
    if (!userData) {
      throw new BadRequestException("can't create user");
    }

    event.emit("verifyEmail", userData);
    return userData;
  }

  async signupGoogle(data: any) {
    let { idToken }:{idToken:string} = data;
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
      idToken,
      audience: "",
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      throw new NotFoundException("Payload Not Found or not complete");
    }
    if (!payload.email_verified) {
      throw new BadRequestException("email not verified");
    }

    let existUser = await this.userRepository.findOne({
      email: payload.email,
    });
    if (existUser) {
      throw new conflictException("user already exists");
    }
    let addedUser = await this.userRepository.create({
      // ! is mean find if exists
      userName: payload.name!,
      email: payload.email!,
      provider: ProviderEnum.Google!,
    });

    if (!addedUser) {
      throw new BadRequestException("something went wrong");
    }

    return addedUser;
  }

  async verifyEmail({ code, email }: { code: string; email: string }) {
    let user = await this.userRepository.findOne({
      email,
    });
    if (!user) {
      throw new NotFoundException("user not found");
    }

    if (user?.confirmEmail) {
      throw new BadRequestException("user is already verified");
    }

    let redisCode = await redisService.get(`OTP::${user?._id}`);

    if (!redisCode) {
      throw new UnAuthorizedException("OTP expired or not found");
    }
    let compared = await this.SecurityService.compareHash({
      plainText: code,
      cypherText: redisCode,
    });
    if (!compared) {
      throw new UnAuthorizedException("Incorrect OTP");
    }

    user = await this.userRepository.findByIdAndUpdate(
      user?._id as Types.ObjectId,
      { confirmEmail: true },
      { returnDocument: "after" },
    );

    this.redisService.redisDelete(`otp::${user?._id}`);

    if (!user) {
      throw new BadRequestException("unexpected error");
    }
    event.emit("Confirmation", { email: user.email, userName: user.userName });
    return { user };
  }

  async login(data: LoginDTO) {
    let { email, password } = data;
    let userData = await this.userRepository.findOne(
      { email, provider: ProviderEnum.System },
      "-__v",
    );
    if (!userData) {
      throw new NotFoundException("User Not Found");
    }
    let matched = await this.SecurityService.compareHash({
      plainText: password,
      cypherText: userData.password,
    });
    if (!matched) {
      throw new UnAuthorizedException("Wrong Password");
    }
    let { accessToken, refreshToken } =
      await this.tokenService.generateToken(userData);
    event.emit("Login", userData);
    return { userData, accessToken, refreshToken };
  }
}

export default new AuthService();
