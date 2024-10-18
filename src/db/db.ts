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


export const db: DBType = {
    blogs: MockBlogs,
    posts: [],
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
