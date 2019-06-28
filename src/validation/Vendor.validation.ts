import { check } from "express-validator/check";
import Validation from "./Validation";

export default class VendorValidation extends Validation {
    constructor() {
        super();
    }

    createValidationFor(route: string) {
        switch (route) {
            case "show":
                return [
                    check("email").isEmail().withMessage("must be an email"),
                    check("password").not().isEmpty().withMessage("some message")
                ];
            case "index":
                return [
                    check("email").isEmail().withMessage("must be an email!!!"),
                    check("password").not().isEmpty().withMessage("some message")
                ];
            case "create":
                return [
                    check("email").isEmail().withMessage("must be an email!!!!"),
                    check("password").not().isEmpty().withMessage("some message")
                ];
            case "edit":
                return [
                    check("email").isEmail().withMessage("must be an email"),
                    check("password").not().isEmpty().withMessage("some message")
                ];
            case "delete":
                return [
                    check("email").isEmail().withMessage("must be an email"),
                    check("password").not().isEmpty().withMessage("some message")
                ];

            default:
                return [];
        }
    }

}