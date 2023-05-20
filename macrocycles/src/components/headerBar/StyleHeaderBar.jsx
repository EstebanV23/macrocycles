import { StyleSheet } from 'react-native'
import theme from '../../theme/theme'
import Constants from 'expo-constants'

const StyleHeaderBar = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.white,
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 20,
    elevation: 5
  },
  contentDataHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'flex-start'
  },
  subtitle: {
    height: '100%',
    borderLeftColor: theme.colors.gray,
    borderLeftWidth: 0.5,
    padding: 3,
    display: 'flex',
    flexDirection: 'column'
  },
  iconBack: {
    padding: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: 6
  },
  icon: {
    marginTop: 6
  }
})

export default StyleHeaderBar
