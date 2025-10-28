import { stripe } from "../settings/stripe.js";
import { myMarketDB } from "../settings/db.js";

export const payWithSripe = async ({ amount, currency = "usd", metadata, user_id }) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      description: "Producto My-market",
    });

    const addPayQuery = `
      INSERT INTO payments (amount, currency, user_id, metadata) VALUES(?,?,?,?)
    `

    const totalAmount = amount / 100

    const [result] = await myMarketDB.execute(
      addPayQuery, [
        totalAmount,
        currency,
        user_id,
        JSON.stringify(metadata)
      ]
    )
    

    return {
      client_secret: paymentIntent.client_secret,
      client_id: paymentIntent.id,
      result
    }

  } catch (error) {
    throw error
  }
};

export const getTransactionsByUser = async (id) => {
  try {
    const getTransactionQuery = `
      SELECT p.metadata, p.amount, p.currency FROM payments p
      INNER JOIN users u ON u.id = p.user_id
      WHERE p.user_id = ?;
    `;

    const [response] = await myMarketDB.execute(getTransactionQuery, [
      id
    ])

    return response

  } catch (error) {
    throw error
  }
};