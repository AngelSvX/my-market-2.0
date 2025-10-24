import express from 'express'
import { createPaymentIntent } from '../controllers/payment.controller.js'

const paymentRoutes = express.Router()

paymentRoutes.post("/create-payment-intent", createPaymentIntent)

export default paymentRoutes