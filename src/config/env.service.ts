import { config } from "dotenv";

import path from 'path';

config({path: path.resolve(`./.env.${process.env.NODE_ENV}`)});


const mongoURI = process.env.MONGO_URI as string;
const REDIS_URI = process.env.REDIS_URI as string;
const Salt = process.env.SALT as string;
const Secret = process.env.SECRET as string;
const Port = process.env.PORT as string;
const envMood = process.env.MOOD as string;
const Jwt_Key = process.env.JWT_KEY as string;
const JwtAdminSignature = process.env.JWT_ADMIN_SIGNATURE as string;
const JwtUserSignature = process.env.JWT_USER_SIGNATURE as string;
const JwtAdminRefreshSignature = process.env.JWT_ADMIN_REFRESH_SIGNATURE as string;
const JwtUserRefreshSignature = process.env.JWT_USER_REFRESH_SIGNATURE as string;
const BASE_URL = `${process.env.BASE_DOMAIN}${Port}` as string;
const AppEmail = process.env.APP_EMAIL as string;
const AppPassword = process.env.APP_PASSWORD as string;

export const env = {
    mongoURI,
    REDIS_URI ,
    Salt ,
    Secret ,
    Port ,
    envMood ,
    Jwt_Key ,
    JwtAdminSignature , 
    JwtUserSignature ,
    JwtAdminRefreshSignature ,
    JwtUserRefreshSignature , 
    BASE_URL , 
    AppEmail , 
    AppPassword
}