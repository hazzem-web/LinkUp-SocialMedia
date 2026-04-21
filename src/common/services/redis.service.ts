import { createClient, RedisArgument, RedisClientType } from "redis";
import { env } from "../../config/env.service";
import { Types } from "mongoose";
import { databaseConnection } from "../../database/connection";
import { NotFoundException } from "../exceptions";

export class RedisService {
  private client: RedisClientType;
  constructor() {
    this.client = createClient({ url: env.REDIS_URI });
    this.handleConnection();
  }

  handleConnection() {
    this.client.on("error", () => {
      return console.log("redis connection error");
    });

    this.client.on("ready", () => {
      return console.log("redis is ready");
    });
  }

  connect() {
    this.client.connect();
    console.log("redis connected successfully"); 
  }

  set = async ({ key, value, ttl } : {
    key:RedisArgument,
    value: any,
    ttl?: number
  }) : Promise<string | null> => {
    if (typeof value == "object") {
      value = JSON.stringify(value);
    }
    if (ttl) {
      let expiredData = await this.client.set(key, value, { EX: ttl });
      return expiredData;
    }
    let data = await this.client.set(key, value);
    return data;
  };

  get = async (key:RedisArgument) : Promise<string | null> => {
    let data = await this.client.get(key);
    if (!data) { 
        throw new NotFoundException("Key Not Found");
    }
    try {
      data = JSON.parse(data);
    } catch (error) {}
    return data;
  };

  ttl = async (key:RedisArgument) : Promise<number> => {
    let data = await this.client.ttl(key);
    return data;
  };

  exists = async (key:RedisArgument) : Promise<number> => {
    let existedData = await this.client.exists(key);
    return existedData;
  };

  increment = async (key:RedisArgument) : Promise<number> => {
    let incrementedData = await this.client.incr(key);
    return incrementedData;
  };

  redisDelete = async (key:RedisArgument) : Promise<number> => {
    let deletedData = await this.client.del(key);
    return deletedData;
  };

  mSet = async (...keys:RedisArgument[]) : Promise<"OK"> => {
    let data = await this.client.mSet(keys);
    return data;
  };

  mget = async (...keys:RedisArgument[]) : Promise<(string | null)[]> => {
    let data = await this.client.mGet(keys);
    return data;
  };

  keys = async (prefix:string) : Promise<string[]> => {
    let data = await this.client.keys(`${prefix}*`);
    return data;
  };

  generateRevokeKey = ({ userId, jti } = {userId: Types.ObjectId , jti: String}) : string => {
    return `revokeToken::${userId}::${jti}`;
  };
}

export const redisService = new RedisService();
