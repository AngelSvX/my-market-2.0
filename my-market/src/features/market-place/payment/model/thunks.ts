import { createAsyncThunk } from "@reduxjs/toolkit";
import type { PaymentElement } from "./types";
import { paymentApi } from "../api";

export const payArticle = createAsyncThunk<
  PaymentResponse,
  PaymentElement
>(
  "pay/payment",
  async (payload: PaymentElement) => {
    return await paymentApi.payItems(payload);
  }
);
