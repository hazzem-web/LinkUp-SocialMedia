import { LoginDTO, SignUpDTO } from "./auth.dto";

class AuthService{
    constructor(){}

    login(data: LoginDTO) : LoginDTO {
        return data;
    }

    signup(data: SignUpDTO) : SignUpDTO {
        return data;
    }
}


export default new AuthService