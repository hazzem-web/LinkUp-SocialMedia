import mongoose from 'mongoose';
import { env } from '../config/env.service';

export const databaseConnection = async()=>{
    await mongoose.connect(env.mongoURI).then(()=>{
        console.log("database connected successfully");
    }).catch((err)=> console.error("can't connect to database", err))
};