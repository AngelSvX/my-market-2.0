import { useEffect, useState } from "react";
import type { CreatePostRequest } from "../model/types";
import { WorkStatus } from "../model/types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/providers/store";
import { Image as ImageIcon, X } from "lucide-react";
import { uploadImageToCloudinary } from "../../../upload/api/uploadApi";
import { addPost } from "../model/thunks";
import { fetchCategories } from "../../categories/model/thunks";

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
    url: null,
    status: WorkStatus.PENDING,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { userData } = useSelector((state: RootState) => state.login);
  const { categories } = useSelector((state: RootState) => state.categories)

  useEffect(() => {
    setFormData((prev) => ({ ...prev, user_id: userData?.id ?? 0 }));
  }, [userData]);

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, url: file }));
      setImagePreview(URL.createObjectURL(file));
    }
    console.log(file)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Publicación creada:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-[500px] p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Nueva Publicación
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              name="title"
              placeholder="Ej: Servicio de diseño web"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              name="description"
              placeholder="Describe tu servicio o producto..."
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm max-h-40 min-h-20"
              rows={3}
              required
            />
          </div>
          <div>
            <label
              htmlFor="category_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Categoría
            </label>
            <div className="relative">
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white pl-4 pr-10 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition"
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio
            </label>
            <input
              name="price"
              type="number"
              placeholder="Ej: 150.00"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen del producto
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
              {imagePreview ? (
                <div className="relative w-full flex justify-center">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="h-40 w-auto rounded-md object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 bg-white/80 rounded-full p-1 text-gray-600 hover:text-red-500 transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center gap-2 cursor-pointer">
                  <ImageIcon className="text-gray-400" size={32} />
                  <span className="text-gray-500 text-sm">
                    Sube una imagen del producto
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
          <button
            type="button"
            className="mt-3 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium transition"
            onClick={ async () => {
                if (!formData.url || !(formData.url instanceof File)) {
                    console.log("Formato Inválido - No File Selected");
                    return;
                }
                const fileUrlCloud = await uploadImageToCloudinary(formData.url);

                const ultimatePostRequest : CreatePostRequest = {
                  user_id: Number(formData.user_id),
                  category_id: Number(formData.category_id),
                  title: formData.title,
                  description: formData.description,
                  price: Number(formData.price),
                  status: WorkStatus.PENDING,
                  url: fileUrlCloud
                }

                dispatch(addPost(ultimatePostRequest))
            }}
          >
            Crear publicación
          </button>
        </form>
      </div>
    </div>
  );
};
