import {Request , Response , NextFunction } from "express";
import { NotFoundException, UnAuthorizedException } from "../common/exceptions";
import { tokenService } from "../common/services/token.service";
import { redisService } from "../common/services";
import { JwtPayload } from 'jsonwebtoken';
import { Types } from "mongoose";


// interface AuthInterface extends Request { 
//     userId?: string,
//     token?: string,
//     decoded?: JwtPayload
// }

declare global {
    namespace Express {
        interface Request { 
            userId?: Types.ObjectId,
            token?: string,
            decoded?: JwtPayload
        }
    }
}


export const auth = async(req:Request,res:Response,next:NextFunction)=>{
    let { authorization } : any = req.headers;
    if (!authorization) { 
        throw new UnAuthorizedException("UnAuthorized");
    }
    let [flag , token]:[flag:string , token:string] = authorization.split(' ');
    if (!flag || !token) {
        throw new NotFoundException('flag or token not found');
    }
    switch (flag) {  
        case "Basic":
            let data = Buffer.from(token, 'base64').toString();
            let [email , password] = data.split(':');
            console.log(email , " " , password);
            break;  
        case "Bearer":
            let decodedData = tokenService.decodeToken(token) as JwtPayload;
            const revokeToken = redisService.generateRevokeKey({userId :decodedData.id , jti: decodedData.jti})
            let exist = await redisService.exists(revokeToken);
            if(!exist) { 
                throw new UnAuthorizedException('token revoked or expired')
            }
            req.userId = decodedData.id;
            req.token = token;
            req.decoded = decodedData;
            next();
        default: 
            throw new UnAuthorizedException("Invalid authorization scheme"); 
    }
}





