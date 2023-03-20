const { Order, Product, DeliveryAddress } = require("../db.js");

const createOrder = async (req, res) => {
  let order = req.body;
  let { products } = order;
  try {
    delete order.products;
    console.log(order);
    if (!order.DeliveryAddressId)
      return res
        .status(405)
        .json({ message: "ERROR : DIRECCION NO SELECIONA" });
    let orderDB = await Order.create(order);
    products?.map(async (e) => {
      let productDB = await Product.findByPk(e.id);
      await orderDB.addProduct(productDB, { through: { units: e.cant } });
    });
    return res
      .status(201)
      .json({
        response: true,
        message: "CORRECTO>ORDEN REGISTRADA CORRECTAMENTE.",
      });
  } catch (error) {
    res.status(400).json(error.message);
  }
  res.json({ response: "createOrder" });
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
    });
    console.log(result)
    res.status(201).json({ orders :result})
  } catch (error) {
    res.status(404).json({error : error.message})
  }

};

module.exports = {
  createOrder,
  getOrderByEmail,
  getOrderAllAdmin,
};
