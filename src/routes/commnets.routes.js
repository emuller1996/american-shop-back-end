const { Router } = require("express");

const { validateToken } = require("../utils/authjws.js");
const { Comment, Product, User } = require("../db.js");

const commentRouter = Router();

commentRouter.get("/", validateToken, async (req, res) => {
  const commetsAll = await Comment.findAll({
    include: [{ model: Product }, { model: User }],
  });

  return res.status(200).json(commetsAll);
});

module.exports = commentRouter;
