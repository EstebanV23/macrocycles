import { View } from 'react-native'
import IndicationButton from '../indicationButton/IndicationButton'
import theme from '../../theme/theme'

export default function Materials ({ materials }) {
  return materials.map((material, index) => {
    return (
      <IndicationButton
        text={material}
        color={theme.colors[index + 1 > 7 ? index - (Math.floor(index / 7) * 7) : (index + 1)].default}
        key={`${material} ${index}`}
      />
    )
  })
}
