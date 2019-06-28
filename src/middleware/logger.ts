function log(req, res, next) {
    console.log("log:", `${req.method} - ${req.url}`);
    return next();
}

export default log;