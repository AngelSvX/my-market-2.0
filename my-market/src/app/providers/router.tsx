import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../../pages/Login/ui/LoginPage";
import RegisterPage from "../../pages/Register/ui/RegisterPage";
import { PageLayout } from "../../widgets/PageLayout/PageLayout";
import RoleRedirect from "./components/RoleRedirect";
import ProtectedRoutes from "./ProtectedRoutes";
import MarketPage from "../../pages/Market/MarketPage";
import VendedorPage from "../../pages/User/Vendedor/VendedorPage";
import AdminPage from "../../pages/User/Admin/AdminPage";


const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage/>,
  },
  {
    path: '/register',
    element: <RegisterPage/>
  },
  {
    path: '/market',
    element: <PageLayout/>,
    children:[
      {
        path: "/market",
        element: <MarketPage/>
      }
    ]
  },
  {
    path: '/',
    element: <PageLayout/>,
    children: [
      {
        index: true,
        element: <RoleRedirect/> 
      },
      {
        path: "/administrador",
        element: <ProtectedRoutes allowedRoles={["Administrador"]}>
          <AdminPage/>
        </ProtectedRoutes>,
      },
      {
        path: "/vendedor",
        element: <ProtectedRoutes allowedRoles={["Vendedor"]}>
          <VendedorPage/>
        </ProtectedRoutes>,
        children:[
          {
            path: "/vendedor/prueba",
            element: "Aquí solo debería de ingresar el vendedor"
          }
        ]
      },
      {
        path: "/comprador",
        element: <ProtectedRoutes allowedRoles={["Comprador"]}>
          <VendedorPage/>
        </ProtectedRoutes>,
        children: [
          {
            path: "/comprador/prueba",
            element: "Aquí solo debería de ingresar el comprador"
          }
        ]
      }
    ]
  },
  {
    path: "/unauthorized",
    element: <div>No tienes autorización</div>
  },
  {
    path: '*',
    element: "inexistente"
  }
])
export const AppRouter = () => <RouterProvider router={router} />;