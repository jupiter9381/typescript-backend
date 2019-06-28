import Model from "./Model";
import { Table } from "../decorators/ModelDecorators";

@Table
export default class NotActiveTokens extends Model {
    public user_id: number;
    public token: string;



    constructor(obj?: NotActiveTokens) {
        const columnsNames = ["user_id", "token"];
        super(obj, columnsNames);
    }


}