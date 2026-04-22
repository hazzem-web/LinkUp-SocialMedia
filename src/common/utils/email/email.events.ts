import { EventEmitter } from "events";
import { generateHash } from "../security/index";
import { redisService } from "../../services/index";
import { sendEmail } from "./sendEmail";
import { IUser } from './../../interfaces/user.interface';
import { HydratedDocument, Types } from 'mongoose';


export let event = new EventEmitter();

export function createOTP():string{
    let code: number|string = Math.floor(Math.random() * 1000000)
    code = code.toString().padStart(6,"0"); 
    return code;
} 

const redisKey = (type: string, identifier: Types.ObjectId | string ): string => {
    return `user::${type}::${identifier}`;
};

event.on("verifyEmail", async(data: HydratedDocument<IUser>)=>{
    let {_id , email , userName} = data;            
    let code = createOTP();
    await redisService.set({
        key: redisKey("OTP",_id),
        value: await generateHash({plainText:code}),
        ttl: 5 * 60 // 5 minutes
    })
    await sendEmail({
        to: email,
        subject: "user registerd successfully please verify your email" ,
        html: `<h1>Hello: ${userName}</h1>
            <p> your otp is: ${code} </p>
            <p>Note: this otp is valid for 5 minutes</p>
        `
    });
})


event.on("Confirmation", async({email , userName}:{email:string , userName:string})=>{
    await sendEmail({
        to: email,
        subject: "email verified successfully",
        html: `<h1>Hello: ${userName}</h1>
            <p>your acoount is verified via otp</p>`
    })  
})



event.on("toggle", async(user: HydratedDocument<IUser>)=>{
    let code = createOTP();
    await redisService.set({
        key: redisKey("2SV",user._id),
        value: await generateHash({plainText: code}),
        ttl: 5 * 60
    })
    await sendEmail({
        to: user.email,
        subject: user.twoFA ? "Disable Two Step Verification" : "Enable Two Step Verification",
            html: `<h1>Hello: ${user.userName}</h1>
            <p> your otp is: ${code} </p>
            <p>Note: this otp is valid for 5 minutes</p>
        `
    })
})


event.on("verifyTwoStep", async(user: HydratedDocument<IUser>)=>{
    let message = user.twoFA ? " Two Step Verification Enabled Successfully" : " Two Step Verification Disabled Successfully";
    await sendEmail({
        to: user.email,
        subject: "twoStepVerification State",
        html: `<h1>Hello: ${user.userName}</h1>
        <p> ${message}</p>
     `
    })
})



event.on("twoStepLogin", async(user: HydratedDocument<IUser>)=>{
    let OTP = createOTP();
    await redisService.set({
        key: redisKey("OTP::login",user.email),
        value: await generateHash({plainText: OTP}),
        ttl: 5 * 60
    })
    await sendEmail({
        to: user.email,
        subject: "Login With Two Step Verifiction",
        html: `<h1>Hello: ${user.userName}</h1>
            <p> please use this otp to login: ${OTP} </p>
        <p>Note: this otp is valid for 5 minutes</p>
        `
    })
})


event.on("twoStepLoginVerify", async(user: HydratedDocument<IUser>)=>{
    await sendEmail({
        to: user.email,
        subject: " User Logined With Two Step Verifiction Successfully",
        html: `<h1>Hello: ${user.userName}</h1>
            <p>you are now logged in successfully with two step verification</p>
        `
    })
})

event.on("forgetPassword", async(user: HydratedDocument<IUser>)=>{
    let OTP = createOTP();
    await redisService.set({
        key: redisKey("OTP::reset",user.email),
        value: await generateHash({plainText: OTP}),
        ttl: 5 * 60
    })

    await sendEmail({
        to: user.email,
        subject: "Reset Password With OTP",
        html: `<h1>Hello ${user.userName}</h1>
            <p> please use this otp to reset your password: ${OTP}</p>
        <p>Note: this otp is valid for 5 minutes</p>
      `
    })
})

event.on("resetPassword", async(user: HydratedDocument<IUser>)=>{
    await sendEmail({
        to: user.email,
        subject: "Password Reset Successfully With OTP",
        html: `<h1>Hello: ${user.userName}</h1>
            <p>Password Reset Successfully , Login With Your New Password</p>
        `
    })
})