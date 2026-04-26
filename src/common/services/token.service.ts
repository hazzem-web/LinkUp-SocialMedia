import jwt from 'jsonwebtoken';
import { env } from './../../config/env.service';
import { UnAuthorizedException } from '../exceptions';
import { v4 as uuidv4 } from 'uuid';
import { redisService, RedisService } from './redis.service';

export class TokenService {
    private redisService:RedisService
  constructor() {
    this.redisService = redisService;
  }

  generateToken = async(user: any):Promise<{accessToken:string, refreshToken:string}> => {
    let signature = undefined;
    let audience = undefined;
    let refreshSignature = undefined;
    switch (user.role) {
      case "0":
        signature = env.JwtAdminSignature;
        refreshSignature = env.JwtAdminRefreshSignature;
        audience = "Admin";
        break;
      default:
        signature = env.JwtUserSignature;
        refreshSignature = env.JwtUserRefreshSignature;
        audience = "User";
        break;
    }
    const jti = uuidv4();
    let accessToken = jwt.sign({ id: user._id, jti }, signature, {
      expiresIn: "30m",
      // notBefore: "30s",
      audience
    });
    const refreshJti = uuidv4();
    let refreshToken = jwt.sign(
      { id: user._id, jti: refreshJti },
      refreshSignature,
      {
        expiresIn: "1y",
        // notBefore: "30s",
        audience
      },
    );
    let decoded:any = jwt.verify(accessToken, signature);
    const ttl = decoded.exp - decoded.iat;
    const revokeKey = this.redisService.generateRevokeKey({ userId: user.id, jti });
    await this.redisService.set({
      key: revokeKey,
      value: 0,
      ttl,
    });
    

    return { accessToken, refreshToken } ;
  };

//   decodeToken = (token) => {
//     let decoded = jwt.decode(token);
//     if (!decoded) {
//       return new UnAuthorizedException("un Authorized");
//     }
//     let signature = undefined;
//     switch (decoded.aud) {
//       case "Admin":
//         signature = env.JwtAdminSignature;
//         break;

//       default:
//         signature = env.JwtUserSignature;
//         break;
//     }
//     let verified = jwt.verify(token, signature);
//     return verified;
//   };

//   decodeRefreshToken = (token) => {
//     let decoded = jwt.decode(token);
//     if (!decoded) {
//       return new UnAuthorizedException("un Authorized");
//     }
//     let refreshSiganture = undefined;
//     switch (decoded.aud) {
//       case "Admin":
//         refreshSiganture = env.JwtAdminRefreshSignature;
//         break;

//       default:
//         refreshSiganture = env.JwtUserRefreshSignature;
//         break;
//     }
//     let verified = jwt.verify(token, refreshSiganture);
//     return verified;
//   };
}
