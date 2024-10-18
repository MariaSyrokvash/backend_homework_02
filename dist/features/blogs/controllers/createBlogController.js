"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogController = void 0;
const blogsRepository_1 = require("../blogsRepository");
const httpStatusCode_constants_1 = require("../../../constants/httpStatusCode.constants");
const createBlogController = (req, res) => {
    const newBlogId = blogsRepository_1.blogsRepository.create(req.body);
    const newBlog = blogsRepository_1.blogsRepository.findAndMap(newBlogId);
    res
        .status(httpStatusCode_constants_1.HttpStatuses.Created201)
        .json(newBlog);
};
exports.createBlogController = createBlogController;
