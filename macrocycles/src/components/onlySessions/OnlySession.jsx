import { useNavigate, useParams } from 'react-router-native'
import NewSession from '../newSession/NewSession'
import Loader from '../loader/Loader'
import { useEffect, useState } from 'react'
import serviceGetOneSession from '../../services/serviceGetOneSession'
import HeaderBar from '../headerBar/HeaderBar'
import iconsConstants from '../../constants/iconConstants'

export default function OnlySession () {
  const { id, date, microcycle, macrocycle } = useParams()
  const [session, setSession] = useState(undefined)
  const [retryFetch, setRetryFetch] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!retryFetch) return
    setSession(undefined)
    serviceGetOneSession(id)
      .then(sessionResponse => {
        setSession(sessionResponse?.data ?? null)
      })

    setRetryFetch(false)
  }, [retryFetch])

  if (session === undefined) return <Loader />

  return (
    <>
      <HeaderBar
        title='Sesión'
        iconName={iconsConstants.trophy}
        subtitle={session?.category ?? 'New sesión'}
        onPress={() => navigate(`/macrocycles/${macrocycle}`)}
      />
      <NewSession
        setRetryFetch={setRetryFetch}
        dateSelected={date}
        microcycleSelected={microcycle}
        session={session}
        macrocycleSelected={macrocycle}
      />
    </>
  )
}
