import Model from "./Model";
import { belongsTo, hasMany, hasManytoMany, hasOne, Table } from "../decorators/ModelDecorators";
import StoreContact from "./StoreContact.model";
import WorkingHours from "./WorkingHours.model";
import ContactPerson from "./ContactPerson.model";
import StoreType from "./StoreType.model";
import StoreSocialData from "./StoreSocialData.model";
import StoreAddress from "./StoreAddress.model";
import Vendor from "./Vendor.model";
import Extra from "./Extra.model";
import ProductExtraGroup from "./ProductExtraGroup.model";
import Store from "./Store.model";

@Table
export default class ProductExtra extends Model {
    public id: number;
    public product_id: number;
    public extra_id: number;
    public productExtraGroup_id: number;
    public price: number;
    public store_id: number;
    @belongsTo("Extra")
    public extra: Extra;
    @belongsTo("ProductExtraGroup")
    public productExtraGroup: ProductExtraGroup;
    @belongsTo("Store")
    public store: Store;
    @belongsTo("Product")
    public product: Product;

    constructor(obj?: ProductExtra) {
        const columnsNames = ["id", "product_id", "extra_id", "productExtraGroup_id", "price", "store_id"];
        super(obj, columnsNames);
    }


}