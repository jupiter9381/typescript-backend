import { NextFunction, Router, Request, Response } from "express";
import Validation from "../validation/Validation";
import { Auth } from "../middleware/auth";

export class ApiController {
    router: Router;
    validator: Validation;
    auth: Auth;

    constructor(validator?: Validation, auth?: Auth) {
        if (auth) {
            this.auth = auth;
        } else {
            this.auth = new Auth;
        }
        if (validator) {
            this.validator = validator;
        } else {
            this.validator = new Validation;
        }
        this.router = Router({ mergeParams: true });
        this.init();
    }


    public static IsJsonString(str): boolean {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    public async index(req: Request, res: Response, next: NextFunction) {
        res.send("");

    }

    public async show(req: Request, res: Response, next: NextFunction) {
        res.send("");
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        res.send("");
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        res.send("");
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        res.send("");
    }

    public async filter(req: Request, res: Response, next: NextFunction) {
        res.send("");
    }
    public permitData(params) {
        const builder = {};
        for (const key in params) {
            const documentKeys: Array<string> = this["documentKeys"];
            if (documentKeys.find(doc => doc == key)) {
                builder[key] = params[key];
            }
        }
        return builder;
    }
    init() {
        this.router.get("/filter", this.auth.userRequired, this.filter);
        this.router.get("/", this.auth.userRequired, this.index);
        this.router.get("/:id", this.auth.userRequired, this.validator.createValidationFor("show"), this.validator.checkValidationResult, this.show);
        this.router.post("/", this.auth.userRequired, this.validator.createValidationFor("create"), this.validator.checkValidationResult, this.create);
        this.router.put("/:id", this.auth.userRequired, this.validator.createValidationFor("edit"), this.validator.checkValidationResult, this.update);
        this.router.delete("/:id", this.auth.userRequired, this.validator.createValidationFor("delete"), this.validator.checkValidationResult, this.delete);
    }

}



