import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from "../../../../app/providers/store";
import { fetchLogin } from "../model/thunks";
import { useState } from "react";
import type { LoginRequest } from '../model/types';
import { useNavigate } from "react-router-dom";
import { LoaderMessage } from "../../../../shared/ui/Loader/LoaderMessage";
import { Eye, EyeClosed } from "lucide-react";
import { GoogleLogin, GoogleOAuthProvider, type CredentialResponse } from "@react-oauth/google"

function LoginForm() {

  const navigate = useNavigate()

  const { error, loading } = useSelector((state: RootState) => state.login);

  const dispatch = useDispatch<AppDispatch>()

  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: ""
  })

  const [vissiblePassword, setVissiblePassword] = useState<boolean>(false)

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(fetchLogin(form)).unwrap();

      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    console.log("Credenciales: ", credentialResponse)
  }

  const handleError = () => {
    console.log("Login Failed")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading) return <LoaderMessage message="Obteniendo Datos..." />

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
        <div className="relative">
          <input
            id="password"
            type={vissiblePassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {
            vissiblePassword ? (
              <Eye color="#000000" className="absolute right-3 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2 cursor-pointer" onClick={() => setVissiblePassword(vissiblePassword ? false : true)} />
            )
              :
              (
                <EyeClosed color="#000000" className="absolute right-3 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2 cursor-pointer" onClick={() => setVissiblePassword(vissiblePassword ? false : true)} />
              )
          }
        </div>
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

      <GoogleOAuthProvider clientId={import.meta.env.VITE_GCLOUD_CLIENT_ID}>
        <GoogleLogin useOneTap={false} onError={handleError} onSuccess={handleSuccess} />
      </GoogleOAuthProvider>

      <p className="text-sm text-center text-gray-600">
        ¿No tienes cuenta?
        <Link to="/register" className="text-indigo-600 hover:underline">
          Regístrate
        </Link>
      </p>
    </form>
  );
}

export default LoginForm