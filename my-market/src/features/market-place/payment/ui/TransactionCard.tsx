import { CreditCard, Mail, ShoppingBag, User } from "lucide-react"
import type { TransactionResponse } from "../model/types"

function TransactionCard({ metadata, amount, currency }: TransactionResponse) {
  if (!metadata) {
    return (
      <div className="p-6 text-gray-500 text-center border border-gray-200 rounded-2xl bg-gray-50 animate-pulse">
        Cargando datos de la transacción...
      </div>
    )
  }

  return (
    <div className="relative bg-white border border-gray-200 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="bg-black p-6 flex justify-between items-center">
        <div className="text-white">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <User className="w-5 h-5" /> {metadata.clientName}
          </h2>
          <p className="text-sm text-indigo-100 flex items-center gap-1">
            <Mail className="w-4 h-4" /> {metadata.clientEmail}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">
            {currency.toUpperCase()} {amount}
          </p>
          <p className="text-xs text-indigo-100">Monto total</p>
        </div>
      </div>
      <div className="p-6 bg-gray-50 space-y-4">
        <h3 className="text-gray-700 font-semibold text-lg flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-indigo-600" /> Artículos comprados
        </h3>

        {metadata.articles.map((article) => (
          <div
            key={article.id}
            className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-20 h-20 object-cover rounded-xl border border-gray-100"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-gray-800 font-semibold truncate">{article.title}</h4>
              <p className="text-sm text-gray-500 line-clamp-2">{article.description}</p>
            </div>
            <p className="text-base font-bold text-indigo-600">${article.price}</p>
          </div>
        ))}
      </div>
      <div className="bg-white border-t border-gray-200 p-5 flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-gray-500" />
          <span>ID Usuario: <strong>{metadata.user_id}</strong></span>
        </div>
        <span className="text-gray-500 font-medium uppercase">{currency}</span>
      </div>

      <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></div>
    </div>
  )
}

export default TransactionCard
