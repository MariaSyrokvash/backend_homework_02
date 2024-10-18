import {body} from 'express-validator'
import {inputCheckErrorsMiddleware} from '../../../global-middlewares/inputCheckErrorsMiddleware'
import {NextFunction, Request, Response} from 'express'
import {blogsRepository} from '../blogsRepository'
import {adminMiddleware} from '../../../global-middlewares/admin-middleware'
import {HttpStatuses} from "../../../constants/httpStatusCode.constants";
import {
    MaxLengthBlogDescription,
    MaxLengthBlogName,
    MaxLengthBlogWebsiteUrl,
    MinLength
} from "../../../constants/blogValidator.constants";

// name: string // max 15
// description: string // max 500
// websiteUrl: string // max 100 ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$

export const nameValidator = body('name')
    .isString().withMessage('not string')
    .trim().isLength({min: MinLength, max: MaxLengthBlogName}).withMessage(`more 0 and less ${MaxLengthBlogName}`)


export const descriptionValidator = body('description')
    .isString().withMessage('not string')
    .trim().isLength({min: MinLength, max: MaxLengthBlogDescription}).withMessage('more then 500 or 0')

export const websiteUrlValidator = body('websiteUrl')
    .isString().withMessage('not string')
    .trim().isURL().withMessage('not url')
    .isLength({min: MinLength, max: MaxLengthBlogWebsiteUrl}).withMessage('more then 100 or 0')

export const findBlogValidator = (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const blog = blogsRepository.find(req.params.id)
    if (!blog) {
        res.sendStatus(HttpStatuses.NotFound404)
        return
    }
    next()
}


export const blogValidators = [
    adminMiddleware,

    nameValidator,
    descriptionValidator,
    websiteUrlValidator,

    inputCheckErrorsMiddleware,
]