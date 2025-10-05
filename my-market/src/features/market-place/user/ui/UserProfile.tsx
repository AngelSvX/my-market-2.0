import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/providers/store";
import { fetchProfileData } from "../model/thunks";
import { useEffect } from "react";
import { LoaderMessage } from "../../../../shared/ui/Loader/LoaderMessage";
import { ExternalLink, FileText, Mail, Shield, User } from "lucide-react";

function UserProfile() {
  const dispatch = useDispatch<AppDispatch>();

  const { error, loading, profileResponse } = useSelector(
    (state: RootState) => state.user
  );

  const { userData } = useSelector((state: RootState) => state.login);

  useEffect(() => {
    if (userData?.id !== undefined) {
      dispatch(fetchProfileData(userData.id));
    }
  }, [dispatch, userData?.id]);

  if (loading) return <LoaderMessage message="Cargando datos de usuario..." />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!profileResponse) return <p>No hay datos del perfil aún.</p>;

  const { profileResponse: profile, role } = profileResponse;

  const isSeller =
    "postResponse" in profileResponse && Array.isArray(profileResponse.postResponse);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">

      <div className="max-w-5xl mx-auto">
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
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FileText className="text-blue-600" /> Mis Publicaciones
            </h3>

            {profileResponse.postResponse.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profileResponse.postResponse.map((post, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all p-5 flex flex-col justify-between"
                  >
                    <img
                      src={post.url}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />

                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-gray-800 line-clamp-1">
                        {post.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {post.description}
                      </p>

                      <div className="pt-2 space-y-1 text-sm text-gray-700">
                        <p>
                          💲 <span className="font-semibold">{post.price}</span>
                        </p>
                        <p>
                          🏷️{" "}
                          <span
                            className={`font-semibold ${post.status === "aprobado"
                                ? "text-green-600"
                                : post.status === "declinado"
                                  ? "text-red-600"
                                  : "text-yellow-600"
                              }`}
                          >
                            {post.status}
                          </span>
                        </p>
                        <p>📦 {post.category}</p>
                        <p>
                          📅{" "}
                          {new Date(post.created_at).toLocaleDateString("es-ES")}
                        </p>
                      </div>
                    </div>

                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition"
                    >
                      Ver publicación <ExternalLink size={16} />
                    </a>
                  </div>
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
              Actualmente estás registrado como{" "}
              <span className="text-blue-600 font-semibold">
                {role.roleName}
              </span>
              .
            </p>
            <p className="mt-2 text-gray-500">
              No tienes publicaciones activas, pero puedes explorar las funciones
              de tu rol desde el menú lateral.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
