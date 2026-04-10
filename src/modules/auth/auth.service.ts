import { ApplicationError } from "../../common/exceptions/application.exception";
import { LoginDTO, SignUpDTO } from "./auth.dto";

class AuthService{
    constructor(){}

    login(data: LoginDTO) : LoginDTO {
        throw new ApplicationError ("method not implemented" , 400)
        return data;
    }

    signup(data: SignUpDTO) : SignUpDTO {
        return data;
    }
}


export default new AuthService