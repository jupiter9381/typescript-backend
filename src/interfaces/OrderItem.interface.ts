import IExtraOrderItem from "./ExtraOrderItem.interface";

export default interface IOrderItem {
    id: number;
    name: string;
    price: number;
    barcode: string;
    image: string;
    status: string;
    qty: number;
    totalPrice: number;
    categories: any[];
    extras?: any[];
    totalPriceWithExtra?: number;
    extraTotalPrice?: number;

}