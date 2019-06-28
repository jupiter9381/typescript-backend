import { NextFunction, Request, Response } from "express";
import { ApiController } from "../ApiController";
import Order from "../../models/Order.model";
import { ObjectID } from "bson";
import ResponseObj from "../../models/ResponseObj.model";
import { Controller } from "../Controller";
import VendorOrderService from "../../modelServices/vendor/VendorOrderService";
import OrderValidation from "../../validation/Order.validation";
import { Auth } from "../../middleware/auth";
import IUser from "../../interfaces/User.interface";

class OrderController extends ApiController {
    constructor() {
        // super();
        super(new OrderValidation(), new Auth);
    }


    public async index(req: Request, res: Response, next: NextFunction) {
        const storeId = req["user"].store_id;
        const filterQuery = {vendors: {$elemMatch: {id: storeId}}};
        Order.find(filterQuery).then((result) => {
            const orders = VendorOrderService.vendorOrders(result, storeId);
            const responseObj = new ResponseObj(200, "list orders");
            responseObj["orders"] = orders;
            res.status(200).json(responseObj);
        }, (e) => {
            console.log(e);
            res.status(400).json(new ResponseObj(400, "failed"));
        });
    }

    public async filter(req: Request, res: Response, next: NextFunction) {
        const storeId = req["user"].store_id;
        const filterParams = new Order().permitData(req.query);

        if (filterParams.hasOwnProperty("customer")) {
            for (const key in filterParams["customer"]) {
                filterParams[`customer.${key}`] = filterParams["customer"][key];
            }

            delete filterParams["customer"];
        }
        if (filterParams.hasOwnProperty("startDate")
            && filterParams.hasOwnProperty("endDate")) {
            filterParams["createdAt"] = {
                $gte: new Date(filterParams["startDate"]),
                $lt: new Date(filterParams["endDate"])
            };
            delete filterParams["startDate"];
            delete filterParams["endDate"];
        } else if (filterParams.hasOwnProperty("startDate")) {
            filterParams["createdAt"] = {
                $gte: new Date(filterParams["startDate"])
            };
            delete filterParams["startDate"];

        }
        const filterQuery = {vendors: {$elemMatch: {id: storeId}}, ...filterParams};
        Order.find(filterQuery).then((result) => {
            const orders = VendorOrderService.vendorOrders(result, storeId);
            const responseObj = new ResponseObj(200, "list orders");
            responseObj["orders"] = orders;
            res.status(200).json(responseObj);
        }, (e) => {
            console.log(e);
            res.status(400).json(new ResponseObj(400, "failed"));
        });
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const storeId = req["user"].store_id;
        const filterQuery = {vendors: {$elemMatch: {id: storeId}}};
        Order.find({_id: new ObjectID(id), ...filterQuery}).then((result) => {
            // const order = <Order>result;
            const order = VendorOrderService.vendorOneOrder(result, storeId);

            const responseObj = new ResponseObj(200, "show order");
            responseObj["order"] = order;
            res.status(200).json(responseObj);

        }, () => {
            res.status(400).json(new ResponseObj(400, "failed"));
        });
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const order = await VendorOrderService.generateOrder(req);
            // res.status(200).json(order.builder());
            order.save().then(() => {
                res.status(200).json(new ResponseObj(200, "created"));
            }, (e) => {
                res.status(400).json(new ResponseObj(400, "failed"));
            });

        } catch (e) {
            console.log(e);
            res.status(400).json(new ResponseObj(400, "failed"));

        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const order = <Order>await Order.findOne({_id: new ObjectID(id)});

            if (req.body.products) {
                const products = req.body.products;
                products.forEach(product => product.store_id = req["user"].store_id);
                const storeBuilder = await VendorOrderService.storeBuilder(products);
                order.vendors = storeBuilder["arrOfStoresWithProducts"];
                order.totalPrice = storeBuilder["totalPrice"];
                order.totalQty = storeBuilder["totalQty"];
                order.updatedAt = new Date();
            }
            if (req.body.user) {
                const user = req.body.user;
                order.customer = <IUser>{
                    id: user.id,
                    name: user.name,
                    address: {
                        location: user.address.location,
                        latitude: user.address.latitude,
                        longitude: user.address.longitude
                    },
                    phone: user.phone

                };
            }
            if (req.body.status) {
                order.status = req.body.status;
            }
            let updatedAt = new Date();

            if (req.body.updated_at) {
                updatedAt = req.body.updated_at;
            }
            order.updatedAt = updatedAt;
            // res.status(200).json(order.builder());

            order.update().then((order) => {
                res.status(200).json(new ResponseObj(200, "order updated successfully"));
            }, (e) => {
                res.status(400).json(new ResponseObj(400, "failed"));


            });

        } catch (e) {
            res.status(400).json(new ResponseObj(400, "failed"));

        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const order = <Order>await Order.findOne({_id: new ObjectID(id)});
            order.delete().then(() => {
                res.status(200).json(new ResponseObj(200, "order deleted successfully"));
            }, () => {
                res.status(400).json(new ResponseObj(400, "failed"));
            });

        } catch (e) {
            res.status(400).json(new ResponseObj(400, "failed"));

        }
    }

}

const orderController = new OrderController();

export default orderController.router;


