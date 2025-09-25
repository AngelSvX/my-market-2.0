import express from 'express'
import { addCategoriesController, addCommentByPostController, getAllPostsController, getCommentsByPostController, userProfileDataController } from '../controllers/user.controller.js'
import { authenticatedToken, requireRole } from '../middlewares/auth.middleware.js'

const userRouter = express.Router()

userRouter.get("/profile/:id", userProfileDataController)
userRouter.post("/addCategory", authenticatedToken, requireRole("Administrador"), addCategoriesController)
userRouter.get("/getComments/:id", getCommentsByPostController)
userRouter.get("/getPosts", getAllPostsController)
userRouter.post("/addCommentByPost", addCommentByPostController)

export default userRouter