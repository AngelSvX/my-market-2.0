import express from 'express'
import { authController, createUserController } from '../controllers/auth.controller.js'

const loginRouter = express.Router()

loginRouter.post("/login", authController)
loginRouter.post("/create", createUserController)

export default loginRouter;