import {Request, Response} from 'express'
import {HttpStatuses} from "../../../constants/httpStatusCode.constants";
import {setDB} from "../../../db/db";

export const deleteDBController = (req: Request, res: Response) => {
    setDB();
    res.sendStatus(HttpStatuses.NoContent204);
}
