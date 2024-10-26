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
