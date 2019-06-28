import index from "../../controllers/HomeController";
import product from "../../controllers/vendor/ProductController";
import store from "../../controllers/vendor/StoreController";
import swaggerUi from "swagger-ui-express";
import session from "../../controllers/vendor/SessionController";
import order from "../../controllers/vendor/OrderController";
import customer from "../../controllers/vendor/CustomerController";
import request from "../../controllers/vendor/RequestController";
import * as express from "express";

const vendorRoutes = express.Router({mergeParams: true});
vendorRoutes.use("/products", product);
vendorRoutes.use("/store", store);
vendorRoutes.use("/session", session);
vendorRoutes.use("/orders", order);
vendorRoutes.use("/customers", customer);
vendorRoutes.use("/requests", request);

export default vendorRoutes;

