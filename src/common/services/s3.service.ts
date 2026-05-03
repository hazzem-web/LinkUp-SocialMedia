import { ObjectCannedACL, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
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

    async uploadAsset({
        Bucket = env.AWS_BUCKET_NAME,
        path = 'general',
        file,
        ACL = ObjectCannedACL.private,
        contentType 
    }:{
        Bucket?: string,
        path?: string,
        file: Express.Multer.File,
        ACL?: ObjectCannedACL,
        contentType?: string
    }){
        const key = `linkup/${path}/${Math.round(Math.random() * 1e9)}-${file.originalname}`;
        const result = await this.client.send(new PutObjectCommand({
            Bucket,
            Key: key,
            ACL,
            Body: file.buffer,
            ContentType: contentType || file.mimetype
        }))
        return key;
    }
}


export const s3service = new S3Service();