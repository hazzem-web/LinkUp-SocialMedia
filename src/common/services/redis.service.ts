import { createClient, RedisClientType } from "redis";
import { env } from "../../config/env.service";

export class RedisService {
    private client : RedisClientType
    constructor(){
        this.client = createClient({url: env.REDIS_URI});
        this.handleConnection();
    }

    handleConnection(){
        this.client.on("error",()=>{
            return console.log("redis connection error");
        })
        
        this.client.on("ready", ()=>{
            return console.log("redis is ready");
        })
    }

    connect(){
        this.client.connect();
        console.log("redis connected successfully");
    }
}

export const redisService = new RedisService();