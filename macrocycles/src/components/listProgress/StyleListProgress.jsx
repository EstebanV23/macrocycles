import { StyleSheet } from 'react-native'

const StyleListProgress = StyleSheet.create({
  containerFlex: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  contentUnit: {
    paddingRight: 2
  },
  containerProgress: (width) => ({
    width: `${width}%`
  }),
  containerF: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default StyleListProgress
