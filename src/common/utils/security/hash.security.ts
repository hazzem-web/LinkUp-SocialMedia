import bcrypt from 'bcrypt';
import { env } from '../../../config/env.service';

export const generateHash = async({ plainText , salt = env.Salt}: {
    plainText: string,
    salt?: string
}): Promise<string> =>{
    return await bcrypt.hash(plainText , +salt);
}



export const compareHash = async({ plainText , cypherText}: {
    plainText: string,
    cypherText: string
}): Promise<boolean> =>{
    return await bcrypt.compare(plainText , cypherText);
}