import type { LoaderMessageProps } from ".";

export function LoaderMessage({message = "Cargando datos..."} : LoaderMessageProps) {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      <span className="ml-2 text-gray-600">{message}</span>
    </div>
  )
}
