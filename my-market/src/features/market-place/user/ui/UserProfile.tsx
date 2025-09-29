import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../../app/providers/store"
import { fetchProfileData } from "../model/thunks"
import { useEffect } from "react"
import { LoaderMessage } from "../../../../shared/ui/Loader/LoaderMessage"

function UserProfile() {

  const dispatch = useDispatch<AppDispatch>()

  const { error, loading, profileResponse } = useSelector(
    (state: RootState) => state.user
  )

  const { userData } = useSelector(
    (state: RootState) => state.login
  )


  useEffect(() => {
    if (userData?.id !== undefined) {
      dispatch(fetchProfileData(userData.id))
    }

    console.log(profileResponse)
  }, [dispatch, userData?.id])


  if (loading) return <LoaderMessage message="Cargando datos de usuario..." />
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>UserProfile</div>
  )
}

export default UserProfile