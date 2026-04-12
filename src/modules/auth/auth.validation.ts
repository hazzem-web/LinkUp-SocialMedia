import {z, ZodError} from "zod"

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*-+]).{8,}$/;
export const phonePattern = /^\+?[1-9]\d{1,14}$/

export const SignUpSchema = {
    body: z.strictObject({
        name: z.string().min(3, {error: "min length is 3"}).max(20 , {error: "max length is 20"}),
        email: z.email({message: "invalid email"}),
        password: z.string().min(8).max(20).regex(passwordRegex),
        confirmPassword: z.string().min(8).max(20).regex(passwordRegex)
    }).refine((data)=>{
        return data.password == data.confirmPassword;
    })
}   

  