import swaggerUi from "swagger-ui-express";
import * as express from "express";
const vendor = require("../../../swagger/vendor.json");
const driver = require("../../../swagger/driver.json");
const swaggerRoutes = express.Router({ mergeParams: true });
swaggerRoutes.use("/driver", swaggerUi.serve, swaggerUi.setup(driver));
swaggerRoutes.use("/vendor", swaggerUi.serve, swaggerUi.setup(vendor));
export default swaggerRoutes;