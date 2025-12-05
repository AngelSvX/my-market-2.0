import { XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/providers/store";
import { fetchCategories, addCategory } from '../model/thunks'
import { resetWasAdded } from "../model/slice";

export function CategoryManagement() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("")

  const dispatch = useDispatch<AppDispatch>();

  const { categories, wasAdded } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(resetWasAdded())
  }, [wasAdded])

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm w-3/9">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm font-semibold text-gray-800">Gestión de Categorías</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-700 transition text-white shadow"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="max-h-64 overflow-y-auto grid grid-cols-1 gap-2 p-2 rounded-xl border border-gray-200">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border border-gray-200 rounded-lg py-1 hover:shadow-md transition bg-gray-50 flex items-center justify-center text-gray-700 font-medium text-center cursor-pointer select-none"
          >
            {cat.name}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-lg w-80 p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Nueva Categoría
            </h2>

            <input
              type="text"
              value={category}
              placeholder="Nombre de la categoría"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              min={5}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCategory(e.target.value)
              }}
            />

            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow"
                onClick={() => { dispatch(addCategory(category)), setIsModalOpen(false) }}
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}