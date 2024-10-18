"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogsController = void 0;
const blogsRepository_1 = require("../blogsRepository");
const httpStatusCode_constants_1 = require("../../../constants/httpStatusCode.constants");
const getBlogsController = (req, res) => {
    const blogs = blogsRepository_1.blogsRepository.getAll();
    res.status(httpStatusCode_constants_1.HttpStatuses.Ok200).json(blogs);
};
exports.getBlogsController = getBlogsController;
