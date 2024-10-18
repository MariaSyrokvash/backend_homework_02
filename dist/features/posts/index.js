"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const createPostController_1 = require("./controllers/createPostController");
const getPostsController_1 = require("./controllers/getPostsController");
const findPostController_1 = require("./controllers/findPostController");
const delPostController_1 = require("./controllers/delPostController");
const putPostController_1 = require("./controllers/putPostController");
const postValidators_1 = require("./middlewares/postValidators");
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter.post('/', ...postValidators_1.postValidators, createPostController_1.createPostController);
exports.postsRouter.get('/', getPostsController_1.getPostsController);
exports.postsRouter.get('/:id', findPostController_1.findPostController);
exports.postsRouter.delete('/:id', delPostController_1.delPostController);
exports.postsRouter.put('/:id', putPostController_1.putPostController);
// не забудьте добавить роут в апп
