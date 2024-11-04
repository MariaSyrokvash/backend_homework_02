import {body} from 'express-validator'
import {inputCheckErrorsMiddleware} from '../../../global-middlewares/inputCheckErrorsMiddleware'
import {NextFunction, Request, Response} from 'express'
import {blogsRepository} from '../blogsRepository'
import {adminMiddleware} from '../../../global-middlewares/admin-middleware'
import {HttpStatuses} from "../../../constants/httpStatusCode.constants";
import {
    MaxLengthBlogDescription,
    MaxLengthBlogName, MaxLengthBlogPostContent, MaxLengthBlogPostShortDescription, MaxLengthBlogPostTitle,
    MaxLengthBlogWebsiteUrl,
    MinLength
} from "../../../constants/blogValidator.constants";

// name: string // max 15
// description: string // max 500
// websiteUrl: string // max 100 ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$

// Blog
export const nameValidator = body('name')
    .isString().withMessage('not string')
    .trim().isLength({min: MinLength, max: MaxLengthBlogName}).withMessage(`more then ${MaxLengthBlogName} or 0`)


export const descriptionValidator = body('description')
    .isString().withMessage('not string')
    .trim().isLength({min: MinLength, max: MaxLengthBlogDescription}).withMessage(`more then ${MaxLengthBlogDescription} or 0`)

export const websiteUrlValidator = body('websiteUrl')
    .isString().withMessage('not string')
    .trim().isURL().withMessage('not url')
    .isLength({min: MinLength, max: MaxLengthBlogWebsiteUrl}).withMessage(`more then ${MaxLengthBlogWebsiteUrl} or 0`)

export const findBlogValidator = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const blog = await blogsRepository.getBlogById(req.params.id)
    if (!blog) {
        res.sendStatus(HttpStatuses.NotFound404)
        return
    }
    next()
}


// Post for specific blog
export const titleValidator = body('title')
  .isString().withMessage('not string')
  .trim().isLength({min: MinLength, max: MaxLengthBlogPostTitle}).withMessage(`more then ${MaxLengthBlogPostTitle} or 0`)

export const shortDescriptionValidator = body('shortDescription')
  .isString().withMessage('not string')
  .trim().isLength({min: MinLength, max: MaxLengthBlogPostShortDescription}).withMessage(`more then ${MaxLengthBlogPostShortDescription} or 0`)

export const contentValidator = body('shortDescription')
  .isString().withMessage('not string')
  .trim().isLength({min: MinLength, max: MaxLengthBlogPostContent}).withMessage(`more then ${MaxLengthBlogPostContent} or 0`)


const commonBlogValidators = [
    nameValidator,
    descriptionValidator,
    websiteUrlValidator,

    inputCheckErrorsMiddleware,
];

export const getBlogValidators = [
    findBlogValidator,
]


export const createBlogValidators = [
    adminMiddleware,
    ...commonBlogValidators
]


export const updateBlogValidators = [
    adminMiddleware,
    findBlogValidator,
    ...commonBlogValidators,
]

export const deleteBlogValidators = [
    adminMiddleware,
    findBlogValidator,
]

export const createPostInBlogValidators = [
    adminMiddleware,
    findBlogValidator,
    titleValidator,
    shortDescriptionValidator,
    contentValidator,

    inputCheckErrorsMiddleware,
]
