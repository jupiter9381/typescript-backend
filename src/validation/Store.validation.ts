import { check } from "express-validator/check";
import Validation from "./Validation";

export default class StoreValidation extends Validation {
    constructor() {
        super();
    }

    createValidationFor(route: string) {
        switch (route) {
            case "show":
                return [
                    check("id").not().isEmpty().isInt().withMessage("must be an integer")
                ];
            case "index":
                return [];
            case "create":
                return [
                    check("id").not().isEmpty().isInt().withMessage("must be an integer"),
                    check("name").not().isEmpty().isInt().withMessage("must be an integer"),
                    check("logo").not().isEmpty().isInt().withMessage("must be an integer"),
                    check("header").not().isEmpty().isInt().withMessage("must be an integer"),
                    check("description").not().isEmpty().isInt().withMessage("must be an integer"),
                    check("address_id").not().isEmpty().isInt().withMessage("must be an integer"),

                ];
            case "edit":
                return [];
            case "delete":
                return [
                    check("id").not().isEmpty().isInt().withMessage("must be an integer")
                ];

            default:
                return [];
        }
    }

}