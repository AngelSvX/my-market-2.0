import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { RegisterRequest } from "../model/types";
import { getMainData } from "../model/slice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/providers/store";
import { useEffect } from "react";

function RegisterForm() {

  const { registerData, isDataFullfiled } = useSelector((state: RootState) => state.register)

  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>();

  const onSubmit = (data: RegisterRequest) => {
    dispatch(getMainData(data))
  };

  useEffect(() => {
    console.log(registerData)
  }, [registerData])

  useEffect(() => {
    console.log(isDataFullfiled)
  }, [registerData])

  return (
    isDataFullfiled ?
      (
        <Navigate to="/register/selectRole" replace />
      )
      :
      (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm bg-white px-5 space-y-6"
        >
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombres
            </label >

            <input
              id="name"
              type="text"
              placeholder="Escribe tus nombres aquí"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              {...register("name", {
                required: "El nombre es obligatorio",
                minLength: {
                  value: 2,
                  message: "El nombre debe tener al menos 2 caracteres",
                },
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
                  message: "El nombre solo puede contener letras y espacios",
                },
              })}
            />

            {
              errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )
            }
          </div >
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
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
                  message:
                    "El email debe terminar en .com, .net, .org o .es",
                },
              })}
            />

            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "Debe tener al menos 6 caracteres",
                },
                pattern: {
                  value: /^[^?\¿:\s]+$/,
                  message:
                    "La contraseña no puede contener ?, ¿, : ni espacios",
                },
                validate: {
                  notOnlyNumbers: (value) =>
                    !/^\d+$/.test(value) ||
                    "La contraseña no puede ser solo números",
                },
              })}
            />

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
          >
            Registrarse
          </button>

          <p className="text-sm text-center text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/" className="text-indigo-600 hover:underline">
              Inicia Sesión
            </Link>
          </p>
        </form >
      )
  );
}

export default RegisterForm;
