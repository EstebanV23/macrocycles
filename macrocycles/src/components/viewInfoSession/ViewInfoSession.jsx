import { View } from 'react-native'
import Style from './StyleViewInfoSession'
import Txt from '../Txt/Txt'
import ItemSessionInfo from '../itemSessionInfo/ItemSessionInfo'

export default function ViewInfoSession ({
  amountSportsmans,
  category,
  place,
  trainner,
  objectiveTec,
  objectivePhysical,
  objectiveEducational,
  material,
  stages,
  exercises
}) {
  return (
    <View>
      <Txt quick medium>{category}</Txt>
      <View>
        <ItemSessionInfo
          text='Lugar'
          value={place}
        />
        <ItemSessionInfo
          text='Entrenador'
          value={trainner}
        />
        <ItemSessionInfo
          text='Deportistas'
          value={amountSportsmans}
        />
      </View>
    </View>
  )
}
