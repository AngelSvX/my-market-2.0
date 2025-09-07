import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: "Hola mundo - INICIO",
  }
])
export const AppRouter = () => <RouterProvider router={router} />;