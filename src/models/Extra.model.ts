import { Table } from "../decorators/ModelDecorators";
import Model from "./Model";

@Table
export default class Extra extends Model {
    public id: number;
    public name: string;
    public sub_category_id: number;
    public price: number;

    constructor(obj?: Extra) {
        const columnsNames = ["id", "name", "sub_category_id"];
        super(obj, columnsNames);
    }

}