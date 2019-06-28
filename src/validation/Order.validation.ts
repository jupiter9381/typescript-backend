import { check } from "express-validator/check";
import Validation from "./Validation";
import { OrderStatus } from "../models/EnumerableAttributes";

export default class OrderValidation extends Validation {
    constructor() {
        super();
    }

    createValidationFor(route: string) {
        const orderStatus = Object.keys(OrderStatus).map(status => OrderStatus[status]);

        const validationArray = [
            check("products").not().isEmpty().withMessage("must have a title"),
            check("user").not().isEmpty().withMessage("must have a latitude ")

        ];
        switch (route) {
            case "create":
                return validationArray;
            case "edit":
                return [
                    check("status").custom((input) => {
                        return orderStatus.find(status => status === input);
                        // return ["Pending", "Completed", "Canceled", "In Progress", "Out for delivery"].find(status => status === input);
                    }).withMessage(`status must be on of ${orderStatus.join(",")}`)
                ];

            default:
                return [];
        }
    }

}