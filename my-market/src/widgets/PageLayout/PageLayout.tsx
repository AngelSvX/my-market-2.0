import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import type { RootState } from "../../app/providers/store";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../../features/auth/login/model/types";

export const PageLayout = () => {
  const { userData } = useSelector((state: RootState) => state.login);

  const token = localStorage.getItem("token") || ""
  const decoded : DecodedToken = jwtDecode(token)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Links de navegación extra */}
          <nav className="flex space-x-6 text-gray-700 font-medium">
            <Link to='/publicaciones' className="hover:text-indigo-600 transition-colors">
              Inicio
            </Link>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Sobre Nosotros
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Contacto
            </a>
          </nav>

          {/* Usuario */}
          <div className="flex items-center space-x-4 flex-row">
            <div className="flex flex-col">
              <span className="text-gray-600">
                Hola, <span className="font-semibold">{userData?.name || decoded.name}</span>
              </span>
              <span className="text-xs font-medium text-gray-400">
                {userData?.role || decoded.role}
              </span>
            </div>
            <img
              src={`https://ui-avatars.com/api/?name=${userData?.name || decoded.name}&background=6366f1&color=fff`}
              alt="avatar"
              className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
            />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
};