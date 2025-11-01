import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { testConnection } from "./settings/db.js";
import dataRouter from "./routes/data.routes.js";
import loginRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log("Server initialized on port 3000");
});

app.use("/api/v1/auth", loginRouter)
app.use("/api/v1/data", dataRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/payments", paymentRoutes)
console.log("cambios 1/11/25 - 14:25:00");

testConnection();
