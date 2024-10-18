import {Router} from 'express'
import {setDB} from '../../db/db'
import {HttpStatuses} from "../../constants/httpStatusCode.constants";
import {deleteDBController} from "./controllers/deleteDBController";

export const testingRouter = Router()

testingRouter.delete('/', deleteDBController)
