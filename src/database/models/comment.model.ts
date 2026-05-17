import mongoose, { Types } from "mongoose";
import { IComment } from "../../common/interfaces";

const commentSchema = new mongoose.Schema<IComment>({
    userId: { 
        type: Types.ObjectId, 
        ref: "User",
    },
    postId: { 
        type: Types.ObjectId, 
        ref: "Post",
    },
    content: { 
        type: String, 
        required: true 
    },
}, { timestamps: true })

const commentModel = mongoose.model<IComment>("Comment", commentSchema);
export default commentModel;