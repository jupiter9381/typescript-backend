import { Table } from "../decorators/ModelDecorators";
import Model from "./Model";

@Table
export default class Category extends Model {
    public id: number;
    public name: string;

    constructor(obj?) {
        const columnsNames = ["id", "name"];
        super(obj, columnsNames);

    }

}