import { Dimensions, StyleSheet } from 'react-native'

const StyleProgressBar = StyleSheet.create({
  containerFlex: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  containerUnits: {
    marginVertical: 10,
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  contentUnit: {
    paddingRight: 2
  },
  containerProgress: (width) => ({
    width: `${width}%`
  })
})

export default StyleProgressBar
