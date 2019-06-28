import Model from "./Model";
import { hasMany, hasManytoMany, hasOne, Table } from "../decorators/ModelDecorators";
import StoreContact from "./StoreContact.model";
import WorkingHours from "./WorkingHours.model";
import ContactPerson from "./ContactPerson.model";
import StoreType  from "./StoreType.model";
import StoreSocialData from "./StoreSocialData.model";
import StoreAddress  from "./StoreAddress.model";
import Vendor from "./Vendor.model";

@Table
export default class ProductExtraGroup extends Model {
    public id: number;
    public name: string;
    public type: number;




    constructor(obj?: ProductExtraGroup) {
        const columnsNames = ["id", "name", "type"];

        super(obj, columnsNames);

    }


}