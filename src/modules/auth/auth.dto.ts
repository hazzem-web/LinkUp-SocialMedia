import { z } from 'zod';
import { LoginSchema, SignUpSchema } from './auth.validation';


export type SignUpDTO = z.infer<typeof SignUpSchema.body>;

export type LoginDTO = z.infer<typeof LoginSchema.body>;