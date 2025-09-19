import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../app/providers/store"
import { LoaderMessage } from "../../../shared/ui/Loader/LoaderMessage"
import { useEffect } from "react"
import { fetchPosts } from "../model/thunks"
import { WorkStatus } from "../model/types"
import type { Post } from '../model/types';

function getStatusColor(status: WorkStatus) {
  switch (status) {
    case WorkStatus.APPROVED:
      return "bg-green-100 text-green-700"
    case WorkStatus.DISAPPROVED:
      return "bg-red-100 text-red-700"
    case WorkStatus.PENDING:
    default:
      return "bg-yellow-100 text-yellow-700"
  }
}

function Posts() {
  const { postList, loading, error } = useSelector(
    (state: RootState) => state.posts
  )

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  if (loading) return <LoaderMessage message="Cargando publicaciones..." />

  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {postList.map((post: Post) => (
        <div
          key={post.id}
          className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        >
          {/* Imagen */}
          <img
            src={post.url}
            alt={post.title}
            className="h-48 w-full object-cover"
          />

          {/* Contenido */}
          <div className="p-4 flex flex-col gap-3">
            {/* Título y categoría */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">{post.title}</h2>
              <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            {/* Descripción */}
            <p className="text-gray-600 text-sm line-clamp-3">
              {post.description}
            </p>

            {/* Precio */}
            <p className="text-lg font-semibold text-indigo-600">
              ${post.price}
            </p>

            {/* Estado */}
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium w-fit ${getStatusColor(
                post.status
              )}`}
            >
              {post.status}
            </span>

            {/* Autor y fecha */}
            <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-3">
              <div>
                <p>{post.name}</p>
                <p className="text-xs">{post.email}</p>
              </div>
              <p>{new Date(post.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Posts