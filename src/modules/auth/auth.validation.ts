import {z, ZodError} from "zod"

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*-+]).{8,}$/;
export const phonePattern = /^\+?[1-9]\d{1,14}$/

export const SignUpSchema = {
    body: z.strictObject({
        name: z.string().min(3, {error: "min length is 3"}).max(20 , {error: "max length is 20"}),
        email: z.email({message: "invalid email"}),
        password: z.string().min(8 , {error: "min length is 8"}).max(20 , {error: "max length is 20"}).regex(passwordRegex),
        confirmPassword: z.string().min(8 , {error: "min length is 8"}).max(20 , {error: "max length is 20"}).regex(passwordRegex)
    }).superRefine((data,ctx)=>{
        if (data.confirmPassword !== data.password) { 
            ctx.addIssue({code: "custom", message: 'password not match', path: ["confirmPassword"]});
        }
    }
)
}   



export const LoginSchema = {
    body: z.strictObject({
        email: z.email({message: "invalid email"}),
        password: z.string().min(8 , {error: "min length is 8"}).max(20 , {error: "max length is 20"}).regex(passwordRegex)
    })
}  

  