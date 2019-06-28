import Model from "./Model";
import { Table, hasOne } from "../decorators/ModelDecorators";
import User from "./User.model";
import Store from "./Store.model";

@Table
export default class Vendor extends Model {


    public id: number;
    public mobile: string;
    public gender: string;
    public age: string;
    public user_id: number;
    public store_id: number;
    public creation_date: string;
    @hasOne("User")
    public user: User;
    @hasOne("Store")
    public store: Store;


    constructor(obj?) {
        const columnsNames = ["id", "mobile", "gender", "age", "user_id", "store_id", "creation_date"];
        super(obj, columnsNames);
    }
}