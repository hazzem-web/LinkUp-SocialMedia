import mongoose from "mongoose";
import { IPost } from "../../common/interfaces";
import { Types } from "mongoose";
import { visibilityEnum } from "../../common/enums";

const postSchema = new mongoose.Schema<IPost>({
    userId: { 
        type: Types.ObjectId,
        ref: "User"
    },
    attachments: [{
        type: String
    }],
    content: {
        type: String,
        required: function () {
            return this.attachments?.length == 0
        }
    },
    tags: [{
        type: Types.ObjectId,
        ref: "User"
    }],
    deletedAt: {
        type: Date
    },  
    restoredAt: {
        type: Date
    },
    visibility: {
        type: String,
        enum: Object.values(visibilityEnum),
        default: visibilityEnum.Public
    }
}, {
    timestamps: true,
    strictQuery: true
})


const postModel = mongoose.model<IPost>("Post", postSchema);

export default postModel;

