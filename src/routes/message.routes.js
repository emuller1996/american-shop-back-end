const { Router } = require("express");

const {
  getMessagesByOrder,
  postCreateMessage,
} = require("../controllers/MessageController");

const messageRouter = Router();

messageRouter.get("/:id", getMessagesByOrder);
messageRouter.post("/:id", postCreateMessage);

module.exports = messageRouter;
