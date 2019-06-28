import Model from "./Model";
import { Table } from "../decorators/ModelDecorators";

@Table
export default class WorkingHours extends Model {
    public id: number;
    public store_id: number;
    public day: string;
    public start_1: string;
    public finish_1: string;
    public start_2: string;
    public finish_2: string;

    constructor(obj?) {
       const columnsNames = ["id", "store_id", "day", "start_1", "finish_1", "start_2", "finish_2"];
        super(obj , columnsNames);

    }


}