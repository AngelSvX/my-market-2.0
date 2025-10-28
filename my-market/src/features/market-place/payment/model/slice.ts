import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MetadataPayment, PaymentElement, PaymentState, TransactionResponse } from "./types";
import { getTransactions, payArticle } from "./thunks";

const initialState: PaymentState = {
  payment: null,
  metadata: null,
  wasPaid: false,
  transactions: [],
  loading: false,
  error: null,
};

export const paymentSlice = createSlice({
  name: "pay",
  initialState,
  reducers: {
    // Aquí primero pasaremos la información del metadata a nuestro initialState metadata
    addMetadata: (state, data: PayloadAction<MetadataPayment>): void => {
      if (state.payment?.metadata) {
        state.payment.metadata = data.payload;
      }
    },
    // Ya debe de existir un metadata, por lo cual, ingresamos el amount, currency y luego el metadata del initialState
    addPaymentData: (state, data: PayloadAction<PaymentElement>): void => {
      if (state.payment && state.metadata) {
        state.payment.amount = data.payload.amount;
        state.payment.currency = data.payload.currency;
        state.payment.metadata = state.metadata;
      }
    },
    closePaymentMethod: (state): void => {
      state.wasPaid = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(payArticle.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(
        payArticle.fulfilled,
        (state: PaymentState, action: PayloadAction<PaymentResponse>) => {
          state.loading = false
          state.wasPaid = true
          console.log(action.payload)
        }
      )
      .addCase(payArticle.rejected, (state) => {
        state.loading = false
        state.error = "An error has ocurred fetching pays"
      })
    builder
      .addCase(getTransactions.pending, (state) => {
        state.loading = true,
        state.error = null
      })
      .addCase(getTransactions.fulfilled, (state, action: PayloadAction<TransactionResponse[]>) => {
        state.loading = false
        state.transactions = action.payload
      })
      .addCase(getTransactions.rejected, (state) => {
        state.loading = false
        state.error = "An error has ocurred fetching transactions"
      })
  },
});

export const { addMetadata, addPaymentData, closePaymentMethod } = paymentSlice.actions
export default paymentSlice.reducer