"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delBlogController = void 0;
const blogsRepository_1 = require("../blogsRepository");
const httpStatusCode_constants_1 = require("../../../constants/httpStatusCode.constants");
const delBlogController = (req, res) => {
    const blogId = req.params.id;
    const isDeleted = blogsRepository_1.blogsRepository.deleteBlog(blogId);
    isDeleted
        ? res.sendStatus(httpStatusCode_constants_1.HttpStatuses.NoContent204)
        : res.sendStatus(httpStatusCode_constants_1.HttpStatuses.NotFound404);
};
exports.delBlogController = delBlogController;
