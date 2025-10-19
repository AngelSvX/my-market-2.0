import { CheckCircle, XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/providers/store";
import { WorkStatus } from "../model/types";

export default function ReviewPosts() {

  const { postList } = useSelector(
    (state: RootState) => state.posts
  )

  const pendingPosts = postList.filter((p) => p.status == WorkStatus.PENDING)

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Revisar Publicaciones
      </h2>

      <div className="max-h-[75vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {pendingPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col"
          >
            <img
              src={post.url}
              alt={post.title}
              className="rounded-lg h-40 w-full object-cover mb-4"
            />

            <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
            <p className="text-gray-500 text-sm mb-2">{post.description}</p>

            <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
              <span className="font-medium">{post.category}</span>
              <span className="text-blue-600 font-semibold">${post.price}</span>
            </div>

            <p className="text-xs text-gray-400 mb-4">
              Autor: <span className="text-gray-600">{post.name}</span>
            </p>

            <div className="flex justify-between mt-auto">
              <button className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition text-sm">
                <CheckCircle size={16} /> Aprobar
              </button>

              <button className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition text-sm">
                <XCircle size={16} /> Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}