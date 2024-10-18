"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = exports.fromUTF8ToBase64 = exports.fromBase64ToUTF8 = void 0;
const config_1 = require("../config");
const httpStatusCode_constants_1 = require("../constants/httpStatusCode.constants");
const fromBase64ToUTF8 = (code) => {
    const buff = Buffer.from(code, 'base64');
    const decodedAuth = buff.toString('utf8');
    return decodedAuth;
};
exports.fromBase64ToUTF8 = fromBase64ToUTF8;
const fromUTF8ToBase64 = (code) => {
    const buff2 = Buffer.from(code, 'utf8');
    const codedAuth = buff2.toString('base64');
    return codedAuth;
};
exports.fromUTF8ToBase64 = fromUTF8ToBase64;
const adminMiddleware = (req, res, next) => {
    const auth = req.headers['authorization']; // 'Basic xxxx'
    console.log(auth);
    if (!auth) {
        res
            .status(httpStatusCode_constants_1.HttpStatuses.Unauthorized401)
            .json({});
        return;
    }
    if (auth.slice(0, 6) !== 'Basic ') {
        res
            .status(httpStatusCode_constants_1.HttpStatuses.Unauthorized401)
            .json({});
        return;
    }
    // const decodedAuth = fromBase64ToUTF8(auth.slice(6))
    const codedAuth = (0, exports.fromUTF8ToBase64)(config_1.CONFIG.ADMIN);
    // if (decodedAuth !== SETTINGS.ADMIN) {
    if (auth.slice(6) !== codedAuth) {
        res
            .status(httpStatusCode_constants_1.HttpStatuses.Unauthorized401)
            .json({});
        return;
    }
    next();
};
exports.adminMiddleware = adminMiddleware;
