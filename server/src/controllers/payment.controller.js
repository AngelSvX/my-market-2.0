import { stripe } from "../settings/stripe.js";

export const createPaymentIntent = async (req, res) => {
  try {
    const {amount, currency} = req.body

    // amout debe estar en centavos

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {enabled: true}
    })

    res.json({
      clientSecret: paymentIntent.client_secret
    })

  } catch (error) {
      console.error("Error al crear PaymentIntent: ", error.message);
      res.status(500).json({error: error.message})
  }
}