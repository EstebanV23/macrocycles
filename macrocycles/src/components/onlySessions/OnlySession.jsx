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
  const navigate = useNavigate()

  useEffect(() => {
    serviceGetOneSession(id)
      .then(sessionResponse => {
        console.log('🚀 ~ file: OnlySession.jsx:20 ~ useEffect ~ sessionResponse:', sessionResponse)
        setSession(sessionResponse?.data ?? null)
      })
  }, [])

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
        dateSelected={date}
        microcycleSelected={microcycle}
        session={session}
        macrocycleSelected={macrocycle}
      />
    </>
  )
}
