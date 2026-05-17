import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { visibilityEnum } from "../enums";




export interface IPost { 
    userId : Types.ObjectId | IUser
    content? : string,
    attachments? : string[],
    tags?: string[] | IUser[],
    createdAt : Date,
    updatedAt : Date,
    deletedAt?: Date,
    restoredAt?: Date,  
    visibility: visibilityEnum
}