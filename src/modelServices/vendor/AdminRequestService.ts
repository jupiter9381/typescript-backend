import AdminRequest from "../../models/AdminRequest.model";
import Store from "../../models/Store.model";
import { AdminRequestStatus, AdminRequestTitle } from "../../models/EnumerableAttributes";
import ProductService from "./ProductService";
import FileUploader from "../../services/FileUploader";
import Product from "../../models/Product.model";

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
        adminRequest.requestBody = product;
        adminRequest.requestParams = productId;
        const store = <Store>await Store.findById(req["user"].store_id);
        adminRequest.vendor = {
            "id": store.id,
            "name": store.name,
            "logo": config.get("baseUrl") + "/" + store.logo,

        };
        adminRequest.createdAt = new Date();
        adminRequest.updatedAt = new Date();
        adminRequest.status = AdminRequestStatus.Pending;
        adminRequest.statusCode = 1;
        return adminRequest;
    }

    private static async editProduct(req): Promise<AdminRequest> {
        const adminRequest = new AdminRequest();
        adminRequest.requestTitle = AdminRequestTitle.EditProduct;
        const productId = req.params.id;
        // const productExtraGroupParam = JSON.parse(req.body["productExtraGroup"]);
        const product = await ProductService.generate(req, productId);

        const store = <Store>await Store.findById(req["user"].store_id);
        const bodyParams = req.body;
        // bodyParams.productExtraGroup = productExtraGroupParam;
        adminRequest.vendor = {
            "id": store.id,
            "name": store.name,
            "logo": config.get("baseUrl") + store.logo,

        };
        const path = "uploads/products/" + productId + "/";
        if (req.hasOwnProperty("files") && req["files"] !== null && req["files"] !== undefined && req["files"].hasOwnProperty("image")) {
            FileUploader.create(path, req["files"].image);
            bodyParams.image = path + req["files"].image.name;
        }
        adminRequest.requestParams = productId;
        adminRequest.requestBody = {
            updated: bodyParams,
            origin: product
        };
        adminRequest.createdAt = new Date();
        adminRequest.updatedAt = new Date();
        adminRequest.status = AdminRequestStatus.Pending;
        adminRequest.statusCode = 1;
        return adminRequest;
    }

}