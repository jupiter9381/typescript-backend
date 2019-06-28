require("express-async-errors");
const winston = require("winston");
const morgan = require("morgan");
export default function (app) {

    // catch uncaught exceptions
    process.on("uncaughtException", (ex) => {
        winston.error(ex.message, ex);
    });

    // catch unhandled rejection
    process.on("unhandledRejection", (ex) => {
        winston.error(ex.message, ex);
    });

    if (app.get("env") === "development") {
        console.log("Morgan: Enabled");
        console.log("Winston transport: Console");

        winston.add(
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple())
            })
        );
        winston.stream = {
            write: (message, encoding) =>
                winston.info(message)
        };
        app.use(morgan("tiny", { stream: winston.stream }));
    }
    else {
        winston.add(
            new winston.transports.File({
                level: "error",
                filename: "logs/logfile.log",
                maxsize: 5242880, // 5MB
                maxFiles: 5
            }));
    }


}