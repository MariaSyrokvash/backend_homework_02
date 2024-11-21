import { type BlogInputModel } from './blogs.types';
import { type PostInputModel } from './posts.types';
import { type UserInputModel } from './users.types';

export type FieldNamesType = keyof BlogInputModel | keyof PostInputModel | UserInputModel;

export interface OutputErrorsType {
  errorsMessages: Array<{ message: string; field: FieldNamesType }>;
}
