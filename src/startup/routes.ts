import index from "../controllers/HomeController";
import product from "../controllers/vendor/ProductController";
import store from "../controllers/vendor/StoreController";
import swaggerUi from "swagger-ui-express";
import session from "../controllers/vendor/SessionController";
import order from "../controllers/vendor/OrderController";
import apiRoutes from "./routes";
import vendorRoutes from "./routes/vendor";
import swaggerRoutes from "./routes/swagger";
// import vendorRoutes from "./routes/vendor";

const vendor = require("../../swagger/vendor.json");
const driver = require("../../swagger/driver.json");

export default function routes(app) {
    // app.use("/products", product);
    // app.use("/store", store);
    // app.use("/session", session);
    // app.use("/orders", order);
    // app.use("/api/driver", swaggerUi.serve, swaggerUi.setup(driver));
    // app.use("/api/vendor", swaggerUi.serve, swaggerUi.setup(vendor));
    app.use("/", index);

    app.use("/vendor", vendorRoutes);
    app.use("/api", swaggerRoutes);
}
