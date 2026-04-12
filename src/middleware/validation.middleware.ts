import { Request , Response , NextFunction } from "express"
import { BadRequestException } from "../common/exceptions/application.exception";
import { ZodError, ZodType } from "zod";

type ValidationKey = keyof Request;
type ValidationSchema = Partial<Record<ValidationKey , ZodType>>

export const valiation = (Schema: ValidationSchema)=>{
    return ((req: Request, res: Response, next: NextFunction)=>{
        let validationError: { key: ValidationKey , issue: ZodError["issues"] }[] = [];

        for ( const key of Object.keys(Schema) as ValidationKey[]) {
            if (!Schema[key]){
                continue;
            }
            const value = Schema[key].safeParse(req[key]);
            
            if (!value.success) { 
                validationError.push({key , issue: value.error.issues});
            }
        }

        if (validationError.length > 0) { 
            throw new BadRequestException("Validation Error", validationError);
        }
        next();
    })
}