import User from "../../models/User.model";
import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";
import { NextFunction, Router, Request, Response } from "express";
import { hasOwnProperty } from "tslint/lib/utils";
import { UserType } from "../../models/EnumerableAttributes";
import VendorModel, { default as Vendor } from "../../models/Vendor.model";
import NotActiveTokens from "../../models/NotActiveTokens.model";
import ResponseObj from "../../models/ResponseObj.model";
import swaggerUi from "swagger-ui-express";

class SessionController {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public async loginRequired(req: Request, res: Response, next: NextFunction) {
        if (hasOwnProperty(req, "user") && req["user"] != undefined) {
            // console.log(req["user"]);
            next();
        } else {
            return res.status(401).json(new ResponseObj( 401, "Unauthorized user!"));
            }

    }

    public async index(req: Request, res: Response, next: NextFunction) {
        const users = await  User.select();
        res.send(users);
    }

    public async signOut(req: Request, res: Response, next: NextFunction) {
        if (hasOwnProperty(req, "user") && req["user"] != undefined && hasOwnProperty(req, "token") && req["token"] != undefined  ) {
            const notActiveTokensObj = new NotActiveTokens();
            notActiveTokensObj.user_id = req["user"].id;
            notActiveTokensObj.token = req["token"];
            notActiveTokensObj.save().then((savedProduct) => {
                res.status(200).json(new ResponseObj( 200, "user logged out successfully"));
            }, (e) => {
                res.status(400).json(new ResponseObj( 400, "some thing went wrong"));
            });
            res.status(200).json(new ResponseObj( 200, "user logged out successfully"));
        } else {
            res.status(400).json(new ResponseObj( 400, "some thing went wrong"));
        }
    }
    public async signIn(req: Request, res: Response, next: NextFunction) {
        const loginParams = req.body;


        const user = await  User.filter({"userName": loginParams.userName});
        if (user && user[0]) {
            const userObj: User = user[0];
            if (bcrypt.compareSync(loginParams.password, userObj.password)) {
                if (userObj.type == UserType.vendor) {
                    const vendorData = <Vendor>await  Vendor.findById(userObj.uid);
                    res.json({
                        token: jwt.sign({
                            email: userObj.userName,
                            fullName: userObj.name,
                            id: userObj.id,
                            store_id: vendorData.store_id
                        }, "RESTFULAPIs")
                    });
                }
                else if (user.type == UserType.client) {
                    res.json({
                        token: jwt.sign({
                            email: userObj.userName,
                            fullName: userObj.name,
                            id: userObj.id
                        }, "RESTFULAPIs")
                    });
                } else if (user.type == UserType.delivery) {
                    res.json({
                        token: jwt.sign({
                            email: userObj.userName,
                            fullName: userObj.name,
                            id: userObj.id
                        }, "RESTFULAPIs")
                    });
                } else {
                    res.status(400).json(new ResponseObj( 400, "wrong user or password"));
                    return;
                }
            }
        } else {
            res.status(200).json(new ResponseObj( 400, "wrong user or password"));
        }

    }

    public async create(req: Request, res: Response, next: NextFunction) {
        const user_req: User = req.body;
        const user = new User(user_req);
        user.password = bcrypt.hashSync(user_req.password);

        user.save().then(function (savedUser) {
            if (user.type == UserType.vendor) {
                const vendor_req: Vendor = req.body;
                const vendor = new Vendor(vendor_req);
                vendor.user_id = savedUser.insertId;
                vendor.save().then(
                    function (savedVendor) {
                        const userUpdate = new User();
                        userUpdate.id = savedUser.insertId;
                        userUpdate.uid = savedVendor.insertId;
                        userUpdate.update().then(
                            function (updatedUser) {
                                res.send("1");
                            },
                            function (e) {
                                res.send("0");
                            }
                        );
                    }, function (e) {
                        console.log(e);
                        res.send("01");
                    }
                );
            }
            else if (user.type == UserType.client) {
                const vendor_req: Vendor = req.body;
                const vendor = new Vendor(vendor_req);
                vendor.user_id = savedUser.insertId;
                vendor.save().then(
                    function (savedUser) {
                        res.send("1");
                    }, function (e) {
                        console.log(e);
                        res.send("02");
                    }
                );
            }
            else if (user.type == UserType.delivery) {
            } else {
                const vendor_req: Vendor = req.body;
                const vendor = new Vendor(vendor_req);
                vendor.user_id = savedUser.insertId;
                vendor.save().then(
                    function (savedUser) {
                        res.send("1");
                    }, function (e) {
                        console.log(e);
                        res.send("02");
                    }
                );
            }
        }, function (e) {
            console.log(e);
            res.send("03");
        });
    }


    init() {
        this.router.get("/", this.loginRequired, this.index);
        this.router.get("/logout", this.loginRequired, this.signOut);
        this.router.post("/", this.create);
        this.router.post("/sign", this.signIn);
    }

}

const sessionController = new SessionController();

export default sessionController.router;

