"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const blogs_1 = require("./features/blogs");
const posts_1 = require("./features/posts");
const testing_1 = require("./features/testing");
exports.app = (0, express_1.default)(); // создать приложение
exports.app.use(express_1.default.json()); // создание свойств-объектов body и query во всех реквестах
exports.app.use((0, cors_1.default)()); // разрешить любым фронтам делать запросы на наш бэк
exports.app.get('/', (req, res) => {
    res.status(200).json({ version: '1.0' });
});
exports.app.use(config_1.CONFIG.PATH.BLOGS, blogs_1.blogsRouter);
exports.app.use(config_1.CONFIG.PATH.POSTS, posts_1.postsRouter);
exports.app.use(config_1.CONFIG.PATH.TESTING, testing_1.testingRouter);
