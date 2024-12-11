import { body } from 'express-validator';
import { MaxLengthPostContent, MaxLengthPostShortDescription, MaxLengthPostTitle, MinLength } from '../posts.constants';
import { adminAuthGuard } from '../../../middlewares/admin.middlewares';
import { inputCheckErrors } from '../../../middlewares/inputCheckErrors.middlewares';
import { blogsRepository } from '../../blogs/blogs.repository';

export const titleValidator = body('title')
  .isString()
  .withMessage('not string')
  .trim()
  .isLength({ min: MinLength, max: MaxLengthPostTitle })
  .withMessage(`more then ${MaxLengthPostTitle} or 0`);

export const shortDescriptionValidator = body('shortDescription')
  .isString()
  .withMessage('not string')
  .trim()
  .isLength({ min: MinLength, max: MaxLengthPostShortDescription })
  .withMessage(`more then ${MaxLengthPostShortDescription} or 0`);

export const contentValidator = body('content')
  .isString()
  .withMessage('not string')
  .trim()
  .isLength({ min: MinLength, max: MaxLengthPostContent })
  .withMessage(`more then ${MaxLengthPostContent} or 0`);

export const blogIdValidator = body('blogId')
  .isString()
  .withMessage('not string')
  .trim()
  .custom(async (blogId: string) => {
    const blog = await blogsRepository.checkExistById(blogId);
    console.log('Blog existence:', blog);

    if (!blog) {
      throw new Error('no blog');
    }
    return true;
  })
  .withMessage('no blog');

const commonPostValidators = [titleValidator, shortDescriptionValidator, contentValidator, inputCheckErrors];

export const createPostValidators = [adminAuthGuard, blogIdValidator, ...commonPostValidators];

export const updatePostValidators = [adminAuthGuard, ...commonPostValidators];

export const deletePostValidators = [adminAuthGuard];
