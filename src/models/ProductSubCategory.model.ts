import Model from "./Model";
import {  Table } from "../decorators/ModelDecorators";

@Table
export default class ProductSubCategory extends Model {
    public id: number;
    public product_id: number;
    public sub_category_id: number;

    constructor(obj?) {
        const columnsNames = ["id", "product_id", "sub_category_id"];
        super(obj, columnsNames);

    }


}