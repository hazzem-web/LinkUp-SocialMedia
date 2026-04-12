import {z, ZodError} from "zod"

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*-+]).{8,}$/;
export const phonePattern = /^\+?[1-9]\d{1,14}$/

export const SignUpSchema = {
    body: z.strictObject({
        name: z.string().min(3).max(20),
        email: z.email(),
        password: z.string().min(8).max(20).regex(passwordRegex)   
    })
}   

  