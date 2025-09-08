import { useState } from "react"
import { Navigate } from "react-router"

function RoleRedirect() {

  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  if (!token) {
    return <Navigate to="/login" replace />
  }

  console.log(token)
  console.log(role)

  switch (role) {
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