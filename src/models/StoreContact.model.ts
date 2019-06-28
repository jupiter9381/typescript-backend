import Model from "./Model";
import { hasOne, Table } from "../decorators/ModelDecorators";
import Store from "./Store.model";

@Table
export default class StoreContact extends Model {
    public id: number;
    public store_id: number;
    public email: string;
    public phone: string;
    public mobile: string;
    @hasOne("Store")
    public store: Store;


    constructor(obj?) {
        const columnsNames = ["id", "store_id", "email", "phone", "mobile"];
        super(obj, columnsNames);
    }


}