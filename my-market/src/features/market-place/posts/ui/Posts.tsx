import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../../app/providers/store"
import { LoaderMessage } from "../../../../shared/ui/Loader/LoaderMessage"
import { useEffect } from "react"
import { fetchPosts } from "../model/thunks"
import { WorkStatus } from "../model/types"
import type { Post } from "../model/types"
import { MessageCircle } from "lucide-react"
import { commentOpenById, closeComments } from "../../comments/model/slice"
import type { Review } from "../../comments/model/types"
import { fetchCommentsByPost } from '../../comments/model/thunks';


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
  const posts = useSelector(
    (state: RootState) => state.posts
  )

  const comments = useSelector((state: RootState) => state.comments)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  console.log(comments)

  if (posts.loading) return <LoaderMessage message="Cargando publicaciones..." />
  if (posts.error) return <div className="text-red-500">{posts.error}</div>

  return (

    <section className="px-6 py-10 bg-gray-50 min-h-screen">

      {comments.commentOpenId && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-lg z-50 p-6 flex flex-col">

            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
              onClick={() => dispatch(closeComments())}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
              Reseñas
            </h2>

            <div className="flex-1 overflow-y-auto max-h-[65vh] space-y-4 pr-2">
              {comments.loading ? (

                <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                  <svg
                    className="animate-spin h-8 w-8 text-indigo-600 mb-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    />
                  </svg>
                  <p className="text-sm font-medium">Cargando comentarios...</p>
                </div>
              ) : comments.comments.length === 0 ? (

                <p className="text-center text-gray-500 py-6">
                  No hay comentarios para mostrar
                </p>
              ) : (

                comments.comments.map((review: Review) => (
                  <div
                    key={review.id}
                    className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm"
                  >

                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">{review.name}</p>
                        <p className="text-xs text-gray-500">{review.email}</p>
                      </div>
                      <time className="text-xs text-gray-400">
                        {new Date(review.created_at).toLocaleDateString()}
                      </time>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${i < review.rating ? "text-yellow-500" : "text-gray-300"
                            }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}


      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Últimas publicaciones
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.postList.map((post: Post) => (
          <article
            key={post.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
          >

            <div className="relative">
              <img
                src={post.url}
                alt={post.title}
                className="h-52 w-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-white/90 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {post.category}
              </span>
            </div>

            <div className="flex flex-col flex-1 p-5 gap-4">
              <h2 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors line-clamp-2">
                {post.title}
              </h2>

              <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                {post.description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <p className="text-lg font-bold text-indigo-600">
                  ${post.price}
                </p>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
                    post.status
                  )}`}
                >
                  {post.status}
                </span>
              </div>

              <button
                type="button"
                className="mt-3 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(commentOpenById(post.id))
                  dispatch(fetchCommentsByPost(post.id))
                }} >
                <MessageCircle className="w-4 h-4" />
                Comentar
              </button>
            </div>

            <footer className="px-5 py-3 bg-gray-50 border-t flex items-center justify-between text-sm text-gray-600">
              <div>
                <p className="font-medium text-gray-800">{post.name}</p>
                <p className="text-xs">{post.email}</p>
              </div>
              <time className="text-xs">
                {new Date(post.created_at).toLocaleDateString()}
              </time>
            </footer>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Posts
