import MongoModel from "./MongoModel";
import { Collection } from "../decorators/ModelDecorators";
import ILocation from "../interfaces/Location.interface";
import IOrderItem from "../interfaces/OrderItem.interface";
import IUser from "../interfaces/User.interface";
import { ObjectID } from "bson";
import { OrderStatus } from "./EnumerableAttributes";

@Collection
export default class DriverLocation extends MongoModel {
    public driverId: number;
    public location: number;


    constructor(obj?) {
        const documentKeys = ["_id", "driverId", "location"];
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