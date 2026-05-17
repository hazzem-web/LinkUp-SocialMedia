import mongoose, { Types } from "mongoose";
import { ILike } from "../../common/interfaces";

const likeSchema = new mongoose.Schema<ILike>({
    userId: {
        type: Types.ObjectId,
        ref: "User"
    },
    postId: {
        type: Types.ObjectId,
        ref: "Post"        
    },
    commentId: {
        type: Types.ObjectId,
        ref: "Comment",
        required: function(){
            return !this.postId
        }
    }
}, {timestamps: true})

const likeModel = mongoose.model<ILike>("Like", likeSchema);

export default likeModel;