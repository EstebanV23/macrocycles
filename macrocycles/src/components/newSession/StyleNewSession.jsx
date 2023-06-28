import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../theme/theme'

const StyleNewSession = StyleSheet.create({
  contentDate: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: `${theme.colors.disbaled}aa`,
    borderRadius: 8,
    marginTop: 10
  },
  containerGeneral: {
    width: Dimensions.get('window').width - 80,
    marginHorizontal: 40
  },
  contentSession: {
    maxHeight: Dimensions.get('window').height - 200
  },
  contentRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10
  }
})

export default StyleNewSession
