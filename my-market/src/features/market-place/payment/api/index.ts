import axios, { type AxiosResponse } from "axios";
import type { PaymentElement, TransactionResponse } from "../model/types";
const API_URL = "http://localhost:3000/api/v1/payments";

export const paymentApi = {
  payItems: async (payload: PaymentElement): Promise<PaymentResponse> => {
    const res: AxiosResponse<PaymentResponse> = await axios.post(
      `${API_URL}/create-payment-intent`,
      payload
    );
    return res.data;
  },
  getTransactionById: async (id: number) => axios.get<TransactionResponse[]>(`${API_URL}/getTransactionByUser/${id}`)
};
