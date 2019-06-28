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
import DriverLocation from "../../models/DriverLocation.model";

class RequestDeliveryController extends ApiController {
    constructor() {
        // super();
        super(new OrderValidation(), new Auth);
    }


    public async create(req: Request, res: Response, next: NextFunction) {

        try {
            const formLatitude = parseFloat(req.body.formLatitude);
            const fromLongitude = parseFloat(req.body.fromLongitude);
            const toLatitude = parseFloat(req.body.toLatitude);
            const toLongitude = parseFloat(req.body.toLongitude);
            const aggregation = [
                {
                    "$geoNear": {
                        "near": {
                            "type": "Point",
                            "coordinates": [fromLongitude, formLatitude]
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

                // here logic of notification and wait 1 min
            }, (e) => {
                console.log(e);
                res.status(400).json(new ResponseObj(400, "failed"));
            });

        } catch (e) {
            console.log(e);
            res.status(400).json(new ResponseObj(400, "failed"));

        }
    }


}

const requestDeliveryController = new RequestDeliveryController();

export default requestDeliveryController.router;


