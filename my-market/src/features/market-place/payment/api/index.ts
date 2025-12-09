import axios, { type AxiosResponse } from "axios";
import type { PaymentElement, TransactionResponse } from "../model/types";

const API_URL = import.meta.env.VITE_API_URL

const API_URL_PAYMENTS = `${API_URL}/api/v1/payments`;

export const paymentApi = {
  payItems: async (payload: PaymentElement): Promise<PaymentResponse> => {
    const res: AxiosResponse<PaymentResponse> = await axios.post(
      `${API_URL_PAYMENTS}/create-payment-intent`,
      payload
    );
    return res.data;
  },
  getTransactionById: async (id: number) => axios.get<TransactionResponse[]>(`${API_URL_PAYMENTS}/getTransactionByUser/${id}`)
};
