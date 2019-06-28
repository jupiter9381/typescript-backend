import MongoModel from "./MongoModel";
import { Collection } from "../decorators/ModelDecorators";
import ILocation from "../interfaces/Location.interface";
import IOrderItem from "../interfaces/OrderItem.interface";
import IUser from "../interfaces/User.interface";
import { ObjectID } from "bson";
import { OrderStatus } from "./EnumerableAttributes";

@Collection
export default class AdminRequest extends MongoModel {
    public requestTitle: string;
    public requestBody: any;
    public requestParams: string;
    public vendor: any;
    public createdAt: Date;
    public updatedAt: Date;
    public status: string;
    public statusCode: number;
    // public requestUrl: string;
    // public requestType: string;

    constructor(obj?) {
        // const documentKeys = ["_id", "requestTitle", "requestType", "requestUrl", "requestBody", "requestParams", "vendor", "createdAt", "updatedAt", "status", "statusCode"];
        const documentKeys = ["_id", "requestTitle", "requestParams", "requestBody", "vendor", "createdAt", "updatedAt", "status", "statusCode"];
        super(obj, documentKeys);
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
}