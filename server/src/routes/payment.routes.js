import express from 'express'
import { createPaymentIntent, getTransactionsByUserController } from '../controllers/payment.controller.js'
import { authenticatedToken, requireRole } from '../middlewares/auth.middleware.js'

const paymentRoutes = express.Router()

paymentRoutes.post("/create-payment-intent", createPaymentIntent)
paymentRoutes.get("/getTransactionByUser/:id", getTransactionsByUserController)

export default paymentRoutes