import { Dimensions, StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleButtonsBottom = StyleSheet.create({
  containerButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
    left: 0,
    gap: 10,
    backgroundColor: theme.colors.blue[200]
  }
})

export default StyleButtonsBottom
