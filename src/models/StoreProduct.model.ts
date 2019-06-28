import Model from "./Model";
import { belongsTo, hasOne, Table } from "../decorators/ModelDecorators";
import Product from "./Product.model";
import Store from "./Store.model";

@Table
export default class StoreProduct extends Model {
    public id: number;
    public price: number;
    public product_id: number;
    public store_id: number;
    @belongsTo("Product")
    public product: any;
    @belongsTo("Store")
    public store: any;
    public status: number;
    public quantity: number;
    public sale_price: number;
    constructor(obj?) {
        const columnsNames = ["id", "store_id", "product_id", "price", "status", "quantity", "sale_price"];
        super(obj, columnsNames);

    }


}