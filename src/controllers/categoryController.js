import { Category, Product } from "../db.js";

const getCategories = async (req, res) => {
  try {
    const categoriesDB = await Category.findAll();
    const arrPr = categoriesDB.map(async (c) => {
      const p = await Product.findAll({ where: { CategoryId: c.id } });
      return {
        ...c.dataValues,
        productCantidad: p.length,
      };
    });
    const datos = await Promise.all(arrPr);
    const all = await Product.findAll();
    res.json([
      { id: "", name: "Todos ", productCantidad: all.length },
      ...datos,
    ]);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const postCategory = async (req, res) => {
  const { name } = req.params;
  try {
    const [newCategory, created] = await Category.findOrCreate({
      where: { name },
    });
    created
      ? res.json(newCategory)
      : res.status(403).json("Category already exist");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const category = req.body;
  try {
    console.log(category);
    const result = await Category.update(category, {
      where: {
        id: category.id,
      },
    });
    return res
      .status(202)
      .json({ response: "CATEGORY UPDATED", category: result });
  } catch (error) {}
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  Category.destroy({
    where: {
      id,
    },
  })
    .then((data) => res.status(200).json("Category deleted successfully"))
    .catch((error) => res.status(400).json(error.message));
};

export { getCategories, postCategory, updateCategory, deleteCategory };
