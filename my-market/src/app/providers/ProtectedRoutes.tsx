import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import type { RootState } from "./store";

interface ProtectedRoute {
  allowedRoles: string[];
  children: any
}
function ProtectedRoutes({ children, allowedRoles }: ProtectedRoute) {

  const { userData } = useSelector((state: RootState) => state.login)

  // const token = localStorage.getItem("token") || ""
  console.log(userData?.role)

  try {
    if (userData) {
      if (allowedRoles.includes(userData?.role)) {
        return children
      } else {
        return <Navigate to="/unauthorized" replace />
      }
    }
  } catch (error) {
    console.log(error)
    return <Navigate to="/" replace />
  }

}

export default ProtectedRoutes