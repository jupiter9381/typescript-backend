import Model from "./Model";
import { Table } from "../decorators/ModelDecorators";

@Table
export default class StoreType extends Model {
    public id: number;
    public name: string;

    constructor(obj?) {
        const columnsNames = ["id", "name"];
        super(obj, columnsNames);

    }


}