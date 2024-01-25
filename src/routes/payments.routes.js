import { Router } from "express";
import { Payment, Order } from "../db.js";
import { default as axios } from "axios";

const paymentsRouter = Router();

paymentsRouter.get("/:idPayMercado/order", async (req, res) => {
  try {
    const data = (
      await axios.get(
        `https://api.mercadopago.com/v1/payments/${req.params.idPayMercado}`,
        {
          headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` },
        }
      )
    ).data;
    console.log(data.data);
    delete data.charges_details;
    delete data.fee_details;

    const pay = await Payment.findOne({
      where: { id_pago_merca: req.params.idPayMercado },
      include: [{ model: Order }],
    });

    res.status(200).json({ payment: pay, paymentMercado: data });
  } catch (error) {
    console.log(error);
  }
});

export default paymentsRouter;
