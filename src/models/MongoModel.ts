import mongoConnection from "../startup/Mongodb";
import { ObjectID } from "bson";

export default class MongoModel {
    protected collectionName = "";
    protected documentKeys = [];
    protected _id: ObjectID;

    protected async _mongoDbConnection() {
        const db = await mongoConnection();
        return db.collection(this.collectionName);
    }

    constructor(obj?, documentKeys?) {
        this.documentKeys = documentKeys;
        if (obj) {
            for (const key in obj) {
                if (this.documentKeys.indexOf(key) !== -1) {
                    this[key] = obj[key];

                }
            }

        }
    }

    static async find(filters = {}) {
        const collection = await MongoModel.modelInstanse(this)._mongoDbConnection();
        const result = await collection.find(filters).toArray();
        return result.map(queryResult => new this(queryResult));

    }

    static async aggregate(aggregation = []) {
        const collection = await MongoModel.modelInstanse(this)._mongoDbConnection();
        const result = await collection.aggregate(aggregation);
        return result.map(queryResult => new this(queryResult));

    }

    static async findOne(filters = {}) {
        const collection = await MongoModel.modelInstanse(this)._mongoDbConnection();
        const result = await collection.findOne(filters);
        return new this(result);
    }

    async save() {
        const collection = await this._mongoDbConnection();
        return await collection.insertOne(this.builder());
    }

    async update(params?) {
        const collection = await this._mongoDbConnection();
        let updatedParams = this.builder();
        if (params) {
            updatedParams = this.permitData(params);
        }
        return await collection.updateOne({_id: this._id}, {$set: updatedParams});
    }

    // static async searchInArray(filters) {
    //     // {awards: {$elemMatch: {award:'National Medal', year:1975}}}
    //     const collection = await MongoModel.modelInstanse(this)._mongoDbConnection();
    //     const result = await collection.find(filters).toArray();
    //     return result.map(queryResult => new this(queryResult));
    //
    // }


    async delete() {
        const collection = await this._mongoDbConnection();
        return await collection.deleteOne({_id: this._id});
    }

    static async lastModelId() {
        const collection = await MongoModel.modelInstanse(this)._mongoDbConnection();
        return await collection.count();
    }

    builder() {
        const builder = {};
        this["documentKeys"].forEach(key => {
            if (this[key]) {
                builder[key] = this[key];
            }
        });
        return builder;
    }

    public permitData(params) {
        const builder = {};
        for (const key in params) {
            const documentKeys: Array<string> = this["documentKeys"];

            if (key == "startDate" || key == "endDate") {
                builder[key] = params[key];

            }
            if (documentKeys.find(doc => doc == key)) {
                builder[key] = params[key];
            }
        }
        return builder;
    }

    static modelInstanse(model) {
        return new model();
    }

}