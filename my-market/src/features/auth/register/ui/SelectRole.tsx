import { useEffect, useState } from "react";
import { getRoleData } from "../model/slice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/providers/store";
import { fetchRegister } from "../model/thunks";
import { Navigate } from "react-router";

function SelectRole() {
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  const { registerData, loading, isReadyToSend } = useSelector((state: RootState) => state.register)

  const handleSelect = (role: number) => {
    setSelectedRole(role);
  };

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    console.log(registerData)
  }, [selectedRole])

  return (
    isReadyToSend ?
      (
        <Navigate to="/register/finish"/>
      )
      :
      (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-md p-10 space-y-8 border border-gray-100">

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">¡Ya casi terminamos!</h2 >
              <p className="text-gray-500">Elige el tipo de cuenta que deseas crear</p>
            </div >

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <button
                onClick={() => {
                  handleSelect(2)
                  dispatch(getRoleData(2))
                }}
                className={`
              group border rounded-2xl p-6 transition-all flex flex-col items-center gap-3
              ${selectedRole === 2
                    ? "border-blue-500 bg-blue-50 shadow-lg scale-[1.02]"
                    : "border-gray-200 bg-white hover:bg-blue-50 hover:shadow-md"}
            `}
              >
                <div className={`
              w-14 h-14 rounded-full flex items-center justify-center transition
              ${selectedRole === 2
                    ? "bg-blue-200"
                    : "bg-blue-100 group-hover:bg-blue-200"}
            `}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-7 h-7 transition ${selectedRole === 2 ? "text-blue-800" : "text-blue-700"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.6}
                    stroke="currentColor"
                  >
                    <path d="M16 11V5a3 3 0 00-6 0v6" />
                    <path d="M5 20h14M12 17v3" />
                  </svg>
                </div>

                <p className="font-semibold text-gray-800">Vendedor</p>
                <p className="text-sm text-gray-500 text-center leading-tight">
                  Publica productos y genera ventas fácilmente.
                </p>
              </button>

              <button
                onClick={() => {
                  handleSelect(3)
                  dispatch(getRoleData(3))
                }}
                className={`
              group border rounded-2xl p-6 transition-all flex flex-col items-center gap-3
              ${selectedRole === 3
                    ? "border-green-500 bg-green-50 shadow-lg scale-[1.02]"
                    : "border-gray-200 bg-white hover:bg-green-50 hover:shadow-md"}
            `}
              >
                <div className={`
              w-14 h-14 rounded-full flex items-center justify-center transition
              ${selectedRole === 3
                    ? "bg-green-200"
                    : "bg-green-100 group-hover:bg-green-200"}
            `}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-7 h-7 transition ${selectedRole === 3 ? "text-green-800" : "text-green-700"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.6}
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                    <circle cx="9" cy="19" r="2" />
                    <circle cx="17" cy="19" r="2" />
                  </svg>
                </div>

                <p className="font-semibold text-gray-800">Comprador</p>
                <p className="text-sm text-gray-500 text-center leading-tight">
                  Encuentra productos de vendedores certificados.
                </p>
              </button>
            </div>

            <div className="pt-4">
              {
                loading ?
                  (
                    <button
                      disabled={true}
                      className="w-full py-3 rounded-xl text-white font-semibold transition-all bg-gray-300 cursor-not-allowed spin-in"
                    >
                      Continuar
                    </button>
                  )
                  :
                  (
                    <button
                      disabled={!selectedRole}
                      className={`
              w-full py-3 rounded-xl text-white font-semibold transition-all
              ${selectedRole
                          ? "bg-indigo-600 hover:bg-indigo-700 shadow-md"
                          : "bg-gray-300 cursor-not-allowed"}
            `}
                      onClick={() => {
                        if (registerData) {
                          dispatch(fetchRegister(registerData))
                        }
                      }}
                    >
                      Continuar
                    </button>
                  )
              }
            </div>

            <p className="text-center text-sm text-gray-400 mt-3">
              Recuerda que no podrás cambiar tu rol más adelante.
            </p>
          </div >
        </div >
      )

  );
}

export default SelectRole;
