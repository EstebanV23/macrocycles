import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-native'
import { LoadingContext } from '../../store/LoadingStore'
import serviceGetOneMacrocycle from '../../services/serviceGetOneMacrocycle'
import HeaderBar from '../headerBar/HeaderBar'
import MacroMoreInfo from '../macroMoreInfo/MacroMoreInfo'
import Txt from '../Txt/Txt'
import { ScrollView } from 'react-native'
import Loader from '../loader/Loader'
import iconsConstants from '../../constants/iconConstants'

export default function OnlyMacro () {
  const { id } = useParams()
  const [macrocycle, setMacrocycle] = useState(null)
  const { setLoading } = useContext(LoadingContext)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    serviceGetOneMacrocycle(id)
      .then((macrocycle) => {
        setMacrocycle(macrocycle.data)
        setLoading(false)
      })
  }, [])

  if (!macrocycle) return <Loader />
  return (
    <>
      <HeaderBar
        title={macrocycle.name.slice(0, 15)}
        subtitle='Macrociclo'
        onPress={() => navigate('/macrocycles')}
        iconName={iconsConstants.trophy}
      />
      {(!macrocycle) ? <Txt>ERROR</Txt> : <MacroMoreInfo macrocycleId={macrocycle} />}
    </>
  )
}
