import { Product, ProductSize, Category, Size, Images, Comment, User, SubComment } from "../db.js";
import { Op } from "sequelize";
import { validate } from "uuid";
import jwt_decode from "jwt-decode";

const getProducts = async (req, res) => {
  const pageNumber = Number.parseInt(req.query.page);
  const sizeNumber = Number.parseInt(req.query.size);
  const cat = req.query.cat; //recibo la categoria x query en la variable cat
  const orderPrice = req.query.ordprice; // Se recibe por query el criterio de ordenacion EJ: &ordprice=ASC
  const search = req.query.search; // en caso de llamar este endpoint para search x query enviar EJ: &search=iPhone
  const brand = req.query.brand; // en caso de llamar este endpoint para brands x query enviar EJ: &brand=Apple
  const disc = req.query.disc; //en caso de tener un descuento aplicado

  let page = 0;
  let size = 12;
  let where = {};
  let order = [["id", "ASC"]];

  if (!Number.isNaN(pageNumber) && pageNumber > 0) page = pageNumber;
  if (!Number.isNaN(sizeNumber) && sizeNumber > 0 && sizeNumber < 12)
    size = sizeNumber;
  if (cat) where.CategoryId = cat;
  if (brand) where.brand = brand;
  if (orderPrice) order = [["price", orderPrice]];
  if (search?.length > 0) where.name = { [Op.iLike]: `%${search}%` };
  if (disc) where.OfferId = disc;

  try {
    const products = await Product.findAll({
      include: [{ model: Category }],
      where,
      order,
    });
    return res.status(200).json({
      products: products,
    });
  } catch {
    res.status(201).json({ error: "Product not found" });
  }
};

const getProductsPublished = async (req, res) => {
  const pageNumber = Number.parseInt(req.query.page);
  const sizeNumber = Number.parseInt(req.query.size);
  const cat = req.query.cat; //recibo la categoria x query en la variable cat
  const gender = req.query.gender; //recibo la categoria x query en la variable cat

  const orderPrice = req.query.ordprice; // Se recibe por query el criterio de ordenacion EJ: &ordprice=ASC
  const search = req.query.search; // en caso de llamar este endpoint para search x query enviar EJ: &search=iPhone
  const brand = req.query.brand; // en caso de llamar este endpoint para brands x query enviar EJ: &brand=Apple
  const disc = req.query.disc; //en caso de tener un descuento aplicado

  let page = 0;
  let size = 12;
  let where = {};
  let order = [["id", "ASC"]];

  if (!Number.isNaN(pageNumber) && pageNumber > 0) page = pageNumber;
  if (!Number.isNaN(sizeNumber) && sizeNumber > 0 && sizeNumber < 12)
    size = sizeNumber;
  if (cat) where.CategoryId = cat;
  if (gender) where.gender = gender;
  if (brand) where.brand = brand;
  if (orderPrice) order = [["price", orderPrice]];
  if (search?.length > 0) where.name = { [Op.iLike]: `%${search}%` };
  if (disc) where.OfferId = disc;
  where.published = true;

  try {
    const products = await Product.findAndCountAll({
      include: [{ model: Category }],
      where,
      order,
      limit: size,
      offset: page * size,
    });
    console.log(products.count);

    return res.status(200).json({
      totalPages: Math.ceil(products.count / size),
      products: products.rows,
    });
  } catch {
    res.status(201).json({ error: "Product not found" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  let idNumber = Number.parseInt(id);
  validate(id);
  console.log(validate(id));
  if (validate(id)) {
    idNumber = id;
    try {
      const product = await Product.findByPk(idNumber, {
        include: [
          {
            model: Category,
          },
          { model: Size },
          { model: Images },
        ],
        attributes: {},
      });
      if (product) return res.status(200).json(product);
    } catch (error) {
      res.json(error.message);
    }
  }
  res.status(404).json({ error: "product ID not found or invalid" });
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, CategoryId, brand } = req.body;
    console.log(req.body);
    const stock = 0;
    if (!name  || !description || !price || !brand)
      throw Error("Invalid inputs");

    let productData = await Product.findAll({
      where: {
        name,
        brand,
        stock,
      },
    });

    if (productData.length > 0) throw Error("Product already in database");

    await Product.create(
      {
        name,
        description,
        price,
        stock,
        brand,
        CategoryId,
      },
      { include: [Size] }
    );
    res.status(200).json({ message: "Producto Creado Correctamente" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const product = req.body;

  try {
    const result = await Product.update(product, {
      where: {
        id: product.id,
      },
    });
    return res.status(202).json({ message: "Producto Actualizado"});
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const createSizeProduct = async (req, res) => {
  const data = req.body;
  try {
    const s = await ProductSize.create(data);
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
    return res.status(201).json({ message: "Talla Creada" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

const getSizeProduct = async (req, res) => {
  try {
    const sizes = await ProductSize.findAll({
      where: { ProductId: req.params.id },
      include: { model: Size },
    });
    return res.status(200).json(sizes);
  } catch (error) {
    console.log(error);
  }
};

const getCommetsByUser = async (req, res) => {
  const { id } = req.params;
  validate(id);
  const coment = await Comment.findAll({
    where: { ProductId: id },
    include: [{ model: User }, { model: SubComment }],
  });
  console.log(coment);
  return res.status(200).json(coment);
};

const postCreateCommetsByUser = async (req, res) => {
  console.log(req.body);
  try {
    const use = await User.findOne({ where: { email: req.body.email } });
    const co = await Comment.create({
      comment: req.body.comment,
      ProductId: req.params.id,
      UserId: use.id,
      read: false,
    });

    return res.status(200).json({ comment: co, message: "Comentario Creado" });
  } catch (error) {
    console.log(error);
  }
};

export  {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  createSizeProduct,
  getSizeProduct,
  getProductsPublished,
  getCommetsByUser,
  postCreateCommetsByUser,
};
