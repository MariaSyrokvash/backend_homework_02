import { body } from 'express-validator';
import {
  MaxLengthBlogDescription,
  MaxLengthBlogName,
  MaxLengthBlogPostContent,
  MaxLengthBlogPostShortDescription,
  MaxLengthBlogPostTitle,
  MaxLengthBlogWebsiteUrl,
  MinLength,
} from '../blogs.constants';
import { adminAuthGuard } from '../../../middlewares/admin.middlewares';
import { inputCheckErrors } from '../../../middlewares/inputCheckErrors.middlewares';

export const nameValidator = body('name')
  .isString()
  .withMessage('not string')
  .trim()
  .isLength({ min: MinLength, max: MaxLengthBlogName })
  .withMessage(`more then ${MaxLengthBlogName} or 0`);

export const descriptionValidator = body('description')
  .isString()
  .withMessage('not string')
  .trim()
  .isLength({ min: MinLength, max: MaxLengthBlogDescription })
  .withMessage(`more then ${MaxLengthBlogDescription} or 0`);

export const websiteUrlValidator = body('websiteUrl')
  .isString()
  .withMessage('not string')
  .trim()
  .isURL()
  .withMessage('not url')
  .isLength({ min: MinLength, max: MaxLengthBlogWebsiteUrl })
  .withMessage(`more then ${MaxLengthBlogWebsiteUrl} or 0`);

// Post for specific blog
export const titleValidator = body('title')
  .isString()
  .withMessage('not string')
  .trim()
  .isLength({ min: MinLength, max: MaxLengthBlogPostTitle })
  .withMessage(`more then ${MaxLengthBlogPostTitle} or 0`);

export const shortDescriptionValidator = body('shortDescription')
  .isString()
  .withMessage('not string')
  .trim()
  .isLength({ min: MinLength, max: MaxLengthBlogPostShortDescription })
  .withMessage(`more then ${MaxLengthBlogPostShortDescription} or 0`);

export const contentValidator = body('content')
  .isString()
  .withMessage('not string')
  .trim()
  .isLength({ min: MinLength, max: MaxLengthBlogPostContent })
  .withMessage(`more then ${MaxLengthBlogPostContent} or 0`);

const commonBlogValidators = [nameValidator, descriptionValidator, websiteUrlValidator, inputCheckErrors];

export const createBlogValidators = [adminAuthGuard, ...commonBlogValidators];

export const updateBlogValidators = [adminAuthGuard, ...commonBlogValidators];

export const deleteBlogValidators = [adminAuthGuard];

export const createPostInBlogValidators = [adminAuthGuard, titleValidator, shortDescriptionValidator, contentValidator, inputCheckErrors];
