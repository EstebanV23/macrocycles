import { View } from 'react-native'
import UnitProgress from '../unitProgress/UnitProgress'
import Style from './StyleListProgress'
import Txt from '../Txt/Txt'

function getDay (date) {
  if (!date) return null
  const day = date.split('/')[2]
  return day
}

export default function ListProgress ({ arrayContent, ...props }) {
  const widthComponent = 100 / arrayContent.length
  const lastElement = arrayContent.length - 1
  if (arrayContent.length === 0) return (<UnitProgress />)
  const unitsProgress = arrayContent.map((item, index) => (
    <View
      key={item.identity}
      style={[index !== lastElement && Style.contentUnit, Style.containerProgress(widthComponent)]}
    >
      <View style={Style.containerF}>
        <Txt quick extraSmall primary>{getDay(item.startDate)}</Txt>
        <Txt quick extraSmall primary>{getDay(item.endDate)}</Txt>
      </View>
      <UnitProgress
        widthComponent={widthComponent}
        {...props}
      />
    </View>
  ))

  return (
    <View style={Style.containerFlex}>
      {unitsProgress}
    </View>
  )
}
