import { Images, Product } from "../db.js";

const createPostImagesByProduct = async (req, res) => {
  console.log(req.body);
  const ImagesCreate = req.body;
  try {
    const pro = await Product.findByPk(req.params.id);
    if (pro === null)
      return res.status(404).json({ message: "Producto no Encontrado" });
    const Image = await Images.create(ImagesCreate);
    return res.status(201).json({ message: "Images Created." });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

const getImagesByProduct = async (req, res) => {
  try {
    const pro = await Product.findByPk(req.params.id);
    if (pro === null)
      return res.status(404).json({ message: "Producto no Encontrado" });
    const result = await Images.findAll({
      where: { ProductId: req.params.id },
    });
    return res.status(200).json({ images: result });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export  {
  createPostImagesByProduct,
  getImagesByProduct,
};
