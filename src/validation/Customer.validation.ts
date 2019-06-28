import { check } from "express-validator/check";
import Validation from "./Validation";

export default class CustomerValidation extends Validation {
    constructor() {
        super();
    }

    createValidationFor(route: string) {
        const validationArray = [
            check("name").not().isEmpty().withMessage("must have a name "),
            check("phone").not().isEmpty().withMessage("must have a phone "),
            check("address[location]").not().isEmpty().withMessage("must have a address[location] "),
            check("address[latitude]").not().isEmpty().withMessage("must have a address[latitude] "),
            check("address[longitude]").not().isEmpty().withMessage("must have a address[longitude] ")

        ];
        switch (route) {
            case "create":
                return validationArray;
            default:
                return [];
        }
    }

}