import { GenderEnum, ProviderEnum, RoleEnum } from "../enums/index";

export interface IUser  {
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    confirmEmail:boolean,
    phone: string,
    profilePic?: string,
    profileCoverPic?: string[],
    password: string,
    gender?: GenderEnum,
    role?: RoleEnum,
    provider?: ProviderEnum,
    twoFA: boolean,
    tokens?: string[] 
    createdAt?: Date,
    updatedAt?: Date
}