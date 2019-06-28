import { NextFunction, Request, Response } from "express";
import { hasOwnProperty } from "tslint/lib/utils";
import NotActiveTokens from "../models/NotActiveTokens.model";
import ResponseObj from "../models/ResponseObj.model";

export class Auth  {
    public async userRequired(req: Request, res: Response, next: NextFunction) {

        if (hasOwnProperty(req, "user") && req["user"] != undefined && hasOwnProperty(req, "token") && req["token"] != undefined  ) {
            const objectNotActiveTokens = <NotActiveTokens> await  NotActiveTokens.filter({
                "user_id": req["user"].id,
                "token": req["token"]
            });
            if (  !Object.keys(objectNotActiveTokens).length  ) {
                next();
            } else {
                res.json(new ResponseObj( 200, "store updated successfully"));

                return res.status(401).json(new ResponseObj( 401, "Unauthorized user!"));
            }
        } else {
            return res.status(401).json(new ResponseObj( 401, "Unauthorized user!"));
        }
    }
}