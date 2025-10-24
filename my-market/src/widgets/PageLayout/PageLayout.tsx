import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import type { RootState } from "../../app/providers/store";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../../features/auth/login/model/types";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { restartValue } from "../../features/market-place/user/model/slice";
import { ShoppingCart } from "lucide-react";

export const PageLayout = () => {
  const { userData } = useSelector((state: RootState) => state.login);

  const token = localStorage.getItem("token");
  let decoded: DecodedToken | null = null;

  if (token && token.split(".").length === 3) {
    try {
      decoded = jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error("Token inválido:", error);
    }
  }

  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <nav className="flex space-x-6 text-gray-700 font-medium">
            <Link to="/market" className="hover:text-indigo-600 transition-colors">
              Market
            </Link>
          </nav>

          <div className="flex space-x-8">
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="flex items-center space-x-3 focus:outline-none cursor-pointer">
                <img
                  src={`https://ui-avatars.com/api/?name=${userData?.name || decoded?.name}&background=6366f1&color=fff`}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-gray-600 font-medium">
                    {userData?.name || decoded?.name}
                  </span>
                  <span className="text-xs font-medium text-gray-400">
                    {userData?.role || decoded?.role}
                  </span>
                </div>
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/10 focus:outline-none data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-leave:duration-75 z-10"
              >
                <div className="py-1">
                  <MenuItem>
                    <Link
                      to={`/${userData?.role.toLowerCase()}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Perfil
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Configuración
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button
                      type="button"
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("role");
                        restartValue()

                        setTimeout(() => {
                          navigate("/login", { replace: true });
                        }, 0);
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
            <Link to="/comprador/carrito" className="flex items-center justify-center bg-[#6366f1] w-10 rounded-full cursor-pointer hover:bg-[#2f31aa] duration-200">
              {
                userData?.role === "Comprador" && (
                  <ShoppingCart color="white"/>
                )
              }
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
};