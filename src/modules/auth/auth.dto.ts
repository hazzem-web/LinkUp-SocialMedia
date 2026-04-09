export interface LoginDTO {
    email: string,
    password: string
}



export interface SignUpDTO extends LoginDTO { 
    name: string
}