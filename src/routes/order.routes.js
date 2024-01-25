import { Router } from "express";
import { login } from "../utils/authjws.js";
import { Payment, Order } from "../db.js";
import { default as axios } from "axios";

import {createOrder, getOrderAllAdmin, getOrderByEmail, getOrderById} from "../controllers/orderController.js"

const orderRouter = Router();

orderRouter.get("/", getOrderAllAdmin);
orderRouter.get("/:emailUser", login, getOrderByEmail);
orderRouter.get("/comfirmation/:id", getOrderById);
orderRouter.post("", createOrder);
orderRouter.post("/webhooks", async (req, res) => {
  console.log(req.body);
  const data = req.body;
  if (data.action === "payment.updated") {
    try {
      const payment_mercado = (
        await axios.get(
          `https://api.mercadopago.com/v1/payments/${data.data.id}`,
          {
            headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` },
          }
        )
      ).data;
      console.log(payment_mercado);
      const pago = await Payment.update(
        {
          status: payment_mercado.status,
          net_received_amount:
            payment_mercado?.transaction_details?.net_received_amount,
          net_amount: payment_mercado.transaction_amount,
          fee_details_amount: payment_mercado?.fee_details?.[0]?.amount,
          net_amount: payment_mercado?.net_amount,
          status_detail: payment_mercado?.status_detail,
        },
        { where: { id_pago_merca: data.data.id } }
      );
      console.log(pago);
    } catch (error) {
      console.log(error);
    }
    return res.status(200).json({});
  }
});

orderRouter.patch("/:idOrder/", async (req, res) => {
  req.params.idOrder;
  const data = req.body;

  try {
    const order = await Order.update(data, {
      where: { id: req.params.idOrder },
    });
    return res.status(201).json({ message: "Order Actualizada", order: order });
  } catch (error) {
    console.log(error);
  }
});

export default orderRouter;
