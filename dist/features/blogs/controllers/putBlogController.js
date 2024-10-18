"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putBlogController = void 0;
const blogsRepository_1 = require("../blogsRepository");
const httpStatusCode_constants_1 = require("../../../constants/httpStatusCode.constants");
const putBlogController = (req, res) => {
    const blogId = req.params.id;
    const body = req.body;
    const isUpdated = blogsRepository_1.blogsRepository.updateBlog(body, blogId);
    isUpdated
        ? res.sendStatus(httpStatusCode_constants_1.HttpStatuses.NoContent204)
        : res.sendStatus(httpStatusCode_constants_1.HttpStatuses.NotFound404);
};
exports.putBlogController = putBlogController;
