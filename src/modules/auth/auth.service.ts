import { LoginDTO, SignUpDTO } from "./auth.DTO";

class AuthService{
    constructor(){}

    login(data: LoginDTO) : LoginDTO {
        console.log(data , " from class");
        return data;
    }

    signup(data: SignUpDTO) : SignUpDTO {
        return data;
    }
}


export default new AuthService