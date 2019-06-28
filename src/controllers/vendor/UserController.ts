import User from "../../models/User.model";
import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";
import { NextFunction, Router, Request, Response } from "express";
import { hasOwnProperty } from "tslint/lib/utils";
import { ApiController } from "../ApiController";
import StoreValidation from "../../validation/Store.validation";

export class UserController extends ApiController {
    router: Router;

    public async loginRequired(req: Request, res: Response, next: NextFunction) {
        if (hasOwnProperty(req, "user") && req["user"] != undefined) {
            console.log(req["user"]);
            next();
        } else {
            return res.status(401).json({message: "Unauthorized user!"});
        }

    }

    public async index(req: Request, res: Response, next: NextFunction) {
// const users = await new User().select(["id", "name"]);

        const users = await  User.select();
        // .findById(1);

        // const user: User = new User(users[0]);
        // const p = await user.products;
        // console.log(p);

        // const user =  new UserModel();
        // user.name = "xx";
        // await user.insert();
        // const user =  new UserModel();
        // user.id = 4;
        // user.name = "xx";
        // const r = await user.delete();

        // const user =  new UserModel();
        // user.id = 3;
        // user.name = "updated user";
        // const r = await user.update();
        // console.log(p);
        res.send(users);
    }

    public async sign_in(req: Request, res: Response, next: NextFunction) {
        const users = await  User.findById(1);

        const user = users[0];
        return res.json({token: jwt.sign({email: user.userName, fullName: user.name, _id: user.id}, "RESTFULAPIs")});


    }

    public async create(req: Request, res: Response, next: NextFunction) {
        const user_req: User = req.body;
        const user = new User(user_req);
        console.log(user_req);
        // user.id = user_req.id;
        user.name = user_req.name;
        user.userName = user_req.userName;
        user.password = bcrypt.hashSync(user_req.password);

        user.save().then(function () {
            res.send("1");
        }, function () {
            res.send("0");
        });

        // const users = await new UserModel().select(["id", "name"]);
        // // const user =  new UserModel();
        // // user.name = "xx";
        // // await user.insert();
        // // const user =  new UserModel();
        // // user.id = 4;
        // // user.name = "xx";
        // // const r = await user.delete();
        //
        // // const user =  new UserModel();
        // // user.id = 3;
        // // user.name = "updated user";
        // // const r = await user.update();
        // res.send("jnkndkns");
    }


    init() {
        this.router.get("/", this.loginRequired, this.index);
        this.router.post("/", this.create);
        this.router.post("/sign", this.sign_in);
    }

}

const homeController = new UserController();

export default homeController.router;

