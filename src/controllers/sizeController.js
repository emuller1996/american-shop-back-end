const { Size, ProductSize, Product } = require("../db.js");

const createPostSize = async (req, res) => {
  console.log(req.body);
  const sizeCreate = req.body;
  try {
    const size = await Size.create(sizeCreate);
    return res.status(201).json({ message: "Size Created." });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

const updateSizeProduct = async (req, res) => {
  const data = req.body;

  try {
    const r = await ProductSize.update(data, { where: { id: data.id } });
    const sizes = await ProductSize.findAll({
      where: { ProductId: data.ProductId },
    });
    const totalTalla = sizes.reduce(
      (pre, current) => pre + parseInt(current.quantity),
      0
    );
    await Product.update(
      { stock: totalTalla },
      { where: { id: data.ProductId } }
    );
    return res
      .status(201)
      .json({ message: "Talla del producto actualizada.", size: r });
  } catch (error) {
    return res.status(404).json({ message: error.message });
    console.log(error);
  }
};

const getAllSize = async (req, res) => {
  try {
    const result = await Size.findAll();
    return res.status(200).json({ sizes: result });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const deleteSizeProduct = async (req, res) => {
  try {
    const s = await ProductSize.destroy({ where: { id: req.params.id } });
    const sizes = await ProductSize.findAll({
      where: { ProductId: req.params.idProducto },
    });
    const totalTalla = sizes.reduce(
      (pre, current) => pre + parseInt(current.quantity),
      0
    );
    await Product.update(
      { stock: totalTalla },
      { where: { id: req.params.idProducto } }
    );
    return res
      .status(201)
      .json({ message: "Se borro la talla del inventario." });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createPostSize,
  getAllSize,
  updateSizeProduct,
  deleteSizeProduct,
};
