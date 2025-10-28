// ! Mensaje para mi yo del mañana
// Estimado Ángel, recordar que estas interfaces son las que se van a usar para realizar
// la inserción de los datos del pago en la base de datos
// Gracias, oño.

import type { Article } from "../../cart/model/types";

export interface MetadataPayment{
  articles: Article[];
  user_id: number;
  clientName: string;
  clientEmail: string;
}

export interface PaymentElement{
  amount: number;
  currency: string;
  metadata: MetadataPayment;
}
export interface PaymentState {
  payment: PaymentElement | null;
  metadata: MetadataPayment | null;
  wasPaid: boolean;
  transactions: TransactionResponse[];
  loading: boolean;
  error: string | null;
}

export interface PaymentResponse {
  client_secret: string;
  client_id: string
}

export interface MetadataResponse {
  user_id: number;
  articles: Article[]
  clientName: string;
  clientEmail: string;
}

export interface TransactionResponse{
  metadata: MetadataResponse;
  amount: string;
  currency: string;
}