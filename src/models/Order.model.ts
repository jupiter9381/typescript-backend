import MongoModel from "./MongoModel";
import { Collection } from "../decorators/ModelDecorators";
import ILocation from "../interfaces/Location.interface";
import IOrderItem from "../interfaces/OrderItem.interface";
import IUser from "../interfaces/User.interface";
import { ObjectID } from "bson";
import { OrderStatus } from "./EnumerableAttributes";

@Collection
export default class Order extends MongoModel {
    public reference: string;
    public totalPrice: number;
    public revenue: number;
    public totalQty: number;
    public vendors: Array<IOrderItem>;
    public customer: IUser;
    public specialNotes: string;
    public location: ILocation;
    public status: OrderStatus;
    public createdAt: Date;
    public updatedAt: Date;
    public paymentMethod: string;

    constructor(obj?) {
        const documentKeys = ["_id", "paymentMethod", "status", "specialNotes", "reference", "createdAt", "updatedAt", "customer", "location", "vendors", "totalQty", "totalPrice", "revenue"];
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