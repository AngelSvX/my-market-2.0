import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

type RegisterData = {
  email: string;
  password: string;
};

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();

  const onSubmit = (data: RegisterData) => {
    console.log("Registro enviado:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm bg-white px-5 space-y-6"
    >
      {/* Campo Email */}
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

      {/* Campo Password */}
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

      {/* Botón */}
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
    </form>
  );
}

export default RegisterForm;
