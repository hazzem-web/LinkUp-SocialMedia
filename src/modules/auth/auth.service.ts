import { LoginDTO, SignUpDTO } from "./auth.dto";
import { IUser } from "../../common/interfaces/index";
import  { userModel }  from "../../database/models/index";
import { Model } from "mongoose";

class AuthService{
    private userModel : Model<IUser>
    constructor(){
        this.userModel = userModel;
    }

    async signup(data: SignUpDTO) : Promise<any> {
        let result = await userModel.create(data);
        return result;
    }

    login(data: LoginDTO) : LoginDTO {
        return data;
    }
}


export default new AuthService