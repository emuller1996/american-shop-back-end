const { Router } = require("express");

const { validateToken } = require("../utils/authjws.js");
const { Comment, Product, User, SubComment } = require("../db.js");
const { DATE } = require("sequelize");

const commentRouter = Router();

commentRouter.get("/", validateToken, async (req, res) => {
  try {
    const commetsAll = await Comment.findAll({
      include: [{ model: Product }, { model: User }],
    });
    return res.status(200).json(commetsAll);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

commentRouter.post("/:id/subcomment", validateToken, async (req, res) => {
  console.log(req.body);

  try {
    const sb = await SubComment.create({
      comment: req.body.comment,
      CommentId: req.params.id,
      write_by: req.body.write_by,
    });
    console.log(sb);
    return res
      .status(201)
      .json({ subcomment: sb, message: "Respuesta creada" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

module.exports = commentRouter;
