import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../../pages/Login/ui/LoginPage";
import RegisterPage from "../../pages/Register/ui/RegisterPage";
import { PageLayout } from "../../widgets/PageLayout/PageLayout";
import RoleRedirect from "./components/RoleRedirect";
import ProtectedRoutes from "./ProtectedRoutes";
import MarketPage from "../../pages/Market/MarketPage";


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
        path: "/admin",
        element: <ProtectedRoutes allowedRoles={["Administrador"]}>
          <div>ADMINISTRADOR</div>
        </ProtectedRoutes>,
      },
      {
        path: "/vendedor",
        element: <ProtectedRoutes allowedRoles={["Vendedor"]}>
          <div>Vendedor</div>
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
          <div>Comprador</div>
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