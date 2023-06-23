import { StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleUnitProgress = StyleSheet.create({
  component: {
    height: 9,
    borderRadius: 20
  },
  fullComponent: {
    width: '100%'
  },
  transparent: {
    backgroundColor: theme.colors.gray
  },
  green: {
    backgroundColor: theme.colors.green[500]
  },
  red: {
    backgroundColor: theme.colors.red[500]
  },
  orange: {
    backgroundColor: theme.colors.orange[500]
  },
  blue: {
    backgroundColor: theme.colors.blue[500]
  },
  yellow: {
    backgroundColor: theme.colors.yellow[500]
  },
  purple: {
    backgroundColor: theme.colors.purple[500]
  },
  menta: {
    backgroundColor: theme.colors.menta[500]
  },
  mesocycle: {
    backgroundColor: theme.colors[1].default
  },
  meso1: {
    backgroundColor: theme.colors[1].default
  },
  meso2: {
    backgroundColor: theme.colors[2].default
  },
  meso3: {
    backgroundColor: theme.colors[3].default
  },
  meso4: {
    backgroundColor: theme.colors[4].default
  },
  meso5: {
    backgroundColor: theme.colors[5].default
  },
  meso6: {
    backgroundColor: theme.colors[6].default
  }
})

export default StyleUnitProgress
