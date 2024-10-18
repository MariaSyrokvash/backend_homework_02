import {BlogDbType} from './blog-db-type'
import {PostDbType} from './post-db-type'

export type DBType = {
    blogs: BlogDbType[]
    posts: PostDbType[]
}
export type ReadonlyDBType = {
    blogs: Readonly<BlogDbType[]>
    posts: Readonly<PostDbType[]>
}

const MockBlogs: BlogDbType[] = [
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

const MockPosts: PostDbType[] = [
    {
        id: "1",
        title: "Top 5 Gadgets 2024", // max 30 characters
        shortDescription: "Discover the latest must-have gadgets that will shape the tech world in 2024.", // max 100 characters
        content: "From AI-driven devices to the latest in wearable tech, these gadgets are game-changers for tech enthusiasts.", // max 150 characters
        blogId: "1", // TechSavvy blog
        blogName: "TechSavvy"
    },
    {
        id: "2",
        title: "Workout Routines for Beginners", // max 30 characters
        shortDescription: "Start your fitness journey with these easy-to-follow workout routines.", // max 100 characters
        content: "These beginner-friendly workouts focus on building core strength and improving endurance with minimal equipment.", // max 150 characters
        blogId: "2", // FitnessGuru blog
        blogName: "FitnessGuru"
    },
    {
        id: "3",
        title: "Hidden Gems of Europe", // max 30 characters
        shortDescription: "Uncover Europe's hidden gems, from small towns to breathtaking natural wonders.", // max 100 characters
        content: "TravelTales takes you off the beaten path with these stunning European destinations perfect for your next trip.", // max 150 characters
        blogId: "3", // TravelTales blog
        blogName: "TravelTales"
    },
    {
        id: "4",
        title: "10-Minute Vegan Meals", // max 30 characters
        shortDescription: "Quick, easy, and delicious vegan meals you can whip up in just 10 minutes.", // max 100 characters
        content: "FoodieLife offers simple yet tasty vegan recipes that are perfect for busy weekdays or anyone new to plant-based cooking.", // max 150 characters
        blogId: "4", // FoodieLife blog
        blogName: "FoodieLife"
    },
    {
        id: "5",
        title: "Green Energy for Homes", // max 30 characters
        shortDescription: "Explore the latest in green energy solutions for making your home more sustainable.", // max 100 characters
        content: "EcoLiving dives into affordable, accessible green energy options like solar panels and energy-efficient appliances.", // max 150 characters
        blogId: "5", // EcoLiving blog
        blogName: "EcoLiving"
    },
    {
        id: "6",
        title: "AI Trends to Watch", // max 30 characters
        shortDescription: "The top artificial intelligence trends that will dominate the tech industry in 2024.", // max 100 characters
        content: "From generative AI to ethical concerns, TechSavvy reviews the most influential AI developments this year.", // max 150 characters
        blogId: "1", // TechSavvy blog
        blogName: "TechSavvy"
    },
    {
        id: "7",
        title: "Strength Training Tips", // max 30 characters
        shortDescription: "Maximize your strength training results with these expert tips and techniques.", // max 100 characters
        content: "FitnessGuru shares effective strategies for building muscle and improving performance in your strength training regimen.", // max 150 characters
        blogId: "2", // FitnessGuru blog
        blogName: "FitnessGuru"
    },
    {
        id: "8",
        title: "Island Escapes", // max 30 characters
        shortDescription: "Escape to these beautiful, lesser-known islands for your next adventure.", // max 100 characters
        content: "TravelTales uncovers hidden island paradises, ideal for travelers seeking serenity and natural beauty.", // max 150 characters
        blogId: "3", // TravelTales blog
        blogName: "TravelTales"
    },
]


export const db: DBType = {
    blogs: MockBlogs,
    posts: MockPosts,
}

export const setDB = (dataset?: Partial<ReadonlyDBType>) => {
    if (!dataset) {
        db.blogs = []
        db.posts = []
        return
    }

    // если что-то передано - то заменяем старые значения новыми,
    // не ссылки - а глубокое копирование, чтобы не изменять dataset
    db.blogs = dataset.blogs?.map(b => ({...b})) || db.blogs
    db.posts = dataset.posts?.map(p => ({...p})) || db.posts
}
