import { Model , HydratedDocument , PopulateOptions, QueryOptions, Types, UpdateQuery, QueryFilter , MongooseUpdateQueryOptions, MongooseBaseQueryOptions } from "mongoose";
export class DatabaseRepository<TRawDocs> {
    constructor(private model : Model<TRawDocs>){
        this.model = model;
    }

    private filterValidation(filter: Partial<TRawDocs>) {
        if (!filter || Object.keys(filter).length === 0) {
            throw new Error("Filter is required");
        }
    }

    private IdValidation(id:Types.ObjectId | string){
        if (!id || !Types.ObjectId.isValid(id)) {
            throw new Error("Invalid or missing Id");
        }
    }

    async create(data: Partial<TRawDocs>): Promise<HydratedDocument<TRawDocs>> {
        return await this.model.create(data);
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
        return await doc;
    }

    async findAll(
        filter?: Partial<TRawDocs>,
        select?: string | Record<string, 0 | 1>,
        populate?: PopulateOptions | (string | PopulateOptions)[]
    ){
        let doc = this.model.find(filter)
        if (select) {
            doc.select(select);
        }
        if (populate) { 
            doc.populate(populate);
        }
        return await doc;
    }

    async updateOne(
        filter: Partial<TRawDocs>,
        update: UpdateQuery<TRawDocs>,
        options?: MongooseUpdateQueryOptions
    ){
        this.filterValidation(filter)
        let result = this.model.updateOne(filter,update,options)
        return await result
    }

    async updateMany(
        filter: Partial<TRawDocs>,
        update: UpdateQuery<TRawDocs>,
        options?: MongooseUpdateQueryOptions
    ){
        this.filterValidation(filter)
        let result = this.model.updateMany(filter,update,options);
        return await result;
    }

    async deleteOne(
        filter: Partial<TRawDocs>,
        options?: MongooseBaseQueryOptions
    ){
        this.filterValidation(filter)
        let result = this.model.deleteOne(filter,options)
        return await result;
    }

    async deleteMany(
        filter: Partial<TRawDocs>,
        options?: MongooseBaseQueryOptions
    ){
        this.filterValidation(filter)
        let result = this.model.deleteMany(filter,options)
        return await result;
    }

    async findOneAndUpdate (
        filter: Partial<TRawDocs>,
        update: UpdateQuery<TRawDocs>,
        select?: string | Record<string, 0 | 1>,
        populate?: PopulateOptions | (string | PopulateOptions)[]
    ){
        let doc = this.model.findOneAndUpdate(filter, update,{returnDocument: "after"});
        if (select) { 
            doc.select(select);
        }
        if (populate) { 
            doc.populate(populate);
        }
        return await doc;
    }

    async findOneAndDelete(
        filter:  Partial<TRawDocs>,
        options?: QueryOptions, 
    ){
        this.filterValidation(filter)
        let doc = this.model.findOneAndDelete(filter,options);
        return await doc;
    }

    async findById(
        id: Types.ObjectId | string,
        select?: string | Record<string, 0 | 1>,
        options?: QueryOptions
    ){
        this.IdValidation(id);
        let doc = this.model.findById(id,null,options);
        if (select) {
            doc.select(select);
        }
        return await doc;
    }

    async findByIdAndUpdate(
        id: Types.ObjectId | string,
        update: UpdateQuery<TRawDocs>,
        options?: QueryOptions,
        select?: string | Record<string, 0 | 1>
    ){
        this.IdValidation(id);
        let doc = this.model.findByIdAndUpdate(id,update,{...options , returnDocument:'after'});
        if (select) { 
            doc.select(select);
        }
        return await doc;
    }

    async findByIdAndDelete(
        id: Types.ObjectId | string,
        options?: QueryOptions
    ){
        let doc = this.model.findByIdAndDelete(id,options);
        return await doc;
    }
}