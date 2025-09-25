import { useEffect, useState } from "react"
import { Navigate } from "react-router"
import type { RootState } from "../store";
import { useSelector } from "react-redux";

function RoleRedirect() {

  const { data, userData} = useSelector((state: RootState) => state.login);

  useEffect(() => {
    if (data?.response?.token && userData?.role) {
      localStorage.setItem("token", data.response.token);
      localStorage.setItem("role", userData.role);
    }
  }, [data?.response?.token, userData?.role]);

  if (!userData?.role) {
    return <Navigate to="/login" replace />
  }

  console.log(data?.response.token)
  console.log(userData.role)

  switch (userData.role) {
    case "Administrador":
      return <Navigate to="/admin" replace />;
    case "Vendedor":
      return <Navigate to="/vendedor" replace />;
    case "Comprador":
      return <Navigate to="/comprador" replace />;
    default:
      return <Navigate to="/login" replace />;
  }

}

export default RoleRedirect