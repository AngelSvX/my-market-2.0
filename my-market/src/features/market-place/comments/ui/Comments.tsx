import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../../app/providers/store'
import type { CommentParams, Review } from '../model/types'
import { closeComments } from '../model/slice'
import { MessageCircle, Send, Star } from 'lucide-react';
import type { DecodedToken } from '../../../auth/login/model/types';
import { jwtDecode } from 'jwt-decode';
import { ratingOptions } from '../utils/ratingOptions';
import React, { useEffect, useState } from 'react';
import { addCommentByPost, fetchCommentsByPost } from '../model/thunks';

function Comments({ workId, userId }: { workId: number; userId: number }) {

  const comments = useSelector((state: RootState) => state.comments)
  const dispatch = useDispatch<AppDispatch>()

  const { userData } = useSelector((state: RootState) => state.login)


  const token = localStorage.getItem("token");
  let decoded: DecodedToken | null = null;

  if (token && token.split(".").length === 3) {
    try {
      decoded = jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error("Token inválido:", error);
    }
  }

  // const [workId, setWorkId] = useState<number>(0)
  // const [userId, setUserId] = useState<number>(0)
  const [rating, setRating] = useState<number>(1)
  const [comment, setComment] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload: CommentParams = {
      work_id: workId,
      user_id: userId,
      rating: rating,
      comment: comment
    }

    const result = await dispatch(addCommentByPost(payload))

    if (addCommentByPost.fulfilled.match(result)) {
      setComment("")
      setRating(0)
      dispatch(fetchCommentsByPost(workId))
    }

  }

  useEffect(() => {
    console.log(userId)
    console.log(workId)
  }, [userId, workId])

  useEffect(() => {
    console.log(comment, "Comentario")
  }, [comment])

  useEffect(() => {
    console.log(rating, "Rating")
  }, [rating])


  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4 flex-col space-y-10">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-lg z-50 p-6 flex flex-col">

        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
          onClick={() => dispatch(closeComments())}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
          Comentarios / Reseñas
        </h2>

        <div className="flex-1 overflow-y-auto max-h-[65vh] space-y-4 pr-2">
          {comments.loading ? (

            <div className="flex flex-col items-center justify-center py-10 text-gray-500">
              <svg
                className="animate-spin h-8 w-8 text-indigo-600 mb-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                />
              </svg>
              <p className="text-sm font-medium">Cargando comentarios...</p>
            </div>
          ) : comments.comments.length === 0 ? (

            <p className="text-center text-gray-500 py-6">
              No hay comentarios para mostrar
            </p>
          ) : (

            comments.comments.map((review: Review) => (
              <div
                key={review.id}
                className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm"
              >

                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.email}</p>
                  </div>
                  <time className="text-xs text-gray-400">
                    {new Date(review.created_at).toLocaleDateString()}
                  </time>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${i < review.rating ? "text-yellow-500" : "text-gray-300"
                        }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <form onSubmit={(e: React.FormEvent) => handleSubmit(e)} className='bg-white w-full max-w-2xl rounded-2xl shadow-lg z-50 p-5 flex-col flex justify-between'>
        <div className='w-full flex space-x-8 space-y-6'>
          <div className='w-3/4 '>
            <label
              htmlFor="commentary"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Comentar
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <MessageCircle className="w-5 h-5" />
              </span>
              <input
                type="text"
                id="commentary"
                value={comment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setComment(e.target.value)
                }}
                placeholder={`¿Qué opinas tú, ${userData?.name || decoded?.name}?`}
                className="w-full rounded-xl border border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm shadow-sm transition"
              />
            </div>
          </div>
          <div className='w-1/4'>
            <label
              htmlFor="rank"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Puntuación
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Star className="w-5 h-5" />
              </span>
              <select
                id="rank"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setRating(Number(e.target.value))
                }}
                className="w-full rounded-xl border border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm shadow-sm transition"
              >
                {
                  Object.entries(ratingOptions).map(([label, value]) => (
                    <option key={value} value={value}> {label} </option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
        <div className='flex justify-end w-full space-x-8'>
          <div className='w-3/4'></div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-[#6857e9] px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-[#4F39F6] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-1/4"
          >
            <Send className="w-4 h-4" />
            Comentar
          </button>
        </div>
      </form>

    </div>
  )
}

export default Comments