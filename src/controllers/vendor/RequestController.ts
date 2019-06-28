import { NextFunction, Request, Response, Router } from "express";
import { ApiController } from "../ApiController";
import Product from "../../models/Product.model";
import FileUploader from "../../services/FileUploader";
import { Auth } from "../../middleware/auth";
import ProductValidation from "../../validation/Product.validation";
import { AdminRequestTitle, BaseUrl, ProductStatus } from "../../models/EnumerableAttributes";
import ProductSubCategory from "../../models/ProductSubCategory.model";
import StoreProduct from "../../models/StoreProduct.model";
import ResponseObj from "../../models/ResponseObj.model";
import * as XLSX from "xlsx";
import ProductExtraGroup from "../../models/ProductExtraGroup.model";
import ProductExtra from "../../models/ProductExtra.model";
import Extra from "../../models/Extra.model";
import SubCategory from "../../models/SubCategory.model";
import Category from "../../models/Category.model";
import AdminRequestService from "../../modelServices/vendor/AdminRequestService";
import AdminRequest from "../../models/AdminRequest.model";


class RequestController extends ApiController {
    constructor() {
        super();
    }

    public async index(req: Request, res: Response, next: NextFunction) {
        try {
            const storeId = req["user"].store_id;
            const filter = {};
            filter["vendor.id"] = storeId;
            const adminRequests = await AdminRequest.find(filter);
            const responseObj = new ResponseObj(200, "products list");
            responseObj["requests"] = adminRequests.map(request => request.builder());
            res.status(200).json(responseObj);
        } catch (e) {
            console.log(e);
            res.status(400).json(new ResponseObj(400, "some thing went wrong"));

        }
    }


}

const requestController = new RequestController();
export default requestController.router;



