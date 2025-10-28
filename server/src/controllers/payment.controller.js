import { payWithSripe } from "../services/payment.service.js";

export const createPaymentIntent = async (req, res) => {
  try {
    const {amount, currency = "usd", metadata} = req.body
    const { user_id } = metadata

    console.log(amount)
    console.log(currency)
    console.log(metadata)
    console.log(user_id)

    const paymentIntent = await payWithSripe({amount,currency, metadata, user_id})

    res.status(200).json(paymentIntent)

  } catch (error) {
      console.error("Error al crear PaymentIntent: ", error.message);
      res.status(500).json({error: error.message})
  }
}