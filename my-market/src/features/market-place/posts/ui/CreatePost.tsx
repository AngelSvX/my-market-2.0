import { useEffect, useState } from "react";
import type { CreatePostRequest } from "../model/types";
import { WorkStatus } from "../model/types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/providers/store";

interface CreatePostProps {
  onClose: () => void;
}

export const CreatePost = ({ onClose }: CreatePostProps) => {
  const [formData, setFormData] = useState<CreatePostRequest>({
    user_id: 0,
    category_id: 0,
    title: "",
    description: "",
    price: 0,
    url: "",
    status: WorkStatus.PENDING
  });

  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.login);

  useEffect(() => {
    formData.user_id = userData?.id ?? 0
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Publicación creada:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-[500px] p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Nueva Publicación</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded-md"
            rows={3}
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Precio"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            name="url"
            placeholder="URL de la imagen"
            value={formData.url}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Crear publicación
          </button>
        </form>
      </div>
    </div>
  );
};