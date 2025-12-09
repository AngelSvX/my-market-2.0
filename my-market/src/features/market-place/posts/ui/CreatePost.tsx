import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.login);
  const { categories } = useSelector((state: RootState) => state.categories);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreatePostRequest>();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    if (userData?.id) setValue("user_id", userData.id);
  }, [userData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("url", file); // react-hook-form registra el file
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: CreatePostRequest) => {
    if (!(data.url instanceof File)) {
      console.log("Formato de imagen inválido");
      return;
    }

    const fileUrlCloud = await uploadImageToCloudinary(data.url);

    const finalData: CreatePostRequest = {
      ...data,
      price: Number(data.price),
      category_id: Number(data.category_id),
      status: WorkStatus.PENDING,
      url: fileUrlCloud,
    };

    dispatch(addPost(finalData));
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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              {...register("title", { required: "El título es obligatorio" })}
              placeholder="Ej: Servicio de diseño web"
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción (opcional)
            </label>
            <textarea
              {...register("description")}
              placeholder="Describe tu servicio o producto..."
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 max-h-40 min-h-20"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              {...register("category_id", {
                required: "La categoría es obligatoria",
              })}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {errors.category_id && (
              <p className="text-sm text-red-500">{errors.category_id.message}</p>
            )}
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio
            </label>
            <input
              type="number"
              min={1}
              step="0.01"
              {...register("price", {
                required: "El precio es obligatorio",
                validate: (value) =>
                  Number(value) > 0 || "El precio debe ser mayor a 0",
              })}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            />

            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen del producto
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition">
              {imagePreview ? (
                <div className="relative w-full flex justify-center">
                  <img
                    src={imagePreview}
                    className="h-40 w-auto rounded-md object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setValue("url", null as any);
                    }}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center cursor-pointer">
                  <ImageIcon size={32} className="text-gray-400" />
                  <span className="text-gray-500 text-sm">
                    Sube una imagen del producto
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("url", {
                      required: "La imagen es obligatoria",
                    })}
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            {errors.url && (
              <p className="text-sm text-red-500">{errors.url.message}</p>
            )}
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="mt-3 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium transition"
          >
            Crear publicación
          </button>
        </form>
      </div>
    </div>
  );
};
