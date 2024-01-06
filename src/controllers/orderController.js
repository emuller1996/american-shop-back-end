const { default: axios } = require("axios");
const {
  Order,
  Product,
  DeliveryAddress,
  User,
  OrderDetail,
  Size,
  Payment,
} = require("../db.js");
const mercadopago = require("mercadopago");
const { or } = require("sequelize");
const nodemailer = require("nodemailer");

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

const { USER_MAIL_A, MAIL_PASS } = process.env;
const { REACT_APP } = process.env;
const createOrder = async (req, res) => {
  /*   console.log(req.body); */

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    port: 587,
    auth: {
      user: USER_MAIL_A,
      pass: MAIL_PASS,
    },
  });

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
    var hmtlProducts = "";
    products?.map(async (e) => {
      let productDB = await Product.findByPk(e.id);
      hmtlProducts += `<li> Producto : ${productDB.name} Precio : ${e.price} Cantidad : ${e.cant}</li>`;
      const s = await OrderDetail.create({
        units: e.cant,
        unitPrice: e.price,
        totalPrice: e.price * e.cant,
        SizeId: e.idSize,
        ProductId: e.id,
        OrderId: orderDB.id,
      });
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
    const paymerca = t.data;
    const r = await Payment.create({
      OrderId: orderDB.id,
      id_pago_merca: paymerca.id,
      net_received_amount: paymerca.transaction_details.net_received_amount,
      net_amount: paymerca.net_amount,
      fee_details_amount: paymerca.fee_details[0]?.amount,
      status: paymerca.status,
      status_detail: paymerca.status_detail,
      payment_method: paymerca.payment_method.id,
      external_resource_url:
        paymerca?.transaction_details?.external_resource_url,
    });

    await transporter.sendMail({
      from: '"AmericanShopVIP Ecommerce" <mullerdevsoftware@gmail.com>', // sender address
      to: `${userClient.email}`, // list of receivers
      subject: `Confirmación de Orden Compra`, // Subject line
      //text: `${message}`, // plain text body
      html: `<!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmación de Orden de Compra</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
              }
      
              .container {
                  width: 60%;
                  margin: 20px auto;
                  background-color: #fff;
                  padding: 20px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
      
              h2 {
                  color: #333;
              }
      
              p {
                  color: #666;
              }
      
              .order-details {
                  margin-top: 20px;
                  border-top: 1px solid #ddd;
                  padding-top: 10px;
              }
      
              .footer {
                  margin-top: 20px;
                  text-align: center;
                  color: #888;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Confirmación de Orden de Compra</h2>
              <p>Estimado/a ${userClient.name},</p>
              
              <p>Gracias por tu orden de compra. A continuación, te proporcionamos los detalles de tu pedido:</p>
      
              <div class="order-details">
                  <p><strong>Número de Orden:</strong> #${orderDB.id}</p>
                  <p><strong>Fecha de Pedido:</strong> ${orderDB.purchase_date}</p>
                  <!-- Agrega más detalles según tu modelo de datos -->

              </div>
              <ul>
                ${hmtlProducts}
              </ul>      
              <div class="footer">
                  <p>Gracias por elegir nuestros servicios. Si tienes alguna pregunta, no dudes en contactarnos.</p>
                  <p>Atentamente,<br>El equipo de AmericanShop</p>
              </div>
          </div>
      </body>
      </html>
      `,
    });

    return res.status(201).json({
      response: true,
      message: "CORRECTO>ORDEN REGISTRADA CORRECTAMENTE.",
      order: orderDB,
      payment_data: r,
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
        { model: Payment },
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
