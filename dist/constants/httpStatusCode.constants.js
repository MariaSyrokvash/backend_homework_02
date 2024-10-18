"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatuses = void 0;
var HttpStatuses;
(function (HttpStatuses) {
    HttpStatuses[HttpStatuses["Ok200"] = 200] = "Ok200";
    HttpStatuses[HttpStatuses["Created201"] = 201] = "Created201";
    HttpStatuses[HttpStatuses["NoContent204"] = 204] = "NoContent204";
    HttpStatuses[HttpStatuses["BadRequest400"] = 400] = "BadRequest400";
    HttpStatuses[HttpStatuses["Unauthorized401"] = 401] = "Unauthorized401";
    HttpStatuses[HttpStatuses["Forbidden403"] = 403] = "Forbidden403";
    HttpStatuses[HttpStatuses["NotFound404"] = 404] = "NotFound404";
    HttpStatuses[HttpStatuses["InternalServerError500"] = 500] = "InternalServerError500";
    HttpStatuses[HttpStatuses["ServiceUnavailable503"] = 503] = "ServiceUnavailable503";
})(HttpStatuses || (exports.HttpStatuses = HttpStatuses = {}));
