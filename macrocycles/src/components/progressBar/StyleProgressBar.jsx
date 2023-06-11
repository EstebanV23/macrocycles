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
  containerIndications: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    gap: 15,
    alignItems: 'flex-start'
  },
  contentUnit: {
    paddingRight: 2
  },
  containerProgress: (width) => ({
    width: `${width}%`
  }),
  containerDates: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  }
})

export default StyleProgressBar
