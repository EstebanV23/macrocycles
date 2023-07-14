import { Dimensions, StyleSheet } from 'react-native'

const StyleProgressBar = StyleSheet.create({
  containerFlex: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  contentUnits: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5
  },
  widthUnits: (width) => ({
    width: width * 50
  }),
  containerUnits: {
    marginVertical: 10,
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  containerScroll: {
    width: Dimensions.get('window').width - 40
  },
  containerIndications: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    gap: 6,
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 5
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
