"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputCheckErrorsMiddleware = void 0;
const express_validator_1 = require("express-validator");
const httpStatusCode_constants_1 = require("../constants/httpStatusCode.constants");
const inputCheckErrorsMiddleware = (req, res, next) => {
    const e = (0, express_validator_1.validationResult)(req);
    if (!e.isEmpty()) {
        const eArray = e.array({ onlyFirstError: true });
        console.log(eArray);
        res
            .status(httpStatusCode_constants_1.HttpStatuses.BadRequest400)
            .json({
            errorsMessages: eArray.map(x => ({ field: x.path, message: x.msg }))
        });
        return;
    }
    next();
};
exports.inputCheckErrorsMiddleware = inputCheckErrorsMiddleware;
