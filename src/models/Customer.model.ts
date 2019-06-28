import MongoModel from "./MongoModel";
import { Collection } from "../decorators/ModelDecorators";
import ILocation from "../interfaces/Location.interface";
import IOrderItem from "../interfaces/OrderItem.interface";
import IUser from "../interfaces/User.interface";
import { ObjectID } from "bson";
import { OrderStatus } from "./EnumerableAttributes";
import IAddress from "../interfaces/Address.interface";

@Collection
export default class Customer extends MongoModel {
    public name: string;
    public address: IAddress;
    public phone: number;

    constructor(obj?) {
        const documentKeys = ["_id", "name", "address", "phone"];
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