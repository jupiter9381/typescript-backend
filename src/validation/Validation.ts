import { check, validationResult } from "express-validator/check";
import { ValidationInterface } from "./Validation.interface";


export default class Validation implements ValidationInterface {
    constructor() {
    }


    createValidationFor(route: string) {
        switch (route) {
            case "index":
                return [];
            case "show":
                return [];
            case "create":
                return [];
            case "edit":
                return [];
            case "delete":
                return [];

            default:
                return [];
        }
    }
    checkValidationResult(req, res, next) {
        const errorFormatter = ({location, msg, param, value, nestedErrors}) => {
            return `${param}: ${msg}`;
        };
        const result = validationResult(req).formatWith(errorFormatter);
        if (result.isEmpty()) {
            return next();
        }

        res.status(422).json({errors: result.array()});
    }

}