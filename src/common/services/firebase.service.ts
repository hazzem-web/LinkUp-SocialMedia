
import { cert, initializeApp } from 'firebase-admin/app';
import { readFileSync } from "node:fs";
import { resolve } from "path";
import { userModel } from '../../database/models';
import { Types } from 'mongoose';
import { NotFoundException } from '../exceptions';
import { getMessaging } from 'firebase-admin/messaging';

let serviceAccountBuffer = readFileSync(resolve("socialmedia-1210b-firebase-adminsdk-fbsvc-35d6810f0b.json"));
let serviceAccount = JSON.parse(serviceAccountBuffer.toString());



initializeApp({
    credential: cert(serviceAccount)
});



export let sendNotificationFirebase = async(userId:string, notification:{})=>{
    let userData = await userModel.findById(new Types.ObjectId(userId));
    if (!userData) { 
        throw new NotFoundException("user Not Found");
    }
    
    if (userData.tokens && userData.tokens.length > 0) {   
        for (const token of userData.tokens) { 
            try {
                await getMessaging().send({
                    token,
                    notification
            })
            console.log("Notification Sent Successfully");
            } catch (error:any) {
                console.log("Error: ", error.message);
            }
        }
    }
}