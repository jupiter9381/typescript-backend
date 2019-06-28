import { belongsTo, Table } from "../decorators/ModelDecorators";
import Model from "./Model";
import Category from "./Category.model";

@Table
export default class SubCategory extends Model {
    public id: number;
    public name: string;
    public category_id: number;
    @belongsTo("Category")
    public category: Category;

    constructor(obj?) {
        const columnsNames = ["id", "name", "category_id"];
        super(obj, columnsNames);

    }

}