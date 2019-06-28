import Model from "./Model";
import { Table } from "../decorators/ModelDecorators";

@Table
export default class StoreAddress extends Model {
    public id: number;
    public store_id: number;
    public lat: string;
    public lng: string;
    public street: string;
    public area: string;
    public city: string;
    public zipCode: string;
    public special_marque: string;


    constructor(obj?) {
        const columnsNames = ["id", "store_id", "lat", "lng", "street", "area", "city", "zipCode", "special_marque"];

        super(obj, columnsNames);

    }


}