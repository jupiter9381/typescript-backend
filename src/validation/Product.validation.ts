import { check } from "express-validator/check";
import Validation from "./Validation";

export default class ProductValidation extends Validation {
    constructor() {
        super();
    }

    createValidationFor(route: string) {
        const validationArray = [
            check("title").not().isEmpty().withMessage("must have a title"),
            // check("barcode").not().isEmpty().withMessage("must have a barcode"),
            check("price").not().isEmpty().isNumeric().withMessage("must be number"),
            // check("category").not().isEmpty().isNumeric().withMessage("must be number"),
            // check("subcategory").not().isEmpty().isNumeric().withMessage("must be number"),
            // check("manageQuantity").not().isEmpty().isBoolean().withMessage("must be boolean"),
        ];
        switch (route) {
            case "create":
                return validationArray;
            case "edit":
                return validationArray;

            default:
                return [];
        }
    }

}