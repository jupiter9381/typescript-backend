import Model from "./Model";
import { ProductStatus, StoreStatus } from "./EnumerableAttributes";
import { Table } from "../decorators/ModelDecorators";

@Table
export default class StoreSocialData extends Model {
    public id: number;
    public store_id: number;
    public facebook: string;
    public twitter: number;
    public instagram: string;
    public youtube: string;


    constructor(obj?) {
        const columnsNames = ["id", "store_id", "facebook", "twitter", "instagram", "youtube"];
        super(obj, columnsNames);

    }


}