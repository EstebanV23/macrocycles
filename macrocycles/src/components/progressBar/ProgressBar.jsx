import { View } from 'react-native'
import Style from './StyleProgressBar'
import UnitProgress from '../unitProgress/UnitProgress'

const ListProgress = ({ arrayContent, ...props }) => {
  const widthComponent = 100 / arrayContent.length
  const lastElement = arrayContent.length - 1
  const unitsProgress = arrayContent.map((item, index) => (
    <View
      key={item.identity}
      style={[index !== lastElement && Style.contentUnit, Style.containerProgress(widthComponent)]}
    >
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

export default function ProgressBar ({
  macrocycle,
  microcycles,
  mesocycles
}) {
  return (
    <View style={Style.containerUnits}>
      <UnitProgress full={macrocycle} orange />
      <ListProgress arrayContent={mesocycles} />
      <ListProgress arrayContent={microcycles} blue />
    </View>
  )
}
