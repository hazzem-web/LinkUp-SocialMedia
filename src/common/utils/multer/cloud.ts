import multer from "multer"

export const uploadFile = ()=> {
    const storage = multer.memoryStorage();  
    return multer({storage});   
}