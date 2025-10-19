import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../../app/providers/store"
import { LoaderMessage } from "../../../../shared/ui/Loader/LoaderMessage"
import { useEffect } from "react"
import { fetchPosts } from "../model/thunks"
import { WorkStatus } from "../model/types"
import type { Post } from "../model/types"
import { MessageCircle } from "lucide-react"
import { commentOpenById } from "../../comments/model/slice"
import { fetchCommentsByPost } from '../../comments/model/thunks';
import Comments from "../../comments/ui/Comments"
import { Navigate } from "react-router"


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
  const { userData } = useSelector((state: RootState) => state.login)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  if(!userData){
    return <Navigate to="/login" replace />
  }


  if (posts.loading) return <LoaderMessage message="Cargando publicaciones..." />
  if (posts.error) return <div className="text-red-500">{posts.error}</div>


  return (

    <section className="px-6 py-10 bg-gray-50 min-h-screen">

      {comments.commentOpenId && (
        <Comments userId={userData.id} workId={comments.commentOpenId}/>
      )}


      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Últimas publicaciones
      </h1>

      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </form>
    </section>
  )
}

export default Posts
