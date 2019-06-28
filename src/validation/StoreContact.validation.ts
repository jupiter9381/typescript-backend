import { check } from "express-validator/check";
import Validation from "./Validation";

export default class StoreContactValidation extends Validation {
    constructor() {
        super();
    }

    createValidationFor(route: string) {
        switch (route) {
            case "show":
                return [];
            case "index":
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

}