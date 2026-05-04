import { ObjectCannedACL, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "../../config/env.service";
import { MulterEnum } from "../enums/multer.enum";
import { createReadStream } from "node:fs";
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
        storageKey = MulterEnum.diskStorage,
        Bucket = env.AWS_BUCKET_NAME,
        path = 'general',
        file,
        ACL = ObjectCannedACL.private,
        contentType 
    }:{
        storageKey?:MulterEnum,
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
            Body: storageKey == MulterEnum.memoryStorage ? file.buffer : createReadStream(file.path),
            ContentType: contentType || file.mimetype
        }))
        return key;
    }
}


export const s3service = new S3Service();