const { default: axios } = require("axios");
const {
  Order,
  Product,
  DeliveryAddress,
  User,
  OrderDetail,
  Size,
} = require("../db.js");
const mercadopago = require("mercadopago");
const { or } = require("sequelize");

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

const { REACT_APP } = process.env;
const createOrder = async (req, res) => {
  /* console.log(req.body.products); */

  var payment_data = {
    transaction_amount: 5000,
    description: "Título del producto",
    payment_method_id: "pse",
    payer: {
      entity_type: "individual",
      email: req.body.user_email,
      identification: {
        type: "CC",
        number: "114734866",
      },
    },
    items: req.body.products.map((p) => {
      return { title: p?.name, quantity: p?.cant, unit_price: p?.price };
    }),
    transaction_details: {
      financial_institution: "1507",
    },
    callback_url: "https://american-shop-eco.vercel.app/",
    back_urls: {
      success: `${REACT_APP}/pago-realizado`,
      failure: `${REACT_APP}/pago-cancelado`,
      pending: `${REACT_APP}/pago-pendiente`,
    },
  };

  let { products } = req.body;
  try {
    let order = req.body;
    order.total_payment = req.body.transaction_amount;
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

      const s = await OrderDetail.create({
        units: e.cant,
        unitPrice: e.price,
        totalPrice: e.price * e.cant,
        SizeId: e.idSize,
        ProductId: e.id,
        OrderId: orderDB.id,
      });
      /* console.log(s); */
      /*  await orderDB.addProduct(productDB, {
        through: {
          units: e.cant,
          unitPrice: e.price,
          totalPrice: e.price * e.cant,
          idSize: e.idSize,
        },
      }); */
    });
    const datapay = req.body;
    datapay.additional_info = { ip_address: "127.0.0.1" };
    datapay.callback_url = "https://american-shop-eco.vercel.app/";

    delete datapay.DeliveryAddressId;
    delete datapay.UserId;
    delete datapay.purchase_date;
    delete datapay.total_payment;
    delete datapay.user_email;
    delete datapay.status;

    const t = await axios.post(
      "https://api.mercadopago.com/v1/payments",
      req.body,
      {
        headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` },
      }
    );
    console.log(t.data);

    /* mercadopago.preferences
      .create(payment_data)
      .then(function (response) {
        res.send(response.body.init_point);
        //res.redirect({response.body.id})
        // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
      })
      .catch(function (error) {
        console.log(error);
        res.status(400).json(error.message);
      }); */
    return res.status(201).json({
      response: true,
      message: "CORRECTO>ORDEN REGISTRADA CORRECTAMENTE.",
      order: orderDB,
      payment_data: t.data,
    });
  } catch (error) {
    console.log(error);
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
      include: [{ model: OrderDetail }, { model: DeliveryAddress }],
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
      include: [
        /* { model: Product }, */
        { model: DeliveryAddress },
        { model: User },
        { model: OrderDetail, include: [{ model: Size }, { model: Product }] },
      ],
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
