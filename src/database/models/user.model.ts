import mongoose from "mongoose";
import { IUser } from "../../common/interfaces/index";
import { GenderEnum, ProviderEnum, RoleEnum } from "../../common/enums/index";


const userSchema = new mongoose.Schema<IUser>({
<<<<<<< HEAD
=======
    userName: {
        type: String
    },
>>>>>>> 4cd8806d43cae519a6537e0e5e67154204f99013
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    profilePic: {
        type: String
    },
    profileCoverPic: {
        type: [String]
    },
    password: {
        type: String,
        required: function(this){
            return this.provider === ProviderEnum.System
        }
    },
    gender: {
        type: Number,
        default: GenderEnum.Male
    },
    role: {
        type: Number,
        default: RoleEnum.User
    },
    provider: {
        type: Number,
        default: ProviderEnum.System
    },
    twoFA: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
    toObject:{
        virtuals: true
    }
});


userSchema.virtual('userName').set(function (value){
    let [firstName, lastName] = value.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
})
.get(function(){
    return `${this.firstName} ${this.lastName}`; 
})

export const userModel = mongoose.model<IUser>('users', userSchema);