import {z, ZodError} from "zod"

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*-+]).{8,}$/;
export const phonePattern = /^(\+20|0)?1[0125]\d{8}$/

export const SignUpSchema = {
    body: z.strictObject({
        userName: z.string().min(3, {error: "min length is 3"}).max(20 , {error: "max length is 20"}),
        email: z.email({message: "invalid email"}),
        password: z.string().min(8 , {error: "min length is 8"}).max(20 , {error: "max length is 20"}).regex(passwordRegex),
        confirmPassword: z.string().min(8 , {error: "min length is 8"}).max(20 , {error: "max length is 20"}).regex(passwordRegex),
        phone: z.string().min(9, {error: 'min length is 9'}).max(14, {error: 'max length is 14'}).regex(phonePattern).optional()
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

  