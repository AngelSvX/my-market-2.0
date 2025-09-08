import { Link } from 'react-router-dom'

function RegisterForm() {
  return (
    <form className="w-full max-w-sm bg-white px-5 space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
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

      <p className="text-sm text-center text-gray-600">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/" className="text-indigo-600 hover:underline">
          Inicia Sesión
        </Link>
      </p>
    </form>
  )
}

export default RegisterForm