import Model from "./Model";
import { UserType } from "./EnumerableAttributes";
import { Table, hasMany, column, filterable } from "../decorators/ModelDecorators";
import Product from "./Product.model";
import bcrypt from "bcrypt-nodejs";

@Table
export default class User extends Model {


    public id: number;
    public uid: number;
    public name: string;
    public userName: string;
    public password: string;
    public type: UserType;
    @hasMany(Product)
    public products: Product[];

    constructor(obj?) {
        const columnsNames = ["id", "uid", "name", "password", "userName", "type"];

        super(obj, columnsNames);
    }

    comparePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }

    hi() {
        return "hi";
    }
}