import { Router } from "express";

import { validateToken } from "../utils/authjws.js";
import { Comment, Product, User, SubComment, Notification } from "../db.js";
import { DATE } from "sequelize";
import { crearNotificacion } from "../utils/index.js";

const commentRouter = Router();

commentRouter.get("/", validateToken, async (req, res) => {
  try {
    const commetsAll = await Comment.findAll({
      include: [{ model: Product }, { model: User }],
      order:  [['createdAt',"DESC"]]

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
    const come = await Comment.findByPk(req.params.id);

    console.log(come.UserId);
    /* await Notification.create({
      type: "Comentario",
      message: "Tu Comentarios ha Sido Respondido",
      status: false,
      link: `/articulo/${come.ProductId}`,
      UserId: come.UserId,
    }); */
    await crearNotificacion(
      "Comentario",
      "Tu Comentario ha sido Respondido.",
      `/articulo/${come.ProductId}`,
      come.UserId
    );

    return res
      .status(201)
      .json({ subcomment: sb, message: "Respuesta creada" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});



export default commentRouter;
