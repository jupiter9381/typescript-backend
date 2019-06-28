import AdminRequest from "../../models/AdminRequest.model";
import Store from "../../models/Store.model";
import { AdminRequestStatus, AdminRequestTitle } from "../../models/EnumerableAttributes";
import ProductService from "./ProductService";

const config = require("config");

export default class AdminRequestService {

    static async generate(req, title: string, productId?) {
        if (title === AdminRequestTitle.EditProduct) {
            return await AdminRequestService.editProduct(req);
        } else if (title === AdminRequestTitle.CreateProduct) {
            return await AdminRequestService.createProduct(req, productId);
        }

    }

    private static async createProduct(req, productId) {
        const adminRequest = new AdminRequest();
        adminRequest.requestTitle = AdminRequestTitle.CreateProduct;
        const product = await ProductService.generate(req, productId);
        adminRequest.requestBody = {
            product: product
        };
        const store = <Store>await Store.findById(req["user"].store_id);
        adminRequest.vendor = {
            "id": store.id,
            "name": store.name,
            "logo": config.get("baseUrl") + store.logo,

        };
        adminRequest.createdAt = new Date();
        adminRequest.updatedAt = new Date();
        adminRequest.status = AdminRequestStatus.Pending;
        adminRequest.statusCode = 1;
        return adminRequest;
    }

    private static async editProduct(req) {
        const adminRequest = new AdminRequest();
        adminRequest.requestTitle = AdminRequestTitle.EditProduct;
        const store = <Store>await Store.findById(req["user"].store_id);
        adminRequest.vendor = {
            "id": store.id,
            "name": store.name,
            "logo": config.get("baseUrl") + store.logo,

        };
        adminRequest.createdAt = new Date();
        adminRequest.updatedAt = new Date();
        adminRequest.status = AdminRequestStatus.Pending;
        adminRequest.statusCode = 1;
        return adminRequest;
    }

}