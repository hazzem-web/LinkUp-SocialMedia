import { S3Client } from "@aws-sdk/client-s3";
import { env } from "../../config/env.service";
export class S3Service { 
    private client: S3Client;

    constructor(){
        this.client = new S3Client({
            region: env.AWS_REGION,
            credentials: { 
                accessKeyId: env.AWS_ACCESS_KEY_ID,
                secretAccessKey: env.AWS_SECRET_ACCESS_KEY
            }
        })
    }
}