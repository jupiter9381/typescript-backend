import { NextFunction, Router, Request, Response } from "express";
import Validation from "../validation/Validation";
import { Auth } from "../middleware/auth";
import Model from "../models/Store.model";

export class Controller {
    router: Router;

    constructor() {

        this.router = Router({ mergeParams: true });
        this.init();
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


    init() {
        this.router.get("/", this.index);
        this.router.get("/:id", this.show);

        this.router.post("/", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }

}



