const { Router } = require("express");
const {
  createOrder,
  getOrderByEmail,
  getOrderAllAdmin,
  getOrderById,
} = require("../controllers/orderController");
const { login } = require("../utils/authjws.js");
const { Payment } = require("../db.js");

const orderRouter = Router();

orderRouter.get("/", getOrderAllAdmin);
orderRouter.get("/:emailUser", login, getOrderByEmail);
orderRouter.get("/comfirmation/:id", getOrderById);
orderRouter.post("", createOrder);
orderRouter.post("/webhooks", async (req, res) => {
  console.log(req.body);
  const data = req.body;
  if (data.action === "payment.updated") {
    const payment_mercado = await axios.get(
      `https://api.mercadopago.com/v1/payments/${data.data.id}`,
      {
        headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` },
      }
    );
    console.log(payment_mercado);
    try {
      const pago = await Payment.update(
        {
          status: payment_mercado.status,
          net_received_amount:
            payment_mercado.transaction_details.net_received_amount,
          fee_details_amount: payment_mercado.fee_details[0]?.amount,
          net_amount: payment_mercado.net_amount,
          status_detail: payment_mercado.status_detail,
        },

        { where: { id_pago_merca: data.data.id } }
      );
    } catch (error) {
      console.log(error);
    }
    return res.status(200).json({});
  }
});

module.exports = orderRouter;
