import { Router } from "express";

import { getMessagesByOrder, postCreateMessage } from "../controllers/MessageController.js";

const messageRouter = Router();

messageRouter.get("/:id", getMessagesByOrder);
messageRouter.post("/:id", postCreateMessage);

export default messageRouter;
