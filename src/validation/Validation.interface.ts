export interface ValidationInterface  {
    createValidationFor(route: string);
    checkValidationResult(req, res, next);
}