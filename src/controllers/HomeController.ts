import User from "../models/User.model";
import { NextFunction, Router, Request, Response } from "express";
import Order from "../models/Order.model";
import { ApiController } from "./ApiController";
import StoreValidation from "../validation/Store.validation";
import { Controller } from "./Controller";


class HomeController extends Controller {

    public async index(req: Request, res: Response, next: NextFunction) {
        // const a: User = <User>await User.findById(1);
        // console.log(a.hi());
// const users = await new User().select(["id", "name"]);

        // const users = await new User().findById(1);
        //
        // const user: Order = new Order();
        // const p = await user.products;
        // const p = new Order();
        // p.id = 1;
        // p.serial = "aaaaaaaaa";
        // const item = new OrderItem();
        // item.price = 55;
        // item.id = 3;
        // const item2 = new OrderItem();
        // item2.price = 55;
        // item2.id = 3;
        // p.orderItems = [item, item2];
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
        res.send("jnkndkns");
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        const user: User = req.body.user;
        console.log(user.id);
        console.log(req.body);

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
        res.send("jnkndkns");
    }


}

const homeController = new HomeController();
export default homeController.router;

