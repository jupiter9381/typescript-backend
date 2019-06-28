// not used. replaced with express-asyc-errors module
export default function(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (ex) {
            next(ex);
        }
    };
}