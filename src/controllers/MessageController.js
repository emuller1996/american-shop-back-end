import { Message } from "../db.js";

const getMessagesByOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const messages = await Message.findAll({
      where: { OrderId: id },
    });
    return res.json(messages);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const postCreateMessage = async (req, res) => {
  const { message, written, OrderId } = req.body;
  try {
    const messages = await Message.create({
      message,
      written,
      read: false,
      OrderId,
    });
    return res.status(201).json({ message: "Mensaje Enviado" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

export {
  getMessagesByOrder,
  postCreateMessage,
};
