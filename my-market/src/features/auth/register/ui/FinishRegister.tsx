import { useNavigate } from "react-router";
import { clearData } from "../model/slice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../app/providers/store";

function FinishRegister() {

  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-lg p-10 border border-gray-100 text-center space-y-8">

        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">¡Registro completado!</h2>
          <p className="text-gray-500">
            Tu cuenta ha sido creada exitosamente.  
            Ya puedes iniciar sesión y disfrutar de la plataforma.
          </p>
        </div>

        <div className="w-full border-t border-gray-200 my-6"></div>

        <button
          type="button"
          className="w-full py-3 rounded-xl font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all"
          onClick={() => {
            dispatch(clearData())
            navigate("/login")
          }}
        >
          Volver al registro
        </button>

        <p className="text-xs text-gray-400 mt-4">
          ¿Algo salió mal? Siempre puedes rehacer tu registro.
        </p>
      </div>
    </div>
  );
}

export default FinishRegister;
