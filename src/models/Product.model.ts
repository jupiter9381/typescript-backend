import Model from "./Model";
import { ProductStatus } from "./EnumerableAttributes";
import { Table } from "../decorators/ModelDecorators";

@Table
export default class Product extends Model {
    public id: number;
    public name: string;
    public barcode: string;
    public image: string;
    public status: ProductStatus;
    public price: number;
    public description: string;

    constructor(obj?) {
        const columnsNames = ["id", "name", "barcode", "image", "status", "price", "description"];
        super(obj, columnsNames);

    }


}