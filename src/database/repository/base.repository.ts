import { IUser } from "../../common/interfaces/index";
import { Model , HydratedDocument , PopulateOptions } from "mongoose";
export class DatabaseRepository<TRawDocs> {
    constructor(private model : Model<TRawDocs>){
        this.model = model;
    }

    create(data: Partial<TRawDocs>): Promise<HydratedDocument<TRawDocs>> {
        return this.model.create(data);
    }

    async findOne(
        filter: Partial<TRawDocs>,
        select?:  string | Record<string, 0 | 1>,
        populate?: PopulateOptions | (string | PopulateOptions)[]
    ) { 
        let doc = this.model.findOne(filter);
        if (select) { 
            doc = doc.select(select);
        }
        if (populate) { 
            doc = doc.populate(populate);
        }
        return doc;
    }
}