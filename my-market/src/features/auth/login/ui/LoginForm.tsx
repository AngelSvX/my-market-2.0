import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import type { AppDispatch, RootState } from "../../../../app/providers/store";
import { fetchLogin, googleLogin } from "../model/thunks";
import { LoaderMessage } from "../../../../shared/ui/Loader/LoaderMessage";
import { Eye, EyeClosed } from "lucide-react";
import { GoogleLogin, GoogleOAuthProvider, type CredentialResponse } from "@react-oauth/google";
import { useEffect, useState } from "react";
import type { LoginRequest } from "../model/types";
import { getGoogleToken } from "../model/slice";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading, google_token, userData, google_auth_fullfiled } = useSelector((state: RootState) => state.login);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    try {
      await dispatch(fetchLogin(data)).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      dispatch(getGoogleToken(credentialResponse.credential))
    }
  };

  useEffect(() => {
    if (google_token) {
      dispatch(googleLogin(google_token));
      localStorage.setItem("token", google_token);
    }
  }, [google_token]);

  useEffect(() => {
    if (userData?.role) {
      localStorage.setItem("role", userData.role);
    }
  }, [userData]);

  const handleError = () => {
    console.log("Login Failed");
  };

  
  useEffect(() => {
    if (google_auth_fullfiled) {
      if(userData?.role === undefined){
        if(google_token){
          dispatch(googleLogin(google_token))
          console.log(userData?.role)
        }
      }else{
        // Aquí está el miserable bug :)
        if(userData.role === "Administrador" || userData.role === "Comprador" || userData.role === "Vendedor"){
          navigate("/market")
        }else{
          navigate("/login/selectRole")
        }
      }
    }
  }, [google_auth_fullfiled, userData]);
  
  if (loading) return <LoaderMessage message="Obteniendo Datos..." />;
  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm bg-white px-5 space-y-6"
    >

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="tuemail@ejemplo.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          {...register("email", {
            required: "El email es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.(com|net|org|es)$/,
              message: "El email debe terminar en .com, .net, .org o .es",
            },
          })}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <div className="relative">
          <input
            id="password"
            type={visiblePassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "Debe tener al menos 6 caracteres",
              },
              pattern: {
                value: /^[^?\¿:\s]+$/,
                message: "La contraseña no puede contener ?, ¿, : ni espacios",
              },
              validate: {
                notOnlyNumbers: (value) =>
                  !/^\d+$/.test(value) || "La contraseña no puede ser solo números",
              },
            })}
          />

          {visiblePassword ? (
            <Eye
              color="#000000"
              className="absolute right-3 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2 cursor-pointer"
              onClick={() => setVisiblePassword(false)}
            />
          ) : (
            <EyeClosed
              color="#000000"
              className="absolute right-3 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2 cursor-pointer"
              onClick={() => setVisiblePassword(true)}
            />
          )}
        </div>

        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
      >
        Ingresar
      </button>

      {error && (
        <p className="text-sm text-center text-red-500 relative bottom-4">{error}</p>
      )}

      <GoogleOAuthProvider clientId={import.meta.env.VITE_GCLOUD_CLIENT_ID}>
        <GoogleLogin useOneTap={false} onError={handleError} onSuccess={handleSuccess} />
      </GoogleOAuthProvider>

      <p className="text-sm text-center text-gray-600">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Regístrate
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;