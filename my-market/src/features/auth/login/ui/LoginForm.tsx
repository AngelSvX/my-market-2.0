import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from "../../../../app/providers/store";
import { fetchLogin } from "../model/thunks";
import { useEffect, useState } from "react";
import type { LoginRequest } from '../model/types';
import { useNavigate } from "react-router-dom";
import { LoaderMessage } from "../../../../shared/ui/Loader/LoaderMessage";

function LoginForm() {

  const navigate = useNavigate()

  const { data, error, loading, userData } = useSelector((state: RootState) => state.login);

  const dispatch = useDispatch<AppDispatch>()

  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: ""
  })

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(fetchLogin(form)).unwrap();
      // si llega aquí, el login fue exitoso
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (data?.response?.token && userData?.role) {
      localStorage.setItem("token", data.response.token);
      localStorage.setItem("role", userData?.role)
    }
  }, [data?.response?.token]);

  if (loading) return <LoaderMessage message="Obteniendo Datos..." />

  console.log(data, "DATA")
  console.log(userData, "USER DATA")
  console.log(form.email)
  console.log(form.password)

  return (
    <form onSubmit={handleForm} className="w-full max-w-sm bg-white px-5 space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="tuemail@ejemplo.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
      >
        Ingresar
      </button>

      {
        error && <p className="text-sm text-center text-red-500 relative bottom-4">{error}</p>
      }

      <p className="text-sm text-center text-gray-600">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Regístrate
        </Link>
      </p>
    </form>
  );
}

export default LoginForm