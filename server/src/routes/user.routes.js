import express from 'express'
import { addCategoriesController, addCommentByPostController, addPostController, changeStatusController, filterByCategoryController, getAllPostsController, getCategoriesController, getCommentsByPostController, updatePostController, userProfileDataController } from '../controllers/user.controller.js'
import { authenticatedToken, requireRole } from '../middlewares/auth.middleware.js'

const userRouter = express.Router()

userRouter.get("/profile/:id", userProfileDataController)
userRouter.post("/addCategory", authenticatedToken, requireRole("Administrador"), addCategoriesController)
userRouter.get("/getComments/:id", getCommentsByPostController)
userRouter.get("/getPosts", getAllPostsController)
userRouter.post("/addCommentByPost", addCommentByPostController)
userRouter.post("/addPost", authenticatedToken, requireRole("Vendedor"), addPostController)
userRouter.get("/getCategories", getCategoriesController)
userRouter.put("/updateStatus/:id", authenticatedToken, requireRole("Administrador"), changeStatusController)
userRouter.get("/filterByCategory/:id", filterByCategoryController)
userRouter.put("/updatePost/:id", updatePostController)

export default userRouter