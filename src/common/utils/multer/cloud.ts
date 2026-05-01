import multer from "multer"
import {tmpdir} from "node:os";
import { MulterEnum } from "../../enums/multer.enum";
import { file } from "zod";
console.log(tmpdir());
export const uploadFile = ({
    storageKey = MulterEnum.memoryStorage
}: { 
    storageKey?:MulterEnum
})=> {
    // const storage = multer.memoryStorage();  

    const storage = storageKey == MulterEnum.memoryStorage ? multer.memoryStorage(): multer.diskStorage({
        destination(req,file,cb){
            cb(null, tmpdir());
        },
        filename(req,file,cb){
            const uniqueSuffix =( Date.now() + "-" + Math.round(Math.random() * 1e9 )+ "-" + file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}`);
        }
    })
    return multer({storage});   
}