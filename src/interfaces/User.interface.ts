import IAddress from "./Address.interface";

export default interface IUser {
    id: number;
    name: string;
    userName: string;
    address: IAddress;
    phone: number;
}
