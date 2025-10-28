import { CardElement } from "@stripe/react-stripe-js";
import type { AppDispatch, RootState } from "../../../../app/providers/store";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import type { MetadataPayment, PaymentElement } from "../model/types";
import { payArticle } from "../model/thunks";
import { LoaderMessage } from "../../../../shared/ui/Loader/LoaderMessage";
import { clearArticles } from "../../cart/model/slice";

const cardStyle = {
  style: {
    base: {
      color: "#1e293b",
      fontFamily: "'Inter', sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#94a3b8",
      },
      iconColor: "#2563eb",
    },
    invalid: {
      color: "#ef4444",
      iconColor: "#ef4444",
    },
  },
  hidePostalCode: true,
};

export const CheckoutForm = ({ user_id, subtotal }: { user_id: number | undefined, subtotal: number }) => {

  const { articleList } = useSelector((state: RootState) => state.cart)
  const { loading, wasPaid } = useSelector((state: RootState) => state.payment)

  const [metadata, setMetadata] = useState<MetadataPayment>({
    articles: articleList,
    user_id: Number(user_id),
    clientName: "",
    clientEmail: "",
  })

  const [payment, setPayment] = useState<PaymentElement>({
    amount: subtotal * 100,
    currency: "usd",
    metadata: metadata,
  })

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setPayment({
      amount: subtotal * 100,
      currency: "usd",
      metadata: metadata
    })
  }, [metadata])

  console.log(wasPaid)

  return (
    <div>
      {
        wasPaid ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 text-center p-6">
            <div className="bg-white shadow-md rounded-3xl p-10 max-w-md w-full border border-gray-100">
              <div className="flex flex-col items-center space-y-4">

                <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800">
                  ¡Pago realizado con éxito!
                </h2>

                <p className="text-gray-500 text-sm">
                  Tus productos han sido pagados satisfactoriamente.
                  Muchas gracias por confiar en My-Market
                </p>

                <div className="border-t w-full my-4"></div>

                <p className="text-gray-400 text-sm">
                  Transacción finalizada de manera segura por Stripe.
                </p>

              </div>
            </div>
          </div>
        )
          :
          (
            <div className="w-full">
              <h2 className="text-xl font-semibold text-slate-800 mb-2 text-center">
                Finalizar pago
              </h2>
              <p className="text-gray-500 mb-6 text-sm text-center">
                Ingresa los datos de tu tarjeta para completar tu compra.
              </p>

              <form className="space-y-6">
                <div className="space-y-3">
                  <input
                    type="text"
                    value={metadata.clientName}
                    placeholder="Nombre completo"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setMetadata(prev => ({
                        ...prev,
                        clientName: e.target.value
                      }))
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setMetadata(prev => ({
                        ...prev,
                        clientEmail: e.target.value
                      }))
                    }}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Información de la tarjeta
                  </label>
                  <div className="border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-slate-900 transition">
                    <CardElement options={cardStyle} />
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-between items-center text-gray-700">
                  <span className="font-medium">Total a pagar</span>
                  <span className="text-xl font-semibold text-slate-900">S/ {subtotal.toFixed(2)}</span>
                </div>

                {
                  loading ? (
                    <button
                      type="button"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl transition font-medium"
                    >
                      <LoaderMessage message="Procesando pago..." />
                    </button>

                  )
                    :
                    (
                      <button
                        type="button"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl transition font-medium"
                        onClick={() => {
                          dispatch(payArticle(payment))
                          dispatch(clearArticles())
                        }}
                      >
                        Confirmar pago
                      </button>
                    )
                }

                <p className="text-xs text-gray-400 text-center mt-4">
                  Transacción segura procesada por Stripe 🔒
                </p>
              </form>
            </div>
          )
      }
    </div>
  );
};