import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { IPost } from "./post.interface";
import { ILike } from "./like.interface";

export interface IComment { 
    userId: Types.ObjectId | IUser,
    postId: Types.ObjectId | IPost,
    content: string,
}