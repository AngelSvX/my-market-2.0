import express from 'express'
import { addCategoriesController, getCommentsByPostController, userProfileDataController } from '../controllers/user.controller.js'
import { authenticatedToken, requireRole } from '../middlewares/auth.middleware.js'

const userRouter = express.Router()

userRouter.get("/profile/:id", userProfileDataController)
userRouter.post("/addCategory", authenticatedToken, requireRole("Administrador"), addCategoriesController)
userRouter.get("/getComments/:id", getCommentsByPostController)

export default userRouter