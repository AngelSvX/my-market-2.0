import express from 'express'
import { authController, createUserController, googleAuthController } from '../controllers/auth.controller.js'

const loginRouter = express.Router()

loginRouter.post("/login", authController)
loginRouter.post("/create", createUserController)
loginRouter.post("/google-auth", googleAuthController)

export default loginRouter;