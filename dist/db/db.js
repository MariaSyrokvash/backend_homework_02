"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDB = exports.db = void 0;
const MockBlogs = [
    {
        id: "1",
        name: "TechSavvy",
        description: "TechSavvy covers the latest trends in technology, gadgets, and innovation. Dive deep into expert reviews, comparisons, and how-to guides on everything tech-related.",
        websiteUrl: "https://techsavvyworld.com/"
    },
    {
        id: "2",
        name: "FitnessGuru",
        description: "FitnessGuru provides comprehensive fitness tips, workout routines, and healthy eating advice. Whether you're a beginner or a pro, this blog is your go-to resource for fitness knowledge.",
        websiteUrl: "https://fitnessguruonline.com/"
    },
    {
        id: "3",
        name: "TravelTales",
        description: "TravelTales brings you firsthand experiences from around the world. From breathtaking landscapes to hidden gems, this blog offers travel tips, itineraries, and personal stories from passionate travelers.",
        websiteUrl: "https://traveltalesdiary.com/"
    },
    {
        id: "4",
        name: "FoodieLife",
        description: "FoodieLife is a culinary paradise for food lovers. Discover mouth-watering recipes, restaurant reviews, and cooking tips to inspire your next kitchen adventure or dining out experience.",
        websiteUrl: "https://foodielifehub.com/"
    },
    {
        id: "5",
        name: "EcoLiving",
        description: "EcoLiving focuses on sustainable living and environmental awareness. Explore practical tips for a greener lifestyle, product reviews, and news about the latest eco-friendly initiatives.",
        websiteUrl: "https://ecolivingplanet.com/"
    }
];
exports.db = {
    blogs: MockBlogs,
    posts: [],
};
const setDB = (dataset) => {
    var _a, _b;
    if (!dataset) {
        exports.db.blogs = [];
        exports.db.posts = [];
        return;
    }
    // если что-то передано - то заменяем старые значения новыми,
    // не ссылки - а глубокое копирование, чтобы не изменять dataset
    exports.db.blogs = ((_a = dataset.blogs) === null || _a === void 0 ? void 0 : _a.map(b => (Object.assign({}, b)))) || exports.db.blogs;
    exports.db.posts = ((_b = dataset.posts) === null || _b === void 0 ? void 0 : _b.map(p => (Object.assign({}, p)))) || exports.db.posts;
};
exports.setDB = setDB;
