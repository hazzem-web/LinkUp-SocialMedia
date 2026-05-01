import multer from "multer"
import {tmpdir} from "node:os";
console.log(tmpdir());
export const uploadFile = ()=> {
    // const storage = multer.memoryStorage();  

    const storage = multer.diskStorage({
        destination: (req,file,cb){
            cb(null, tmpdir());
        } , 
        filename: (req,file,cb){
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + file.originalname;
        }
    })
    return multer({storage});   
}