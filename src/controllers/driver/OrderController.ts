import { NextFunction, Request, Response } from "express";
import { ApiController } from "../ApiController";
import Order from "../../models/Order.model";
import { ObjectID } from "bson";
import ResponseObj from "../../models/ResponseObj.model";
import { Controller } from "../Controller";
import VendorOrderService from "../../modelServices/vendor/VendorOrderService";
import OrderValidation from "../../validation/Order.validation";
import { Auth } from "../../middleware/auth";
import DriverLocation from "../../models/DriverLocation.model";

class OrderController extends ApiController {
    constructor() {
        // super();
        super(new OrderValidation(), new Auth);
    }


    public async index(req: Request, res: Response, next: NextFunction) {
        const latitude = parseFloat(req.params.latitude);
        const longitude = parseFloat(req.params.longtiude);
        const aggregation = [
            {
                "$geoNear": {
                    "near": {
                        "type": "Point",
                        "coordinates": [longitude, latitude]
                    },
                    "distanceField": "distance",
                    "maxDistance": 200,
                    "spherical": true,
                    "query": {"loc.type": "Point"}
                }
            },
            {
                "$sort": {"distance": -1} // Sort the nearest first
            }];
        DriverLocation.aggregate(aggregation).then((result) => {

        }, (e) => {
            console.log(e);
            res.status(400).json(new ResponseObj(400, "failed"));
        });

    }

    public async show(req: Request, res: Response, next: NextFunction) {

    }

    public async create(req: Request, res: Response, next: NextFunction) {

    }

    public async update(req: Request, res: Response, next: NextFunction) {

    }

    public async delete(req: Request, res: Response, next: NextFunction) {

    }

}

const orderController = new OrderController();

export default orderController.router;


