import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/providers/store";
import { fetchProfileData } from "../model/thunks";
import { useEffect, useState } from "react";
import { LoaderMessage } from "../../../../shared/ui/Loader/LoaderMessage";
import { FileText, Mail, MessageCircle, PlusCircle, Shield, User } from "lucide-react";
import { WorkStatus } from "../../posts/model/types";
import { commentOpenById } from "../../comments/model/slice";
import { fetchCommentsByPost } from "../../comments/model/thunks";
import Comments from "../../comments/ui/Comments";
import { Navigate } from "react-router";
import { CategoryManagement } from "../../categories/ui/CategoryManagement";
import { CreatePost } from "../../posts/ui/CreatePost";
import ReviewPosts from "../../posts/ui/ReviewPost";
import { getTransactions } from "../../payment/model/thunks";
import TransactionCard from "../../payment/ui/TransactionCard";

function UserProfile() {

  const [openPostModal, setOpenPostModal] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>();

  const { error, loading, profileResponse } = useSelector(
    (state: RootState) => state.user
  );

  const { userData } = useSelector((state: RootState) => state.login);

  if (!userData) {
    return <Navigate to="/login" replace />
  }

  const comments = useSelector((state: RootState) => state.comments)

  useEffect(() => {
    if (userData?.id !== undefined) {
      dispatch(fetchProfileData(userData.id));
    }
  }, [dispatch, userData?.id]);

  const transactions = useSelector((state: RootState) => state.payment)

  useEffect(() => {
    dispatch(getTransactions(userData.id))
  }, [])

  if (loading) return <LoaderMessage message="Cargando datos de usuario..." />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!profileResponse) return <p>No hay datos del perfil aún.</p>;

  const { profileResponse: profile, role } = profileResponse;

  const isSeller =
    "postResponse" in profileResponse && Array.isArray(profileResponse.postResponse);

  const isAdmin = userData.role == "Administrador" ? true : false

  const isClient = userData.role === "Comprador"

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

  console.log(transactions.transactions)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">

      {comments.commentOpenId && (
        <Comments userId={userData.id} workId={comments.commentOpenId} />
      )}


      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-10 transition-all hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <User className="text-blue-600" /> Perfil del Usuario
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-gray-700">
            <div className="flex items-center gap-3">
              <Mail className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Correo</p>
                <p className="font-medium">{profile.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="font-medium">{profile.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Shield className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Rol</p>
                <p
                  className={`font-semibold ${role.roleName === "Vendedor"
                    ? "text-green-600"
                    : "text-blue-600"
                    }`}
                >
                  {role.roleName}
                </p>
              </div>
            </div>
          </div>
        </div>

        {isSeller ? (
          <div>
            <div className="flex flex-row justify-between items-center my-2">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FileText className="text-blue-600" /> Mis Publicaciones
              </h3>
              <button
                onClick={() => setOpenPostModal(true)}
                className="bg-indigo-500 text-white px-4 py-3 rounded-md flex items-center gap-2 cursor-pointer hover:shadow-md shadow-indigo-400 duration-150 ease-linear"
              >
                <PlusCircle /> Nueva Publicación
              </button>
            </div>

            {
              openPostModal && <CreatePost onClose={() => setOpenPostModal(false)} />
            }

            {profileResponse.postResponse.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {profileResponse.postResponse.map((post, idx) => (
                  <article
                    key={idx}
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
                            post.status as WorkStatus
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
                        <p className="font-medium text-gray-800">{profileResponse.profileResponse.name}</p>
                        <p className="text-xs">{profileResponse.profileResponse.email}</p>
                      </div>
                      <time className="text-xs">
                        {new Date(post.created_at).toLocaleDateString()}
                      </time>
                    </footer>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic text-center">
                No tienes publicaciones todavía.
              </p>
            )}
          </div>
        ) : (
          <div className="text-center mt-10 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              ¡Hola, {profile.name}!
            </h3>
            <p className="text-gray-600 text-lg">
              Actualmente estás registrado como
              <span className="text-blue-600 font-semibold">
                : {role.roleName}
              </span>
              .
            </p>
            {
              userData.role == "Administrador" && (<p className="mt-2 text-gray-500">
                Este es el panel de control donde podrás hacer modificaciones en el sistema.
              </p>)
            }
            {
              userData.role == "Comprador" && (<p className="mt-2 text-gray-500">Aquí podrás visualizar tus compras.</p>)
            }
            {
              userData.role == "Vendedor" && (<p className="mt-2 text-gray-500">Aquí podrás visualizar tus publicaciones.</p>)
            }
          </div>
        )}
        {isAdmin && (
          <div className="flex flex-col">
            <div className="mt-10 w-full flex items-start justify-start">
              <CategoryManagement />
            </div>
            <div className="mt-10">
              <ReviewPosts />
            </div>
          </div>
        )}

        {
          isClient && (
            transactions.loading ? (
              <div className="text-center text-gray-500 py-4">Cargando transacciones...</div>
            ) : transactions.transactions && transactions.transactions.length > 0 ? (
              <div className="flex flex-col gap-6 mt-8">
                {transactions.transactions.map((transaction, idx) => (
                  <TransactionCard key={idx} {...transaction} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-4">No tienes transacciones aún.</div>
            )
          )
        }

      </div>
    </div>
  );
}

export default UserProfile;
