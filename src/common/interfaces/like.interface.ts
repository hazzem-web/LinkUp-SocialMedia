import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { IPost } from "./post.interface";
import { IComment } from "./comment.interface";

export interface ILike { 
    userId: Types.ObjectId | IUser,
    postId?: Types.ObjectId | IPost,
    commentId?: Types.ObjectId | IComment 
}