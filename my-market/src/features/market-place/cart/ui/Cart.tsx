import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/providers/store";
import { deleteArticle } from "../model/slice";
import { Elements } from "@stripe/react-stripe-js";

import { stripePromise } from '../../../../app/providers/stripe';
import { useState } from "react";
import { CheckoutForm } from "../../payment/ui/CheckoutForm";
import { closePaymentMethod } from "../../payment/model/slice";

function Cart() {
  const { articleList } = useSelector((state: RootState) => state.cart);
  const subtotal = articleList.reduce((acc, item) => acc + item.price, 0);
  const dispatch = useDispatch<AppDispatch>();

  const [showCheckout, setShowCheckout] = useState(false);

  const { userData } = useSelector((state: RootState) => state.login)

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tu carrito</h2>

          {articleList.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No tienes artículos en tu carrito 🛒
            </p>
          ) : (
            <div className="space-y-5">
              {articleList.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 border-b border-gray-100 pb-5"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-28 h-28 rounded-xl object-cover shadow-sm"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="mt-3 font-semibold text-gray-800">
                      S/ {item.price.toFixed(2)}
                    </p>
                  </div>

                  <button
                    className="text-red-500 hover:text-red-600 transition"
                    title="Eliminar artículo"
                    onClick={() => dispatch(deleteArticle(item.id))}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit sticky top-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Resumen de compra</h3>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>S/ {subtotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between text-lg font-semibold text-gray-800">
            <span>Total</span>
            <span>S/ {subtotal.toFixed(2)}</span>
          </div>

          <button
            className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl transition font-medium disabled:bg-gray-400 disabled:cursor-no-drop"
            disabled={articleList.length === 0}
            onClick={() => setShowCheckout(true)}
          >
            Proceder al pago
          </button>
        </div>
      </div>

      {showCheckout && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setShowCheckout(false),
                dispatch(closePaymentMethod())
              } }
            >
              ✕
            </button>
            <Elements stripe={stripePromise}>
              <CheckoutForm user_id={userData?.id} subtotal={subtotal} />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
