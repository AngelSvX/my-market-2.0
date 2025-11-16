import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/Login/ui/LoginPage";
import RegisterPage from "../pages/Register/ui/RegisterPage";
import { StepGuard } from "../shared/lib/guards/StepGuard";
import SelectRole from "../features/auth/register/ui/SelectRole";
import { PageLayout } from "../widgets/PageLayout/PageLayout";
import MarketPage from "../pages/Market/MarketPage";
import RoleRedirect from "./providers/components/RoleRedirect";
import ProtectedRoutes from "./providers/ProtectedRoutes";
import AdminPage from "../pages/User/Admin/AdminPage";
import VendedorPage from "../pages/User/Vendedor/VendedorPage";
import CartPage from "../pages/Cart/ui/CartPage";
import { useSelector } from "react-redux";
import type { RootState } from "./providers/store";
import FinishRegister from "../features/auth/register/ui/FinishRegister";


function App() {

  const { isDataFullfiled, isReadyToSend } = useSelector((state: RootState) => state.register)

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/register/selectRole',
      element: <StepGuard canAccess={isDataFullfiled}>
        <SelectRole />
      </StepGuard>
    },
    {
      path: '/register/finish',
      element: <StepGuard canAccess={isReadyToSend}>
        <FinishRegister/>
      </StepGuard>
    },
    {
      path: '/market',
      element: <PageLayout />,
      children: [
        {
          path: "/market",
          element: <MarketPage />
        }
      ]
    },
    {
      path: '/',
      element: <PageLayout />,
      children: [
        {
          index: true,
          element: <RoleRedirect />
        },
        {
          path: "/administrador",
          element: <ProtectedRoutes allowedRoles={["Administrador"]}>
            <AdminPage />
          </ProtectedRoutes>,
        },
        {
          path: "/vendedor",
          element: <ProtectedRoutes allowedRoles={["Vendedor"]}>
            <VendedorPage />
          </ProtectedRoutes>
        },
        {
          path: "/comprador",
          element: <ProtectedRoutes allowedRoles={["Comprador"]}>
            <VendedorPage />
          </ProtectedRoutes>,
        },
        {
          path: "/comprador/carrito",
          element: <ProtectedRoutes allowedRoles={["Comprador"]}>
            <CartPage />
          </ProtectedRoutes>
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

    return <RouterProvider router={router} />;

}

export default App;