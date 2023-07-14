import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../theme/theme'

const StyleComponentMesocycle = StyleSheet.create({
  content: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: `${theme.colors.blue[400]}`,
    minWidth: Dimensions.get('window').width - 50,
    marginHorizontal: 5
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default StyleComponentMesocycle
