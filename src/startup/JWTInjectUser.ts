import NotActiveTokens from "../models/NotActiveTokens.model";
import Store from "../models/Store.model";

const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");


export default function (app) {
    app.use(function(req, res, next) {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {


            jsonwebtoken.verify(req.headers.authorization.split(" ")[1], "RESTFULAPIs", function(err, decode) {
                if (err) {
                    req.user = undefined;
                    req.token = undefined;
                }
                req.user = decode;
                req.token = req.headers.authorization.split(" ")[1];
                next();
            });
        } else {
            req.user = undefined;
            next();
        }
    });
}