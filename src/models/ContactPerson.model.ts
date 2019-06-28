import Model from "./Model";
import { ProductStatus, StoreStatus } from "./EnumerableAttributes";
import { column, Table } from "../decorators/ModelDecorators";

@Table
export default class ContactPerson extends Model {
    public id: number;
    public store_id: number;
    public email: string;
    public name: string;
    public phone: string;
    public mobile: string;



    constructor(obj?: ContactPerson) {
        const columnsNames = ["id", "store_id", "email", "name", "phone", "mobile"];
        super(obj, columnsNames);

    }


}