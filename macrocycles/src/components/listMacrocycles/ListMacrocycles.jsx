import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../store/UserStore'
import { LoadingContext } from '../../store/LoadingStore'
import Loader from '../loader/Loader'
import serviceGetAllMacrosUser from '../../services/serviceGetAllMacrosUser'
import Txt from '../Txt/Txt'
import Macrocycles from '../macrocycles/Macrocycles'
import HeaderBar from '../headerBar/HeaderBar'
import { useNavigate } from 'react-router-native'
import iconsConstants from '../../constants/iconConstants'
import { ScrollView, View } from 'react-native'
import PressableLink from '../pressableLink/PressableLink'

export default function ListMacrocycles () {
  const { user } = useContext(UserContext)
  const { loading, setLoading } = useContext(LoadingContext)
  const [macros, setMacros] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    serviceGetAllMacrosUser(user.id)
      .then((macros) => {
        const macrosUser = macros.data.macrocycles

        setMacros(macrosUser ?? [])
        setLoading(false)
      })
  }, [])
  if (!macros || loading) return <Loader />
  return (
    <>
      <HeaderBar
        title='Lista de macrociclos'
        subtitle=''
        onPress={() => navigate('/')}
        iconName={iconsConstants.list}
      />
      <ScrollView
        style={{ marginBottom: 90, paddingBottom: 90 }}
      >
        {(macros.length === 0) ? <Txt quick medium style={{ textAlign: 'center' }}>No tienes macros creados aún</Txt> : <Macrocycles macrocycles={macros} />}
        <View style={{ paddingHorizontal: 10 }}>
          <PressableLink to='/new-macro' icon={iconsConstants.newDocument}>Crear un nuevo <Txt quick primary>macrociclo</Txt></PressableLink>
        </View>
        <Txt />
        <Txt />
        <Txt />
      </ScrollView>
    </>
  )
}
