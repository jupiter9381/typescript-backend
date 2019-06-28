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
import Customer from "../../models/Customer.model";
import CustomerValidation from "../../validation/Customer.validation";

class CustomerController extends ApiController {
    constructor() {
        super(new CustomerValidation(), new Auth);
    }


    public async index(req: Request, res: Response, next: NextFunction) {

        Customer.find().then((result) => {
            const customers = [];
            result.forEach(customer => customers.push(customer.builder()));
            const responseObj = new ResponseObj(200, "list customers");
            responseObj["customers"] = customers;
            res.status(200).json(responseObj);
        }, (e) => {
            console.log(e);
            res.status(400).json(new ResponseObj(400, "failed"));
        });
    }


    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const params = req.body;

            const customer = new Customer(params);
            customer.save().then(() => {
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
            const customer = <Customer>await Customer.findOne({_id: new ObjectID(id)});
            //
            // if (req.body.name) {
            //     customer.name =  req.body.name;
            // }
            // if (req.body.address) {
            //     customer.address =  req.body.address;
            //
            // }
            // if (req.body.phone) {
            //     customer.phone =  req.body.phone;
            // }

            customer.update(req.body).then((customer) => {
                res.status(200).json(new ResponseObj(200, "customer updated successfully"));
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
            const customer = <Customer>await Customer.findOne({_id: new ObjectID(id)});
            customer.delete().then(() => {
                res.status(200).json(new ResponseObj(200, "customer deleted successfully"));
            }, () => {
                res.status(400).json(new ResponseObj(400, "failed"));
            });

        } catch (e) {
            res.status(400).json(new ResponseObj(400, "failed"));

        }
    }
}

const customerController = new CustomerController();

export default customerController.router;


