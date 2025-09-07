import express from 'express'
import { authenticatedToken, requireRole } from '../middlewares/auth.middleware.js'
import { getAdminData } from '../controllers/data.controller.js'

const dataRouter = express.Router()

dataRouter.get("/getData", authenticatedToken, requireRole("Administrador"), getAdminData)

export default dataRouter;