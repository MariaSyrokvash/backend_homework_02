"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
const db_1 = require("../../db/db");
exports.blogsRepository = {
    create(blog) {
        const newBlog = {
            id: new Date().toISOString() + Math.random(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
        };
        db_1.db.blogs = [...db_1.db.blogs, newBlog];
        return newBlog.id;
    },
    find(id) {
        return db_1.db.blogs.find(b => b.id === id);
    },
    findAndMap(id) {
        const blog = this.find(id); // ! используем этот метод если проверили существование
        return this.map(blog);
    },
    getAll() {
        return db_1.db.blogs.map(p => this.map(p));
    },
    deleteBlog(id) {
        const blogIndex = db_1.db.blogs.findIndex(b => b.id === id);
        if (blogIndex === -1) {
            return false;
        }
        db_1.db.blogs.splice(blogIndex, 1);
        return true;
    },
    updateBlog(body, id) {
        const blogIndex = db_1.db.blogs.findIndex(b => b.id === id);
        if (blogIndex === -1) {
            return false;
        }
        db_1.db.blogs[blogIndex] = Object.assign(Object.assign({}, db_1.db.blogs[blogIndex]), body);
        return true;
    },
    map(blog) {
        const blogForOutput = {
            id: blog.id,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            name: blog.name,
        };
        return blogForOutput;
    },
};
