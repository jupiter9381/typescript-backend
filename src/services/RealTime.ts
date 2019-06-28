import * as http from "http";
const config = require("config");
export default class RealTime {
    static notify(body) {
        const data = JSON.stringify({ ...body});
        const options = {
            host: config.get("realtime.host"),
            port: config.get("realtime.port"),
            path: config.get("realtime.notify"),
            method: "POST",
            headers: {"Content-Type": "application/application/json"}
        };
        const req = http.request(options, function (response) {
            response.setEncoding("utf8");
            // let body;
            // response.on("data", (chunk) => body += chunk);
            response.on("error", (error) => {
                console.error(error);
            });
            response.on("end", (res) => res.json("ok"));
        });
        req.write(data);
        req.end();
    }
}