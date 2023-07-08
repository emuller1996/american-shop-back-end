const {
  Order,
  Product,
  DeliveryAddress,
  User,
  OrderDetail,
} = require("../db.js");

const createOrder = async (req, res) => {
  let order = req.body;
  let { products } = order;
  try {
    delete order.products;
    if (!order.DeliveryAddressId)
      return res
        .status(405)
        .json({ message: "ERROR : DIRECCION NO SELECIONA" });

    let userClient = await User.findOne({ where: { email: order.user_email } });
    order.UserId = userClient.id;
    let orderDB = await Order.create(
      Object.assign(order, { status: "PENDIENTE" })
    );

    products?.map(async (e) => {
      let productDB = await Product.findByPk(e.id);
      await orderDB.addProduct(productDB, {
        through: {
          units: e.cant,
          unitPrice: e.price,
          totalPrice: e.price * e.cant,
        },
      });
    });
    return res.status(201).json({
      response: true,
      message: "CORRECTO>ORDEN REGISTRADA CORRECTAMENTE.",
      order: orderDB,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { emailUser } = req.params;
    const orderBy = [["id", "DESC"]];
    const order = await Order.findAll({
      where: {
        user_email: emailUser,
      },
      include: [{ model: Product }, { model: DeliveryAddress }],
      order: orderBy,
    });

    res.status(200).send(order);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getOrderAllAdmin = async (req, res) => {
  try {
    const result = await Order.findAll({
      order: [["id", "ASC"]],
      include: [{ model: User }],
    });
    console.log(result);
    res.status(201).json({ orders: result });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  const idOrder = req.params.id;
  try {
    const OrderSearch = await Order.findOne({
      where: {
        id: idOrder,
      },
      include: [{ model: Product }, { model: DeliveryAddress },{ model: User }],
    });
    if (!OrderSearch)
      return res
        .status(404)
        .json({ response: "ERROR ", message: "ERROR>> NO EXISTE LA ORDEN" });

    return res.status(200).json({ order: OrderSearch });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderByEmail,
  getOrderAllAdmin,
  getOrderById,
};
