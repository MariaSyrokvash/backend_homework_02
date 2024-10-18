"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogController = void 0;
const blogsRepository_1 = require("../blogsRepository");
const httpStatusCode_constants_1 = require("../../../constants/httpStatusCode.constants");
const getBlogController = (req, res) => {
    const blog = blogsRepository_1.blogsRepository.findAndMap(req.params.id);
    res.status(httpStatusCode_constants_1.HttpStatuses.Ok200).json(blog);
};
exports.getBlogController = getBlogController;
