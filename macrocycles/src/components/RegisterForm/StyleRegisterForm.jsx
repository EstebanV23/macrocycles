import { StyleSheet } from 'react-native'

const StyleFormLogin = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    paddingVertical: 12
  },
  containerGeneral: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15
  },
  containerLinks: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  scroll: {
    maxHeight: 300
  }
})

export default StyleFormLogin
