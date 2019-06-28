import express from "express";

import logger from "morgan";

import cookieParser from "cookie-parser";

import path from "path";
import logging from "./startup/logging";
import prod from "./startup/prod";
import routes from "./startup/routes";
import JWTInjectUser from "./startup/JWTInjectUser";

const cors = require("cors");
const fileUpload = require("express-fileupload");

class Application {
    private readonly app: express.Application;


    constructor() {
        this.app = express();
        this.config();
    }

    private config() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(fileUpload());
        this.app.use(logger("dev"));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use("/uploads", express.static(__dirname + "/uploads"));
        JWTInjectUser(this.app);
        routes(this.app);
        prod(this.app);
        logging(this.app);

    }

    public start(port?: number): void {

        port = port || 3000;
        this.app.listen(port, () => {
            console.log(
                "  App is running at http://localhost:%d in %s mode",
                port,
                this.app.get("env")
            );
            console.log("  Press CTRL-C to stop\n");
        });

    }
}

export default Application;