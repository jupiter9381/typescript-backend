const helmet = require("helmet");
const compression = require("compression");

export default function (app) {
    app.use(helmet());
    app.use(compression());
}