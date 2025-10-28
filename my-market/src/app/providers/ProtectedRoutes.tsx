import { useSelector } from "react-redux";
import type { RootState } from "./store";
import { Navigate } from "react-router";

interface ProtectedRoute {
  allowedRoles: string[];
  children: any
}
function ProtectedRoutes({ children, allowedRoles }: ProtectedRoute) {

  // const token = localStorage.getItem("token") || ""
  const role = localStorage.getItem("role") || ""

  try {
    if (allowedRoles.includes(role)) {
      return children
    } else {
      return <Navigate to="/unauthorized" replace />
    }
  } catch (error) {
    console.log(error)
    return <Navigate to="/" replace />
  }

}

export default ProtectedRoutes