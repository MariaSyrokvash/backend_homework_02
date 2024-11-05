import { Request, Response } from "express";
import { HttpStatuses } from "../../../constants/httpStatusCode.constants";
import { blogCollection, postCollection } from "../../../db/mongoDb";

export const deleteDBController = async (_: Request, res: Response) => {
  await postCollection.drop();
  await blogCollection.drop();
  res.sendStatus(HttpStatuses.NoContent204);
};
