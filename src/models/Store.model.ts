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
export default class Store extends Model {
    public id: number;
    public name: string;
    public logo: string;
    public header: string;
    public description: string;
    public storeAddress_id: string;
    public storeType_id: number;
    public vendor_id: string;
    public storeSocialData_id: string;
    public status: number;
    @hasMany("StoreContact")
    public StoreContact: StoreContact[];
    @hasManytoMany("product", "StoreProduct")
    public StoreProduct: any;
    @hasMany("WorkingHours")
    public WorkingHours: WorkingHours[];
    @hasMany("ContactPerson")
    public ContactPerson: ContactPerson[];
    @hasOne("StoreType")
    public StoreType: StoreType;
    @hasOne("StoreSocialData")
    public StoreSocialData: StoreSocialData;
    @hasOne("StoreAddress")
    public StoreAddress: StoreAddress;
    @hasOne("Vendor")
    public Vendor: Vendor;



    constructor(obj?: Store) {
        const columnsNames = ["id", "name", "logo", "header", "description", "storeAddress_id", "storeType_id", "vendor_id", "storeSocialData_id", "status"];

        super(obj, columnsNames);

    }


}